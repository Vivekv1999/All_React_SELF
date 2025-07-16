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

const MergePDF = ({
    setMergedFile, //for auto crop pdf after merge
    isMeregWithCrop
}) => {
    const [pdfs, setPdfs] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(
            (file) => file.type === "application/pdf"
        );
        if (files.length > 0) {
            const fakeEvent = { target: { files } };
            handleFileChange(fakeEvent);
        }
    };

    const removePdf = (id) => {
        console.log(id, "pppppppppppp");
        setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
    };

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

    const buildMergedPdfFile = async (pdfArr) => {
        if (!pdfArr.length) return null;

        const mergedDoc = await PDFDocument.create();

        for (const item of pdfArr) {
            const srcDoc = await PDFDocument.load(item.bytes);   // bytes you cached earlier
            const copiedPages = await mergedDoc.copyPages(srcDoc, srcDoc.getPageIndices());
            copiedPages.forEach(p => mergedDoc.addPage(p));
        }

        const mergedBytes = await mergedDoc.save();            // Uint8Array
        return new File([mergedBytes], "merged.pdf", { type: "application/pdf" });
    };

    const mergePdfs = async () => {
        if (setMergedFile) {//for mereg and both crop functionality
            const mergedFile = await buildMergedPdfFile(pdfs);
            setMergedFile(mergedFile)
        }

        else {
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

            console.log(url, "merged---url---mergedBytes", mergedBytes, link?.target?.file?.[0]);

            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">
                {isMeregWithCrop ? "Merge with crop" : "Merge PDFs"}
            </h1>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("pdf-upload").click()}
                className={`flex items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-md cursor-pointer
                ${isDragging
                        ? "bg-indigo-50 border-indigo-500 scale-105 shadow-lg"
                        : "bg-white border-gray-300"
                    }`}
            >
                <span className="text-gray-600">
                    {isDragging ? "Drop your PDFs here 📄" : "Click or drop PDFs here to select"}
                </span>
                <input
                    id="pdf-upload"
                    type="file"
                    multiple
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>


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
                                                    className="group border relative rounded-xl shadow p-2 bg-white hover:bg-gray-50 transition min-w-[200px]"
                                                >
                                                    <button
                                                        onClick={() => removePdf(pdf.id)}
                                                        className="absolute top-1.5 right-1.5 p-1 bg-white/80 hover:bg-red-500 hover:text-white text-gray-600 rounded-full shadow-md transition-colors z-10"
                                                        title="Remove PDF"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>

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
                                                    <p className="text-xs text-gray-800 truncate mb-1">{pdf.file.name}</p>
                                                    <p className="text-xs text-gray-500">{pdf.pageCount} page{pdf.pageCount > 1 ? "s" : ""}</p>
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
