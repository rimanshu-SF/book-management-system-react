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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-muted-red/10 backdrop-blur-lg border-2 border-muted-red/20 p-6 rounded-xl w-80 shadow-2xl text-center transition-all duration-300">
        <h2 className="text-xl text-muted-red font-bold mb-4 drop-shadow-md">Confirmation!</h2>
        <p className="text-gray-200 mb-6 drop-shadow-sm">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={handleConfirm}
            className="bg-green-500/80 text-white py-2 px-4 rounded-md hover:bg-green-600/90 backdrop-blur-sm border border-green-400/30 transition-all duration-200"
          >
            <Check />
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500/80 text-white py-2 px-4 rounded-md hover:bg-red-600/90 backdrop-blur-sm border border-red-400/30 transition-all duration-200"
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;