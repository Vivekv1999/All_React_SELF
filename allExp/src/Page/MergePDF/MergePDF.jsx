import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';

function MergePDF() {
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

    const handleMerge = async (event) => {
        const files = event.target.files;
        if (!files || files.length < 2) return;

        const mergedPdf = await PDFDocument.create();

        for (let i = 0; i < files.length; i++) {
            const arrayBuffer = await files[i].arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setMergedPdfUrl(url);
    };

    return (
        <div className="p-4">
            <input type="file" multiple accept="application/pdf" onChange={handleMerge} />
            {mergedPdfUrl && (
                <div className="mt-4">
                    <a href={mergedPdfUrl} download="merged.pdf" className="text-blue-600 underline">
                        Download Merged PDF
                    </a>
                </div>
            )}
        </div>
    );
}

export default MergePDF;
