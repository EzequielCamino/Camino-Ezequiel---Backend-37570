const express = require ("express");
const ProductManager = require("./main.js");
const app = express();

const productManager = new ProductManager("./products.json");

app.listen(8080, () => {
    console.log("Servidor levantado en el puerto 8080");
});

app.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    const limit = req.query.limit
    if(limit) {
        return res.send(products.slice(0,limit));
    } else {
        return res.send(products);
    }
});

app.get("/products/:id", async (req, res) => {
    const products = await productManager.getProducts();
    const pid = products.find((product) => product.id === Number(req.params.id));
    if (pid) {
        res.send(pid);
    } else {
        return res.send({error: "Product ID not found"})
    }
});




