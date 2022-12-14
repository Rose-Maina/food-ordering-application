import React from "react";

function Item({ id, item, items, setItems, onUpdateItem }) {
  
  function handleDeleteClick() {
    fetch(`https://salty-garden-01634.herokuapp.com/menu/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedItems = items.filter((itemName) => itemName.id !== id);
        setItems(updatedItems);
      })
  }

  function handleAddToCartClick() {
    fetch(`https://salty-garden-01634.herokuapp.com/menu/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
    
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
