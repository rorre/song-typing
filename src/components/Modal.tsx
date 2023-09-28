import clsx from "clsx";
import React, { useRef } from "react";

interface ModalProps extends React.HTMLProps<HTMLDialogElement> {
  trigger: React.ReactNode;
}

export default function Modal({
  trigger,
  children,
  className,
  ...props
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }
  return (
    <>
      <a onClick={showModal}>{trigger}</a>
      <dialog className={clsx("modal", className)} ref={modalRef} {...props}>
        <div className="modal-box">{children}</div>
      </dialog>
    </>
  );
}
