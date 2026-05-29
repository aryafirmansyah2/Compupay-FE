import React from "react";
import { toast, Toast } from "react-hot-toast";

interface DeleteToastConfirmProps {
  t: Toast; // Tipe untuk instance toast
  itemName: string; // Nama item yang akan ditampilkan
  onConfirm?: () => void; // Callback saat tombol "Ya, saya yakin" ditekan
}

const DeleteToastConfirm: React.FC<DeleteToastConfirmProps> = ({
  t,
  itemName,
  onConfirm,
}) => {
  return (
    <div className="text-center">
      {/* Ikon hapus */}
      <svg
        className="text-gray-400 w-11 h-11 mb-3.5 mx-auto"
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

      {/* Pesan konfirmasi */}
      <p className="mb-4 text-gray-500">
        Apakah Anda yakin ingin menghapus product dengan Nomor Surat :{" "}
        <span className="font-semibold text-red-600">{itemName}</span>?
      </p>

      {/* Tombol aksi */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900"
        >
          Tidak, batalkan
        </button>
        <button
          onClick={() => {
            onConfirm?.();
            toast.dismiss(t.id); // Tutup toast setelah dikonfirmasi
          }}
          className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
        >
          Ya, saya yakin
        </button>
      </div>
    </div>
  );
};

export default DeleteToastConfirm;
