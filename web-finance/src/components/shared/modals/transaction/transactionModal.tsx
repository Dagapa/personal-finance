import type { FormEvent, FC } from 'react';
import { createPortal } from 'react-dom';
import type { TransactionI, OnAddTransaction } from '@models/transaction';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: OnAddTransaction;
}

export const TransactionModal: FC<TransactionModalProps> = ({ isOpen, onClose, onAddTransaction }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const transaction: Omit<TransactionI, 'id'> = {
      amount: Number(formData.get('amount')),
      category: formData.get('category') as string,
      date: formData.get('date') as string,
      description: formData.get('description') as string,
    };
    onAddTransaction(transaction);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center rounded-4xl">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Nueva Transacción</h2>
        <form className='flex flex-col gap-4 pt-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="amount" className="block text-white mb-2">Monto</label>
            <input
              type="number"
              name="amount"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-white mb-2">Categoría</label>
            <input
              type="text"
              name="category"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-white mb-2">Fecha</label>
            <input
              type="date"
              name="date"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-white mb-2">Descripción</label>
            <textarea
              name="description"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-around items-centerw-full">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};