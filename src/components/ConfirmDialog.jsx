import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

/**
 * Reusable destructive action confirmation dialog.
 * Automatically focuses the safe Cancel action per accessibility guidelines.
 */
function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidthClass="max-w-md">
      <div className="space-y-5">
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-danger/10 border border-danger/30 text-sm text-text-main">
          <AlertTriangle
            className="w-5 h-5 text-danger shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose} data-autofocus="true">
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
