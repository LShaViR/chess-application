import app from "./app";
import { port } from "./config";

app.listen(port, () => {
  console.log(`your server is running on port ${port}`);
});

