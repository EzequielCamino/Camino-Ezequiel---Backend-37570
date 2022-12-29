const fs = require('fs');

class ProductManager {
    static idCreator = 0;
    products;
    constructor(path) {
        this.path = path;
        try {
            this.loadFile();
        } catch {
            this.products = [];
            this.saveFile();
        }
    }
    loadFile(){
        try {
            this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } catch (error) {
            throw new Error(error);
        }
    }
    saveFile(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } catch (error) {
            throw new Error(error);
        }
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if(this.products.find((product) => product.code === code)) {
            return console.log("Code assigned");
        } else if(title && description && price && thumbnail && stock) {
            this.idCreator++;
            const id = ProductManager.idCreator
            const product = {id, title, description, price, thumbnail, code, stock};
            this.products.push(product);
            this.saveFile();
        } else {
            return console.warn("Faltan completar datos");
        }
    }
    getProducts() {
        this.loadFile();
        return this.products;
    }
    getProductById(id){
        return this.products.find((product) => product.id === id) || console.warn("Product ID not found");
    }
    updateProduct(id, data){
        if(this.products.find((product) => product.id === id)){
            const updatedProduct = this.products.map((product) => product.id === id ? {...product, ...data} : product)
            this.products = updatedProduct;
            return this.saveFile();
        }
        console.warn("Product not updated. ID not found");
    }
    deleteProduct(id){
        const index = this.products.indexOf(this.products.find((product) => product.id === id));
        if(index === -1){
            return console.warn("Product not deleted. ID not found")
        }
        this.products.splice(index, 1);
        this.saveFile();
    }
}

module.exports = ProductManager;

/* TESTING CODE */
/* let newProducts = new ProductManager("products.json");
newProducts.getProducts();
newProducts.addProduct("producto prueba", "Este es un producto prueba", 100, "Sin imagen", "abc123", 22);
newProducts.addProduct("producto prueba2", "Este es otro producto prueba", 200, "Sin imagen", "abc1234", 23);
newProducts.addProduct("producto prueba3", "Este es otro producto prueba", 300, "Sin imagen", "abc12345", 2);
newProducts.addProduct("producto prueba4", "Este es otro producto prueba", 400, "Sin imagen", "abc123456", 5);
newProducts.addProduct("producto prueba5", "Este es otro producto prueba", 500, "Sin imagen", "abc4321", 15);
newProducts.addProduct("producto prueba6", "Este es otro producto prueba", 600, "Sin imagen", "abc432", 45);
newProducts.addProduct("producto prueba7", "Este es otro producto prueba", 700, "Sin imagen", "abc42314", 65);
newProducts.addProduct("producto prueba8", "Este es otro producto prueba", 800, "Sin imagen", "abc654", 20);
newProducts.addProduct("producto prueba9", "Este es otro producto prueba", 900, "Sin imagen", "abc65487", 25);
newProducts.addProduct("producto prueba10", "Este es otro producto prueba", 1000, "Sin imagen", "abc16878", 40);
newProducts.getProducts();
newProducts.getProductById(5);
newProducts.getProductById(2);
newProducts.updateProduct(5, {title: 'producto prueba updateado'});
newProducts.updateProduct(2, {title: 'producto prueba updateado'});
newProducts.getProducts();
newProducts.deleteProduct(5);
newProducts.deleteProduct(2);
newProducts.getProducts(); */
