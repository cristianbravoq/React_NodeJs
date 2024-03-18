import express from "express";
import productRoutes from "./routes/product.routes" 
import morgan from "morgan";
import cors from "cors";

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(productRoutes);

export default app;