class ProductManager {
    static idCreator = 0;
    constructor() {
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if(this.products.find((product) => product.code === code)) {
            return console.log("Code assigned");
        } else {
            ProductManager.idCreator++;
            const id = ProductManager.idCreator
            const product = {id, title, description, price, thumbnail, code, stock}
            this.products.push(product);
        }
    }
    getProducts() {
        return console.log(this.products)
    }
    getProductById(id){
        return console.log(this.products.find((product) => product.id === id) || "Not found");
    }
}


/* TESTING CODE */

/* let newProducts = new ProductManager;
newProducts.addProduct("a", "b", 10, "no", 45, 20);
newProducts.addProduct("a", "b", 10, "no", 45, 20);
newProducts.addProduct("a", "b", 10, "no", 54, 20);
newProducts.getProducts()
newProducts.getProductById(2);
newProducts.getProductById(5);
 */