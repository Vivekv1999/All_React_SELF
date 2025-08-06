import interact from "interactjs";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";

/** Keyword that marks the first line you want to keep.
 *  Everything ABOVE this line will be removed. */
const KEYWORD = "Tax Invoice";

const INITIAL_BOX = { x: 0, y: 0, width: 595, height: 460 };

const PdfCropper = ({ mergedFile, setMergedFile }) => {
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    /* --- still used for manual mode --- */
    const [cropBox, setCropBox] = useState(INITIAL_BOX);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const canvasRef = useRef(null);
    const cropBoxRef = useRef(null);

    /* -------------------------------------------------------------------------- */
    /*                                LOAD + PREVIEW                             */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        if (mergedFile) handleFileChange(mergedFile);
    }, [mergedFile]);

    const handleFileChange = async (e) => {
        const file = mergedFile ? e : e.target?.files?.[0];
        if (!file) return;

        try {
            const buffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

            setPdfDoc(pdf);
            setPdfFile(file);
            setTotalPages(pdf.numPages);
            setPageNum(1);
        } catch (err) {
            console.error(err);
            alert("Failed to load PDF");
        }
    };

    const renderPage = async (num) => {
        if (!pdfDoc) return;
        const page = await pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: 1 });

        const canvas = canvasRef.current;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        setCanvasSize({ width: viewport.width, height: viewport.height });

        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport }).promise;
    };

    useEffect(() => {
        renderPage(pageNum);
    }, [pdfDoc, pageNum]);

    /* -------------------------------------------------------------------------- */
    /*                    AUTO‑CROP (find keyword  → crop pages)                  */
    /* -------------------------------------------------------------------------- */
    const autoCropPDF = async () => {
        if (!pdfFile) return alert("Load a PDF first");

        try {
            const bytes = await pdfFile.arrayBuffer();

            /* 1️⃣  Detect Y‑position of KEYWORD on every page with pdf.js */
            const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
            const keywordPositions = [];
            console.log(keywordPositions, "keywordPositions", pdf);



            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const match = textContent.items.find((it) =>
                    it.str.toLowerCase().includes(KEYWORD.toLowerCase())
                );

                /* transform[5] == baseline Y (user‑space units, origin bottom‑left) */
                keywordPositions.push(match ? match.transform[5] : null);
            }

            /* 2️⃣  Crop with pdf-lib */
            const libDoc = await PDFDocument.load(bytes);
            libDoc.getPages().forEach((page, idx) => {
                const { width, height } = page.getSize();
                const y = keywordPositions[idx];
                console.log(keywordPositions, "keywordPositions");


                if (y !== null) {
                    /* Keep everything from y DOWNWARDS. Remove top (height‑y) part. */
                    page.setMediaBox(0, 0, width, y);
                }
                /* If keyword missing → leave that page unchanged. */
            });

            /* 3️⃣  Save & download */
            const out = await libDoc.save();
            const blob = new Blob([out], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "cropped.pdf";
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Auto‑crop failed");
        }
    };

    /* -------------------------------------------------------------------------- */
    /*                EXISTING manual Interact.js logic (unchanged)               */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        const el = cropBoxRef.current;
        if (!el) return;

        /* … same Interact.js draggable / resizable setup as you had … */
        const { width: cw, height: ch } = canvasSize;

        const inter = interact(el)
            .draggable({
                modifiers: [
                    interact.modifiers.restrictRect({ restriction: "parent" })
                ],
                listeners: {
                    move: (ev) =>
                        setCropBox((p) => ({
                            ...p,
                            x: Math.min(Math.max(0, p.x + ev.dx), cw - p.width),
                            y: Math.min(Math.max(0, p.y + ev.dy), ch - p.height)
                        }))
                }
            })
            .resizable({
                edges: { left: true, right: true, top: true, bottom: true },
                modifiers: [
                    interact.modifiers.restrictSize({
                        min: { width: 20, height: 20 },
                        max: { width: cw, height: ch }
                    }),
                    interact.modifiers.restrictRect({ restriction: "parent" })
                ],
                listeners: {
                    move: (ev) =>
                        setCropBox((_) => {
                            const rect = ev.rect;
                            const cRect = canvasRef.current.getBoundingClientRect();
                            return {
                                x: rect.left - cRect.left,
                                y: rect.top - cRect.top,
                                width: rect.width,
                                height: rect.height
                            };
                        })
                }
            });

        return () => inter.unset();
    }, [canvasSize]);

    const manualCropPDF = async () => {
        if (!pdfFile) return alert("Load a PDF first");

        try {
            const bytes = await pdfFile.arrayBuffer();
            const libDoc = await PDFDocument.load(bytes);
            libDoc.getPages().forEach((page) => {
                const { height } = page.getSize();
                page.setCropBox(
                    cropBox.x,
                    height - cropBox.y - cropBox.height,
                    cropBox.width,
                    cropBox.height
                );
            });

            const out = await libDoc.save();
            const blob = new Blob([out], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "cropped.pdf";
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Manual crop failed");
        }
    };

    /* -------------------------------------------------------------------------- */
    /*                                    UI                                      */
    /* -------------------------------------------------------------------------- */
    return (
        <div className="space-y-4">
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
            />

            {pdfDoc && (
                <>
                    <div className="relative inline-block">
                        <canvas
                            ref={canvasRef}
                            className="border border-gray-300"
                            style={{ pointerEvents: "none" }}
                        />
                        {/* Manual crop rectangle (optional) */}
                        <div
                            ref={cropBoxRef}
                            className="absolute border-2 border-blue-500 border-dashed bg-blue-100 bg-opacity-20 cursor-move"
                            style={{
                                left: cropBox.x,
                                top: cropBox.y,
                                width: cropBox.width,
                                height: cropBox.height
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-x-2">
                            <button
                                onClick={() => setPageNum((p) => Math.max(1, p - 1))}
                                disabled={pageNum <= 1}
                                className="rounded px-4 py-2 bg-gray-200 disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => setPageNum((p) => Math.min(totalPages, p + 1))}
                                disabled={pageNum >= totalPages}
                                className="rounded px-4 py-2 bg-gray-200 disabled:opacity-50"
                            >
                                Next
                            </button>
                            <span>
                                Page {pageNum} / {totalPages}
                            </span>
                        </div>

                        {/* Manual vs Auto crop */}
                        <div className="space-x-2">
                            <button
                                onClick={manualCropPDF}
                                className="rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Crop (manual)
                            </button>
                            <button
                                onClick={autoCropPDF}
                                className="rounded px-4 py-2 bg-green-600 text-white hover:bg-green-700"
                            >
                                Auto‑Crop&nbsp;({KEYWORD})
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PdfCropper;
