import env from "./config/environment/config";

import { app } from "./app";

const PORT = env.port || 3000;

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
