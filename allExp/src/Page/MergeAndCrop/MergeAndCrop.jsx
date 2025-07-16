import React, { useState } from "react";
import AutoCropPdf from "../CropPdf/AutoCropPdf";
import MergePDF from "../MergePDF/MergePDF";
import PdfCropper from "../CropPdf/ManualCropPdf";

const MergeAndCrop = () => {
    console.log("ini--merge--crop");

    const [mergedFile, setMergedFile] = useState(null)
    return (
        mergedFile ?
            <PdfCropper
                mergedFile={mergedFile}
                setMergedFile={setMergedFile}
            /> :
            <MergePDF
                setMergedFile={setMergedFile}
                isMeregWithCrop={true}
            />
    )
};

export default MergeAndCrop;
