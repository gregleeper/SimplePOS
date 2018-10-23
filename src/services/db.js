import Dexie from "dexie";
import relationships from "dexie-relationships";

//Todo need to add a table for transactions and find
// a way to use a foreign key in transactions. Do I need to
// resolve the m:m relationship of transactions and items?
const db = new Dexie("SimplePOS", { addons: [relationships] });
db.version(1).stores({ items: "++id, name, price" });

db.version(2).stores({
  items: "++id, name, price",
  transactions: "++id, fun"
});

db.version(3).stores({
  items: "++id, name, price",
  transactions: "++id, fun",
  totals: "++id, total, completed"
});

db.version(4).stores({
  items: "++id, name, price",
  transactions: "++id, fun",
  totals: "++id, totalItems, totalPrice, completed"
});

db.version(5).stores({
  items: "++id, name, price",
  transactions: "++id, itemId -> items.id"
});
db.version(6).stores({
  items: "++id, name, price, qty",
  transactions: "++id, itemId -> items.id"
});
db.version(7).stores({
  items: "++id, name, price, qty",
  transactions: "++id, itemId -> items.id, date"
});

db.on();

export default db;
