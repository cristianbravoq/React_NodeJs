import { Router } from "express";
import { getListProductsByFilter } from "../controllers/product.controller";

const router = Router();

router.get('/search', getListProductsByFilter);

export default router;