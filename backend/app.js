import connectToDb from "./db";
import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/note.js";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_SERVICE_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(json());

connectToDb();

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Notekarlo BACKEND</h1>");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
