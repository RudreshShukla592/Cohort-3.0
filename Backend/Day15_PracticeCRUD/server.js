import app from "./src/app.js";
import config from "./src/config/config.js";
import { connectDb } from "./src/config/db.js";

await connectDb()

const port = config.PORT;
app.listen(port, () => {
  console.log(`Running on port:- ${port}`);
});
