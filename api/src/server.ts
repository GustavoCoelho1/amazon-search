import express from "express";
import scrapeRoutes from "./routes/scrapeRoute";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//API Routes
app.use("/api", scrapeRoutes);

//Server config
const hosturl = process.env.HOST_URL;
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.info("Application running at: " + hosturl + ":" + port);
});
