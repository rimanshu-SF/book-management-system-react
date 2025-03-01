import { Check, X } from "lucide-react";
import React from "react";

interface ConfirmationModalProps {
  show: boolean;
  onConfirm: (index: number) => void;
  onCancel: () => void;
  message: string;
  bookIndex: number | null;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onConfirm,
  onCancel,
  message,
  bookIndex,
}) => {
  if (!show) return null;

  const handleConfirm = () => {
    if (bookIndex !== null) {
      onConfirm(bookIndex);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg text-center">
        <h2 className="text-xl text-light-org font-bold mb-4">Confirmation ?</h2>
        <p className="text-red-700 mb-6">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            <Check />
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
