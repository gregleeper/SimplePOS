import Dexie from "dexie";

//Todo need to add a table for transactions and find
// a way to use a foreign key in transactions. Do I need to
// resolve the m:m relationship of transactions and items?
const db = new Dexie("SimplePOS");
db.version(1).stores({ items: "++id, name, price" });

db.on();

export default db;
