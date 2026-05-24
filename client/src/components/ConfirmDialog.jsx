import Button from "./Button.jsx";
import Modal from "./Modal.jsx";

export default function ConfirmDialog({
  confirmLabel = "Delete",
  description,
  isLoading,
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm action"
}) {
  return (
    <Modal
      description={description}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width="sm"
    >
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button isLoading={isLoading} onClick={onConfirm} variant="danger">
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
