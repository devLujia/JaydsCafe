import React from 'react';

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel" }) {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(); // Execute the confirm action
        onClose();   // Close the modal after confirming
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/30 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="py-2 px-4 bg-greenColor text-white rounded hover:bg-green-600 transition"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;