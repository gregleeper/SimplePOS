const items = [
  {
    id: 1,
    name: "Water",
    value: 0,
    price: 1
  },
  {
    id: 2,
    name: "Soda",
    value: 0,
    price: 2
  },
  {
    id: 3,
    name: "Hot Dog",
    value: 0,
    price: 2
  },
  {
    id: 4,
    name: "Pizza",
    value: 0,
    price: 3
  },
  {
    id: 5,
    name: "Candy",
    value: 0,
    price: 1
  }
];

export function getItems() {
  return items;
}

export function getItem(id) {
  return items.find(i => i.id === id);
}

export function saveItem(item) {
  let itemInDb = items.find(i => i.id === item.id) || {};
  itemInDb.name = item.name;
  itemInDb.price = item.price;

  if (!itemInDb.id) {
    itemInDb.id = Date.now().toString();
    items.push(itemInDb);
  }
  return itemInDb;
}

export function deleteItem(id) {
  let itemInDb = items.find(i => i.id === id);
  items.splice(items.indexOf(itemInDb), 1);
  return itemInDb;
}
