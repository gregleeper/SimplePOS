import _ from "lodash";

const transactions = [
  {
    id: 0,
    total: 0
  }
];

let lastId = 0;

export function newId() {
  lastId++;
  return lastId;
}

export function getTransactions() {
  return transactions;
}

export function getTransaction(id) {
  return transactions.find(t => t.id === id);
}

export function getLastTransaction() {
  return transactions[transactions.length() - 1];
}

export function saveTransaction(total) {
  let transaction = {};
  transaction.id = newId();
  transaction.total = total;
  transactions.push(transaction);
  return transaction;
}

export function deleteTransaction(id) {
  let tranactionInDb = transactions.find(t => t.id === id);
  transactions.splice(transactions.indexOf(tranactionInDb), 1);
  return tranactionInDb;
}
