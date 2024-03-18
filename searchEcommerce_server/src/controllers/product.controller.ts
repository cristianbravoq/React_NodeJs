import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";

export const getListProductsByFilter = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;

    if (!filter) {
      return res.status(400).json({ message: "Filter parameter is required" });
    }

    const filterValue = typeof filter === "string" ? filter : "";
    const foundProducts: IProduct[] = await Product.find({
      name: { $regex: new RegExp(filterValue, "i") },
    });

    if (foundProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const category = foundProducts[0].category;
    const suggestedProducts: IProduct[] = await Product.find({
        category,
        name: { $nin: foundProducts.map(p => p.name) },
        _id: { $nin: foundProducts.map(p => p._id) }
    }).limit(2);

    res.json({ foundProducts, suggestedProducts });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
