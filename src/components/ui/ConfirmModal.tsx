import React from 'react';
import { Modal } from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <div className="mb-4">{message}</div>
    <div className="flex justify-end gap-2">
      <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">{cancelText}</button>
      <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">{confirmText}</button>
    </div>
  </Modal>
);

export default ConfirmModal;
