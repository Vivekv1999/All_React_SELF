import React, { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

// Ensure PDF.js is globally available
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;

const MergePDF = () => {
    const [pdfs, setPdfs] = useState([]);

    const loadPdfMeta = async (file) => {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const page = await doc.getPage(0);
        const dataUrl = await renderPdfPagePreview(file);
        return { pageCount: doc.getPageCount(), bytes, preview: dataUrl };
    };

    const renderPdfPagePreview = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const typedarray = new Uint8Array(reader.result);
                    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                    const page = await pdf.getPage(1);
                    const viewport = page.getViewport({ scale: 1 });
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    await page.render({ canvasContext: context, viewport }).promise;
                    resolve(canvas.toDataURL());
                } catch (error) {
                    console.error("Preview error:", error);
                    resolve(null);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    };

    const handleFileChange = async (e) => {
        const fileList = Array.from(e.target.files);
        const enriched = await Promise.all(
            fileList.map(async (file) => {
                const meta = await loadPdfMeta(file);
                return {
                    id: uuidv4(),
                    file,
                    ...meta,
                };
            })
        );
        setPdfs((prev) => [...prev, ...enriched]);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reordered = Array.from(pdfs);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);
        setPdfs(reordered);
    };

    const mergePdfs = async () => {
        if (pdfs.length === 0) return;
        const merged = await PDFDocument.create();
        for (const pdf of pdfs) {
            const srcDoc = await PDFDocument.load(pdf.bytes);
            const copied = await merged.copyPages(srcDoc, srcDoc.getPageIndices());
            copied.forEach((page) => merged.addPage(page));
        }
        const mergedBytes = await merged.save();
        const blob = new Blob([mergedBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "merged.pdf";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Merge PDFs</h1>

            <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500">
                <span className="text-gray-600">Click or drop PDFs here to select</span>
                <input
                    type="file"
                    multiple
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            {pdfs.length > 0 && (
                <>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="pdf-list" direction="horizontal">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
                                >
                                    {pdfs.map((pdf, index) => (
                                        <Draggable key={pdf.id} draggableId={pdf.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="group border rounded-xl shadow p-2 bg-white hover:bg-gray-50 transition"
                                                >
                                                    <div className="relative">
                                                        {pdf.preview && (
                                                            <img
                                                                src={pdf.preview}
                                                                alt={`Preview ${index + 1}`}
                                                                className="w-full h-48 object-contain rounded mb-2"
                                                            />
                                                        )}
                                                        <span className="absolute top-1 left-1 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-800 truncate mb-1">
                                                        {pdf.file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {pdf.pageCount} page{pdf.pageCount > 1 ? "s" : ""}
                                                    </p>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <button
                        onClick={mergePdfs}
                        className="mt-6 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Merge & Download
                    </button>
                </>
            )}
        </div>
    );
};

export default MergePDF;
