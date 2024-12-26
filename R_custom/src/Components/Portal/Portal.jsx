import React, { useState } from "react";
import PortalModal from "./PortalModal";

const Portal = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        commodi quidem quibusdam? Labore ullam minus eveniet magnam, libero
        voluptas. Laudantium, quae. Modi rem nostrum eligendi perferendis
        similique quibusdam architecto ullam.
      </p>
      <div>tets modal open</div>
      <button onClick={() => setOpenModal(true)}>Click</button>
      {openModal && <PortalModal>test modal data</PortalModal>}
      <div>tets header below the modal</div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis sequi
        eos minima eligendi blanditiis aliquid nemo praesentium? Ducimus
        consectetur quos voluptate saepe blanditiis.
      </p>
    </>
  );
};

export default Portal;
