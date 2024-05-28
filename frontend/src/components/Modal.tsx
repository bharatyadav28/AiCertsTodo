import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface propsTypes {
  onClose: () => void;
  children: ReactNode;
}

const Modalcontent: React.FC<propsTypes> = ({ onClose, children }) => {
  return <div className="modal">{children}</div>;
};

const Backdrop: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  return <div className="backdrop" onClick={handleClose} />;
};

const Modal: React.FC<propsTypes> = ({ onClose, children }) => {
  const domNode = document.getElementById("modal");
  return (
    <>
      {domNode &&
        createPortal(
          <Modalcontent onClose={onClose}>{children}</Modalcontent>,
          domNode
        )}
      {domNode && createPortal(<Backdrop handleClose={onClose} />, domNode)}
    </>
  );
};

export default Modal;
