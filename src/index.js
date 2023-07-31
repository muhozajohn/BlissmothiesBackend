import app from "./app";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DataDaseConn)
  .then(() => {
    console.log("Db Connected Sucessfully");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4200;


app.listen(process.env.PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
