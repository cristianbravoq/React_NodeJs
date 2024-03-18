"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListProductsByFilter = void 0;
const product_1 = __importDefault(require("../models/product"));
const getListProductsByFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter } = req.query;
        if (!filter) {
            return res.status(400).json({ message: "Filter parameter is required" });
        }
        const filterValue = typeof filter === "string" ? filter : "";
        const foundProducts = yield product_1.default.find({
            name: { $regex: new RegExp(filterValue, "i") },
        });
        if (foundProducts.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        const category = foundProducts[0].category;
        const suggestedProducts = yield product_1.default.find({
            category,
            name: { $nin: foundProducts.map(p => p.name) },
            _id: { $nin: foundProducts.map(p => p._id) }
        }).limit(2);
        res.json({ foundProducts, suggestedProducts });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getListProductsByFilter = getListProductsByFilter;
