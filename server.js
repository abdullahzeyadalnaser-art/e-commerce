const express = require(`express`);
const dotenv = require(`dotenv`);
const morgan = require("morgan");

dotenv.config({ path: `config.env` });
const ApiErore = require("./utils/apiError");
const globalErorre = require(`./middeleWeres/erroreMidilWere`);
const dbConnection = require(`./config/database`);
//ABI
const gategoryABI = require(`./ABI/categoryABI`);
const SubgategoryABI = require(`./ABI/subcategoryAbi`);
const brandAbi = require(`./ABI/brandABI `);
const productAbi = require(`./ABI/productABI `);
// Connect to database

dbConnection();
//express app
const app = express();

//Middeleware

app.use(express.json());

if (process.env.NODE_env === "development") {
  app.use(morgan(`dev`));
  console.log(`mod: ${process.env.NODE.env}`);
}

//Routes

app.use(`/abi/v1/categories`, gategoryABI);
app.use(`/abi/v1/subcategories`, SubgategoryABI);
app.use(`/abi/v1/brands`, brandAbi);
app.use(`/abi/v1/products`, productAbi);

app.all("*", (req, res, next) => {
  next(new ApiErore(`cant find this route : ${req.originalUrl} `, 400));
});

//Global error handling middlware for express
app.use(globalErorre);

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`APP RUNNING rannig on port${port} `);
});

//Handle  rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection error ${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`shut down.....`);
    process.exit(1);
  });
});

///http://localhost:3000/abi/v1/categories
///http://localhost:3000/abi/v1/subcategories
