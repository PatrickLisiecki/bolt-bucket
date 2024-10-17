import express from "express";
import path from "path";
import favicon from "serve-favicon";
import dotenv from "dotenv";
import cors from "cors";

import exteriorsRouter from "./routes/exteriorsRoute.js";
import roofsRouter from "./routes/roofsRoute.js";
import wheelsRouter from "./routes/wheelsRoute.js";
import interiorsRouter from "./routes/interiorsRoute.js";
import carsRouter from "./routes/carsRoute.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(favicon(path.resolve("../", "client", "public", "lightning.png")));
} else if (process.env.NODE_ENV === "production") {
    app.use(favicon(path.resolve("public", "lightning.png")));
    app.use(express.static("public"));
}

// Routes
app.use("/api/exteriors", exteriorsRouter);
app.use("/api/roofs", roofsRouter);
app.use("/api/wheels", wheelsRouter);
app.use("/api/interiors", interiorsRouter);
app.use("/api/cars", carsRouter);

if (process.env.NODE_ENV === "production") {
    app.get("/*", (_, res) =>
        res.sendFile(path.resolve("public", "index.html")),
    );
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
