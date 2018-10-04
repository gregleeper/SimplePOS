import Dexie from "dexie";

const db = new Dexie("SimplePOS");
db.version(1).stores({ items: "++id, name, price" });

db.on();

export default db;
