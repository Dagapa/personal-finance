import { createPortal } from 'react-dom';
import { type FormEvent, type FC, useState } from 'react';
import type { TransactionI, OnAddTransaction } from '@models/transaction';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: OnAddTransaction;
  initialData?: Partial<TransactionI>;
}

export const TransactionModal: FC<TransactionModalProps> = ({ isOpen, onClose, onAddTransaction, initialData }) => {
  const [formData, setFormData] = useState<Partial<TransactionI>>({
    ...initialData,
    type: initialData?.type || 'expense'
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transaction: Omit<TransactionI, 'id'> = {
      title: formData.title || '',
      amount: Number(formData.amount) || 0,
      type: formData.type || 'expense',
      category: formData.category || '',
      date: formData.date || new Date().toISOString(),
    };
    onAddTransaction(transaction);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center rounded-4xl">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? 'Editar' : 'Nueva'} Transacción
        </h2>
        <form className='flex flex-col gap-4 pt-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-white mb-2">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-white mb-2">Monto</label>
            <input
              type="number"
              name="amount"
              value={formData.amount || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-white mb-2">Tipo</label>
            <select
              name="type"
              value={formData.type || 'expense'}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-white mb-2">Categoría</label>
            <input
              type="text"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-white mb-2">Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-around items-center w-full">
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