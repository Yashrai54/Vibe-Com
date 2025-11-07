import cartModel from "../models/cart.model.js";
import axios from "axios";

export const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.user.id });

        if (!cart) return res.status(200).json({ cartItems: [], total: 0 });

        let total = 0;
        const cartItems = await Promise.all(cart.items.map(async item => {
            const { data: product } = await axios.get(`https://fakestoreapi.com/products/${item.productId}`);
            total += product.price * item.quantity;
            return { ...item._doc, price: product.price, title: product.title, image: product.image };
        }));

        res.status(200).json({ cartItems, total });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        const existingCart = await cartModel.findOne({ userId });
        console.log(existingCart.items)
        if (existingCart) {
            const itemIndex = existingCart.items.findIndex(i => Number(i.productId) === Number(productId));
            if (itemIndex > -1) {
                existingCart.items[itemIndex].quantity += quantity || 1;
            } else {
                existingCart.items.push({ productId, quantity: quantity || 1 });
            }
            await existingCart.save();
            return res.status(200).json({ message: "Cart updated", cart: existingCart });
        }

        const newCart = new cartModel({
            userId,
            items: [{ productId, quantity: quantity || 1 }]
        });
        console.log(existingCart.items)
        await newCart.save();
        res.status(201).json({ message: "Product added to cart", cart: newCart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const deleteFromCart = async (req, res) => {
    const productId=Number(req.params.id)
    const userId = req.user.id;

    try {
        const existingCart = await cartModel.findOne({ userId });

        if (!existingCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = existingCart.items.findIndex(i => i.productId === productId);

        if (itemIndex > -1) {
            
                existingCart.items.splice(itemIndex, 1);

            await existingCart.save();
            return res.status(200).json({ message: "Cart updated", cart: existingCart });
        }

        return res.status(404).json({ message: "Product not found in cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const updateCart=async(req,res)=>{
    const productId=Number(req.params.id)
    const {quantity}=req.body
        const userId = req.user.id;

        try {
        const existingCart = await cartModel.findOne({ userId });

        if (!existingCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = existingCart.items.findIndex(i => i.productId === productId);

        if (itemIndex > -1) {
                existingCart.items[itemIndex].quantity-=quantity 
               if(existingCart.items[itemIndex].quantity<=0){
                existingCart.items.splice(itemIndex, 1);
               }

            await existingCart.save();
            return res.status(200).json({ message: "Cart updated", cart: existingCart });
        }

        return res.status(404).json({ message: "Product not found in cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
export const checkout = async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch cart items
    const cart = await cartModel.findOne({ userId });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Fetch product details from Fakestore
    const products = await Promise.all(
      cart.items.map(async (item) => {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${item.productId}`);
        return { ...item._doc, title: data.title, price: data.price };
      })
    );

    const total = products.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = { userId, items: products, total, status: "success", date: new Date() };

    // Clear cart atomically without loading versioned document
    await cartModel.updateOne(
      { _id: cart._id },
      { $set: { items: [] } }
    );

    res.status(200).json({ message: "Checkout complete", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};