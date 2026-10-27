"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type OverlayHandle = {
  open: () => void;
  close: () => void;
};

type OverlayProps = {
  id?: string;
  title: string;
  ariaLabelledBy?: string;
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
};

export const Overlay = forwardRef<OverlayHandle, OverlayProps>(
  ({ id, title, ariaLabelledBy, className = "", children, onClose }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        const dialog = dialogRef.current;
        if (dialog && typeof dialog.showModal === "function") {
          dialog.showModal();
          document.body.classList.add("has-overlay");
        }
      },
      close: () => {
        const dialog = dialogRef.current;
        if (dialog) {
          dialog.close();
        }
      },
    }));

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const handleClose = () => {
        document.body.classList.remove("has-overlay");
        onClose?.();
      };

      dialog.addEventListener("close", handleClose);
      return () => {
        dialog.removeEventListener("close", handleClose);
      };
    }, [onClose]);

    const closeDialog = () => {
      const dialog = dialogRef.current;
      if (dialog) {
        dialog.close();
      }
    };

    return (
      <dialog
        ref={dialogRef}
        id={id}
        className={`overlay ${className}`.trim()}
        aria-labelledby={ariaLabelledBy || (id ? `${id}-title` : undefined)}
      >
        <div className="overlay-head">
          <p className="overlay-title" id={ariaLabelledBy || (id ? `${id}-title` : undefined)}>
            {title}
          </p>
          <button
            type="button"
            className="overlay-close"
            aria-label="Close overlay"
            onClick={closeDialog}
          >
            CLOSE ×
          </button>
        </div>
        {children}
      </dialog>
    );
  },
);

Overlay.displayName = "Overlay";
