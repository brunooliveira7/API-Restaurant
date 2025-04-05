import express from "express";

import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";

const PORT = 3333;
const app = express();

app.use(express.json());
//conectar as rotas - index.ts
app.use(routes);

//middleware de tratamento de erros 
app.use(errorHandling)
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
