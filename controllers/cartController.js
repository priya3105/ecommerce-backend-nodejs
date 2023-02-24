const Cart = require("../models/cartModel");
const Item = require("../models/userModel");

module.exports.get_cart_items = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};
module.exports.add_cart_item = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    let item = await Item.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found");
    }
    const price = item.price;
    const name = item.title;
    if (cart) {
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, name, quantity, price });
      }
      cart.bill += price * quantity;
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.update_cart_module = async (req, res) => {
  const userId = req.params.id;
  const { productId, qty } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    let item = await Item.findOne({ _id: productId });
    if (!item) {
      return res.status(404).send("item not found");
    }
    if (!cart) {
      return res.status(400).send("Cart not found");
    } else {
      let itemIndex = cart.items.findIndex((p) => (p.productId = productId));
      if (itemIndex == -1) {
        return res.status(404).send("Item not found in cart");
      } else {
        let productItem = cart.items[itemIndex];
        productItem.quantity = qty;
        cart.items[itemIndex] = productItem;
      }
      cart.bill = cart.items.reduce(
        (sum, item) => sum + item.price + item * quantity,
        0
      );

      cart = await cart.save();
      return res.status(201).send(cart);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};
module.exports.delete_items = async (req, res) => {
  const userId = req.params.id;
  const productId = req.params.itemId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex == -1) {
      return res.status(404).send("itemnot found");
    }
    if (itemIndex > -1) {
      let productItem = cart.item[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};
