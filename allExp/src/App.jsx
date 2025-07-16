import ManualCropPdf from "./Page/CropPdf/ManualCropPdf"
import AutoCropPdf from "./Page/CropPdf/AutoCropPdf";
import MergePDF from "./Page/MergePDF/MergePDF"
import RemovePagePdf from "./Page/RemovePagePdf/RemovePagePdf";
import SplitPdf from "./Page/SplitPdf/SplitPdf";
import { MergeAndCrop } from "./Page/MergeAndCrop/MergeAndCrop";
function App() {

  return (
    <>
      {/* <AutoCropPdf /> */}
      {/* //-----crop pdf---- */}
      {/* <ManualCropPdf /> */}
      {/* <MergePDF /> */}
      <RemovePagePdf />
      <SplitPdf />
      <MergeAndCrop />
    </>
  );
}

export default App;