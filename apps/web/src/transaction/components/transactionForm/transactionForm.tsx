import styles from "./styles.module.css";
import { Transaction, TransactionType } from "../../models/transactions";
import { addNewTransaction, getFormValues } from "../../services/transactionServices";

export const TransactionForm = () => {

  const createNewTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = getFormValues(e.currentTarget);
    const date = new Date();
    const request: Transaction = {
      amount: Number(values.amount),
      category: values.category as string,
      description: values.description as string,
      type: values.type as TransactionType,
      transactionDate: date.toISOString()
    };
    const createdTransaction = addNewTransaction(request);

    if (!createdTransaction) {
      alert('Error creating transaction');
    }
    alert('Transaction created successfully');
  };

  return (
    <form onSubmit={createNewTransaction} className={styles.form}>
      <input type="number" placeholder="Amount" name="amount" />
      <input type="text" placeholder="Category" name="category" />
      <input type="text" placeholder="Description" name="description" />
      <input type="text" placeholder="type" name="type" />
      <button>Add Transaction</button>
    </form>
  );
};