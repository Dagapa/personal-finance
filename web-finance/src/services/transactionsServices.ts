import type { TransactionI } from "@models/transaction";

export const transformTransactionsToVisualice = (transactions: TransactionI[]) => {
  return transactions.map(transaction => ({
    ...transaction,
    date: new Date(transaction.date).toISOString()
  }));
}