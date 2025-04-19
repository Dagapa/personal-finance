const prisma = require('../lib/prisma');

export async function createTransaction(data: any) {
  return await prisma.transaction.create({ data });
}

export async function getAllTransactions() {
  return await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
  });
}

export async function updateTransaction(id: string, data: any) {
  return await prisma.transaction.update({
    where: { id: parseInt(id) },
    data,
  });
}

export async function deleteTransaction(id: string) {
  return await prisma.transaction.delete({
    where: { id: parseInt(id) },
  });
}