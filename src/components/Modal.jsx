import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Accessible modal dialog built on the native HTML <dialog> element.
 * Handles showModal(), Esc dismissal, light-dismiss outside click, and focus restoration.
 */
function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdrop = true,
  maxWidthClass = 'max-w-lg',
}) {
  const dialogRef = useRef(null);
  const pressedOutsideRef = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      const target = dialog.querySelector('[data-autofocus="true"]');
      target?.focus();
    } else if (!isOpen && dialog.open) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      if (dialog.returnValue !== undefined) {
        dialog.returnValue = '';
      }
      onClose?.();
    };

    const handleCancel = (e) => {
      e.preventDefault();
      onClose?.();
    };

    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  const isOutsideDialog = (event, dialog) => {
    const rect = dialog.getBoundingClientRect();
    return (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    );
  };

  const handlePointerDown = (event) => {
    if (!closeOnBackdrop || !dialogRef.current) return;
    pressedOutsideRef.current = isOutsideDialog(event, dialogRef.current);
  };

  const handlePointerUp = (event) => {
    if (!closeOnBackdrop || !dialogRef.current) return;
    if (pressedOutsideRef.current && isOutsideDialog(event, dialogRef.current)) {
      onClose?.();
    }
    pressedOutsideRef.current = false;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      closedby={closeOnBackdrop ? 'any' : 'closerequest'}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`${maxWidthClass} w-full`}
    >
      <div className="rounded-3xl bg-surface border border-border shadow-card text-text-main p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 id={titleId} className="text-xl font-bold tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-surface-secondary text-text-muted hover:text-text-main hover:border-primary border border-transparent transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;

