import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import apiRouter from "./routes/index";
import fileUpload from "express-fileupload";
import path from "path";

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use((req, res, next) => {
  console.log(`HTTP Method - ${req.method} , URL - ${req.url}`);
  next();
})
console.log("Here is path:", path.join(__dirname, '../../public'))

app.use("/images", express.static(path.join(__dirname, '../../public')))

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use("/api", apiRouter);

console.log("ENV:", process.env.MONGODB_URI);
mongoose.set("strictQuery", false);
mongoose
  // @ts-ignore
  .connect(process.env.MONGODB_URI, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port: ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false);
