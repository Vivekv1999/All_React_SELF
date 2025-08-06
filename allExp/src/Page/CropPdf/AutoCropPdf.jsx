import { PDFDocument } from 'pdf-lib';
import React, { useEffect, useRef, useState } from 'react';

const AutoCropPdf = ({ mergedFile }) => {
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageSize, setPageSize] = useState(null);
    const [error, setError] = useState('');
    const canvasRef = useRef(null);
    const [cropSettings, setCropSettings] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    });

    const handleFileChange = async (e) => {
        const file = e
        // const file = e.target.files[0];
        if (!file || !file.type.includes('pdf')) {
            setError('Please upload a valid PDF file.');
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            setPdfDoc(pdf);
            const firstPage = pdf.getPage(0);
            const { width, height } = firstPage.getSize();
            setPageSize({ width, height });
            setCropSettings({ left: 0, top: 0, width, height });
            setError('');
            renderPreview(firstPage);
        } catch (err) {
            setError('Error loading PDF: ' + err.message);
        }
    };

    const handleCrop = async () => {
        if (!pdfDoc) {
            setError('No PDF loaded.');
            return;
        }

        const { left, top, width, height } = cropSettings;
        if (width <= 0 || height <= 0) {
            setError('Width and height must be positive.');
            return;
        }

        try {
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(pdfDoc, [0]);
            newPdf.addPage(page);

            const firstPage = newPdf.getPage(0);
            const pageSize = firstPage.getSize();
            if (left + width > pageSize.width || top + height > pageSize.height) {
                setError('Crop dimensions exceed page size.');
                return;
            }

            firstPage.setSize(width, height);
            firstPage.translateContent(-left, -top);

            const pdfBytes = await newPdf.save();
            download(pdfBytes, 'cropped.pdf', 'application/pdf');
            setError('');
        } catch (err) {
            setError('Error cropping PDF: ' + err.message);
        }
    };

    const renderPreview = async (page) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: 1 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context,
            viewport: viewport,
        }).promise;
    };

    const download = (data, filename, type) => {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCropSettings((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
                <h1 className="mb-4 font-bold text-2xl text-center">PDF Cropper</h1>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="mb-4 p-2 border rounded w-full"
                />
                {pageSize && (
                    <div className="mb-4">
                        <h2 className="mb-2 font-semibold text-lg">Crop Settings</h2>
                        <div className="gap-2 grid grid-cols-2">
                            <div>
                                <label className="block text-sm">Left (px):</label>
                                <input
                                    type="number"
                                    name="left"
                                    min="0"
                                    value={cropSettings.left}
                                    onChange={handleInputChange}
                                    className="p-1 border rounded w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Top (px):</label>
                                <input
                                    type="number"
                                    name="top"
                                    min="0"
                                    value={cropSettings.top}
                                    onChange={handleInputChange}
                                    className="p-1 border rounded w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Width (px):</label>
                                <input
                                    type="number"
                                    name="width"
                                    min="1"
                                    value={cropSettings.width}
                                    onChange={handleInputChange}
                                    className="p-1 border rounded w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Height (px):</label>
                                <input
                                    type="number"
                                    name="height"
                                    min="1"
                                    value={cropSettings.height}
                                    onChange={handleInputChange}
                                    className="p-1 border rounded w-full"
                                />
                            </div>
                        </div>
                        <p className="mt-2 text-sm">
                            Page Size: {pageSize.width.toFixed(2)} x {pageSize.height.toFixed(2)} pixels
                        </p>
                    </div>
                )}
                <button
                    onClick={handleCrop}
                    className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${!pdfDoc ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={!pdfDoc}
                >
                    Crop PDF
                </button>
                {error && <p className="mt-2 text-red-500">{error}</p>}
                <canvas ref={canvasRef} className="mt-4 max-w-full h-auto" />
            </div>
        </div>
    );
}

export default AutoCropPdf
