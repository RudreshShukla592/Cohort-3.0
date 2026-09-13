import app from "./src/app.js";
import { connectDb } from "./src/config/db.js";

await connectDb()

app.listen(3000, () => {
  console.log("running on port 3000");
});
