import React from "react";
import { toast, Toast } from "react-hot-toast";

interface DeleteToastConfirmProps {
  t: Toast;
  itemName?: string;
  title?: string;
  description?: string;
  entityName?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

const DeleteToastConfirm: React.FC<DeleteToastConfirmProps> = ({
  t,
  itemName,
  title = "Konfirmasi Hapus",
  description,
  entityName = "data",
  confirmText = "Ya, hapus",
  cancelText = "Tidak, batalkan",
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  const handleCancel = () => {
    onCancel?.();
    toast.dismiss(t.id);
  };

  const handleConfirm = async () => {
    try {
      await onConfirm?.();
      toast.dismiss(t.id);
    } catch {
      // Error handling utama sebaiknya dilakukan di onConfirm pada page.
      // Toast confirm tidak perlu menelan error secara diam-diam.
    }
  };

  return (
    <div className="w-full max-w-sm text-center">
      <svg
        className="mx-auto mb-3.5 h-11 w-11 text-red-500"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>

      <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>

      <p className="mb-4 text-sm text-gray-500">
        {description || (
          <>
            Apakah Anda yakin ingin menghapus {entityName}
            {itemName ? (
              <>
                {" "}
                <span className="font-semibold text-red-600">{itemName}</span>
              </>
            ) : null}
            ?
          </>
        )}
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cancelText}
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Menghapus..." : confirmText}
        </button>
      </div>
    </div>
  );
};

export default DeleteToastConfirm;
