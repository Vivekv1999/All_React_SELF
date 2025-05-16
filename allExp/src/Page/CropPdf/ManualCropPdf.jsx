import interact from 'interactjs';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';

// Set PDF.js worker source (matching pdfjs-dist@4.10.38)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;

const PdfCropper = () => {
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [cropBox, setCropBox] = useState({ x: 50, y: 50, width: 100, height: 100 });
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const canvasRef = useRef(null);
    const cropBoxRef = useRef(null);

    // Handle PDF upload
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfJsBuffer = arrayBuffer.slice(0);
            const pdf = await pdfjsLib.getDocument(pdfJsBuffer).promise;
            setPdfDoc(pdf);
            setPdfFile(file);
            setTotalPages(pdf.numPages);
            setPageNum(1);
        } catch (error) {
            console.error('Error loading PDF:', error);
            alert('Failed to load PDF. Please try another file.');
        }
    };

    // Render PDF page
    const renderPage = async (num) => {
        if (!pdfDoc) return;

        try {
            const page = await pdfDoc.getPage(num);
            const viewport = page.getViewport({ scale: 1 });
            const canvas = canvasRef.current;
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            setCanvasSize({ width: viewport.width, height: viewport.height });

            const context = canvas.getContext('2d');
            await page.render({ canvasContext: context, viewport }).promise;

            setCropBox({
                x: 50,
                y: 50,
                width: Math.min(400, viewport.width - 50),
                height: Math.min(100, viewport.height - 50),
            });
        } catch (error) {
            console.error('Error rendering page:', error);
        }
    };

    // Initialize Interact.js for crop box
    useEffect(() => {
        const cropBoxElement = cropBoxRef.current;
        if (!cropBoxElement) return;

        const { width: canvasWidth, height: canvasHeight } = canvasSize;

        const interactInstance = interact(cropBoxElement)
            .draggable({
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: false,
                    }),
                ],
                onstart: () => {
                    cropBoxElement.style.transition = 'none';
                    cropBoxElement.style.willChange = 'transform'; // Optimize rendering
                },
                onmove: (event) => {
                    setCropBox((prev) => {
                        let newX = prev.x + event.dx;
                        let newY = prev.y + event.dy;

                        newX = Math.max(0, Math.min(newX, canvasWidth - prev.width));
                        newY = Math.max(0, Math.min(newY, canvasHeight - prev.height));

                        return { ...prev, x: newX, y: newY };
                    });
                },
                onend: () => {
                    cropBoxElement.style.transition = 'none';
                    cropBoxElement.style.willChange = 'auto';
                },
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                modifiers: [
                    interact.modifiers.restrictSize({
                        min: { width: 20, height: 20 },
                        max: { width: canvasWidth, height: canvasHeight },
                    }),
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                    }),
                ],
                onstart: () => {
                    cropBoxElement.style.transition = 'none';
                    cropBoxElement.style.willChange = 'width, height, transform';
                    // Force initial position sync
                    const rect = cropBoxElement.getBoundingClientRect();
                    setCropBox((prev) => ({
                        ...prev,
                        x: rect.left - canvasRef.current.getBoundingClientRect().left,
                        y: rect.top - canvasRef.current.getBoundingClientRect().top,
                    }));
                },
                onmove: (event) => {
                    const rect = event.rect;
                    const canvasRect = canvasRef.current.getBoundingClientRect();
                    setCropBox({
                        x: rect.left - canvasRect.left,
                        y: rect.top - canvasRect.top,
                        width: rect.width,
                        height: rect.height,
                    });
                },
                onend: () => {
                    cropBoxElement.style.transition = 'none';
                    cropBoxElement.style.willChange = 'auto';
                },
            });

        return () => {
            interactInstance.unset();
        };
    }, [canvasSize]);

    // Render page when page number or PDF changes
    useEffect(() => {
        renderPage(pageNum);
    }, [pdfDoc, pageNum]);

    // Crop PDF
    const cropPDF = async () => {
        if (!pdfFile) {
            alert('No PDF loaded. Please upload a PDF first.');
            return;
        }

        try {
            const pdfBytes = await pdfFile.arrayBuffer();
            const pdfDocLib = await PDFDocument.load(pdfBytes);
            const pages = pdfDocLib.getPages();

            pages.forEach((page) => {
                const { height } = page.getSize();
                page.setCropBox(cropBox.x, height - cropBox.y - cropBox.height, cropBox.width, cropBox.height);
            });

            const croppedPdfBytes = await pdfDocLib.save();
            const blob = new Blob([croppedPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'cropped.pdf';
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error cropping PDF:', error);
            alert('Failed to crop PDF. Please try again.');
        }
    };

    // Navigation
    const goToPrevPage = () => setPageNum((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setPageNum((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="space-y-4">
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block hover:file:bg-blue-100 file:bg-blue-50 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded w-full text-gray-500 file:text-blue-700 text-sm file:text-sm"
            />
            {pdfDoc && (
                <div className="inline-block relative m-0 p-0 leading-none">
                    <canvas
                        ref={canvasRef}
                        className="m-0 p-0 border border-gray-300"
                        style={{ pointerEvents: 'none' }}
                    />
                    <div
                        ref={cropBoxRef}
                        className="absolute bg-blue-100 bg-opacity-20 hover:bg-opacity-30 border-2 border-blue-500 hover:border-blue-700 border-dashed cursor-move"
                        style={{
                            left: `${cropBox.x}px`,
                            top: `${cropBox.y}px`,
                            width: `${cropBox.width}px`,
                            height: `${cropBox.height}px`,
                        }}
                    >
                        <div className="right-0 bottom-0 absolute bg-blue-500 hover:bg-blue-700 rounded-sm w-5 h-5 cursor-se-resize" />
                        <div className="top-0 left-0 absolute bg-blue-500 hover:bg-blue-700 rounded-sm w-5 h-5 cursor-nw-resize" />
                    </div>
                </div>
            )}
            {pdfDoc && (
                <div className="flex justify-between items-center">
                    <div className="space-x-2">
                        <button
                            onClick={goToPrevPage}
                            disabled={pageNum <= 1}
                            className="bg-gray-200 disabled:opacity-50 px-4 py-2 rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={pageNum >= totalPages}
                            className="bg-gray-200 disabled:opacity-50 px-4 py-2 rounded"
                        >
                            Next
                        </button>
                        <span>
                            Page {pageNum} of {totalPages}
                        </span>
                    </div>
                    <button
                        onClick={cropPDF}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                    >
                        Crop PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default PdfCropper;