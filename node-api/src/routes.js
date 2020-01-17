const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const PlayerController = require('./controllers/PlayerController');

routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);


routes.get("/players", PlayerController.index);
routes.post("/players", PlayerController.store);

module.exports = routes;