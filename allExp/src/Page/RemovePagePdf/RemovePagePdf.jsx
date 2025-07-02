import React, { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;

const RemovePagePdf = () => {
    const [pdfs, setPdfs] = useState([]);
    const [removedPages, setRemovedPages] = useState({});
    const [removeOption, setRemoveOption] = useState("all");
    const [customPages, setCustomPages] = useState("");

    const loadPdfMeta = async (file) => {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pageCount = doc.getPageCount();
        const previews = await Promise.all(
            Array.from({ length: pageCount }, (_, i) => renderPdfPagePreview(file, i + 1))
        );
        return { pageCount, bytes, previews };
    };

    const renderPdfPagePreview = async (file, pageNumber) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const typedarray = new Uint8Array(reader.result);
                    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                    const page = await pdf.getPage(pageNumber);
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

    const togglePageRemoval = (pdfId, pageIndex) => {
        setRemovedPages((prev) => {
            const current = new Set(prev[pdfId] || []);
            if (current.has(pageIndex)) {
                current.delete(pageIndex);
            } else {
                current.add(pageIndex);
            }
            return { ...prev, [pdfId]: Array.from(current) };
        });
    };

    const getPagesToRemove = (pdf) => {
        if (removeOption === "all") return removedPages[pdf.id] || [];

        const totalPages = pdf.pageCount;
        if (removeOption === "odd") {
            return Array.from({ length: totalPages }, (_, i) => (i % 2 === 0 ? i : -1)).filter(i => i >= 0);
        }
        if (removeOption === "even") {
            return Array.from({ length: totalPages }, (_, i) => (i % 2 === 1 ? i : -1)).filter(i => i >= 0);
        }
        if (removeOption === "custom") {
            const input = customPages.replace(/\s+/g, "");
            const pages = new Set();
            input.split(",").forEach(part => {
                if (part.includes("-")) {
                    const [start, end] = part.split("-").map(n => parseInt(n, 10));
                    for (let i = start; i <= end; i++) pages.add(i - 1);
                } else {
                    pages.add(parseInt(part, 10) - 1);
                }
            });
            return Array.from(pages);
        }
        return [];
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reordered = Array.from(pdfs);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);
        setPdfs(reordered);
    };

    const removePageFromPdfs = async () => {
        if (pdfs.length === 0) return;
        const merged = await PDFDocument.create();
        for (const pdf of pdfs) {
            const srcDoc = await PDFDocument.load(pdf.bytes);
            const indices = srcDoc.getPageIndices();
            const toRemove = new Set(getPagesToRemove(pdf));
            const pagesToKeep = indices.filter(index => !toRemove.has(index));
            const copied = await merged.copyPages(srcDoc, pagesToKeep);
            copied.forEach((page) => merged.addPage(page));
        }
        const mergedBytes = await merged.save();
        const blob = new Blob([mergedBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "removePage.pdf";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Remove Page From PDFs</h1>

            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
                    const fakeEvent = { target: { files } };
                    handleFileChange(fakeEvent);
                }}
                className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500"
            >
                <label className="text-gray-600 cursor-pointer">
                    Click or drop PDFs here to select
                    <input
                        type="file"
                        multiple
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
            </div>


            {pdfs.length > 0 &&
                <div className="my-6 space-y-2">
                    <p className="font-medium">Pages</p>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="pages" value="all" checked={removeOption === "all"} onChange={() => setRemoveOption("all")} /> All
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="pages" value="odd" checked={removeOption === "odd"} onChange={() => setRemoveOption("odd")} /> Odd pages only
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="pages" value="even" checked={removeOption === "even"} onChange={() => setRemoveOption("even")} /> Even pages only
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="pages" value="custom" checked={removeOption === "custom"} onChange={() => setRemoveOption("custom")} />
                        <input
                            type="text"
                            placeholder="e.g. 1-5, 8, 11-13"
                            className="border rounded px-2 py-1 text-sm"
                            value={customPages}
                            onChange={(e) => setCustomPages(e.target.value)}
                        />
                    </label>
                </div>
            }

            {pdfs.length > 0 && (
                <>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="pdf-list" direction="horizontal">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="space-y-8 mt-6"
                                >
                                    {pdfs.map((pdf, index) => (
                                        <Draggable key={pdf.id} draggableId={pdf.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="border rounded-xl shadow p-4 bg-white"
                                                >
                                                    <p className="font-semibold mb-2">{pdf.file.name}</p>
                                                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                        {pdf.previews.map((src, i) => {
                                                            const isRemoved = getPagesToRemove(pdf).includes(i);
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    onClick={() => togglePageRemoval(pdf.id, i)}
                                                                    className={`relative cursor-pointer rounded overflow-hidden border group`}
                                                                >
                                                                    <img
                                                                        src={src}
                                                                        alt={`Page ${i + 1}`}
                                                                        className={`w-full transition duration-200 ${isRemoved ? "grayscale brightness-50" : "group-hover:shadow-md"}`}
                                                                    />
                                                                    {isRemoved && (
                                                                        <span className="absolute inset-0 bg-black bg-opacity-40 text-white flex items-center justify-center text-2xl font-extrabold">
                                                                            ✕
                                                                        </span>
                                                                    )}
                                                                    <span className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                                                                        {i + 1}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
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
                        onClick={removePageFromPdfs}
                        className="mt-6 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Remove Page
                    </button>
                </>
            )}
        </div>
    );
};

export default RemovePagePdf;