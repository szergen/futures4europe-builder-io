'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export type ModalComponentProps = {
  buttonText: string;
  headerTitle?: string;
  children: React.ReactNode;
};

export const ModalComponent: React.FC<ModalComponentProps> = ({
  headerTitle,
  buttonText,
  children,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>{buttonText}</Button> */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        {headerTitle && <Modal.Header>{headerTitle}</Modal.Header>}
        <Modal.Body>
          <div className="space-y-6">{children}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComponent;
