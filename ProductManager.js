/*
const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.productIdCounter = 1;
    }

    async init() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            this.products = JSON.parse(data);
            this.productIdCounter = this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1;
        } catch (error) {
            this.products = [];
        }
    }

    async saveData() {
        try {
            const dataToSave = JSON.stringify(this.products, null, 2);
            await fs.writeFile(this.filePath, dataToSave);
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    }
    

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log('Todos los campos son obligatorios.');
            return;
        }
        if (this.products.some((product) => product.code === code)) {
            console.log(`El producto con el código ${code} ya existe.`);
            return;
        }

        const product = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        this.saveData();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.log('Producto no encontrado.');
            return;
        }
        return product;
    }

    updateProduct(id, newData) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            console.log('Producto no encontrado.');
            return;
        }
        this.products[productIndex] = { ...this.products[productIndex], ...newData };
        this.saveData();
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            console.log('Producto no encontrado.');
            return;
        }
        this.products.splice(productIndex, 1);
        this.saveData();
    }
}

const filePath = './Productos.json'; // Ruta al archivo JSON
const productManager = new ProductManager(filePath);

// Inicializar la instancia y cargar los datos existentes
productManager.init().then(() => {
    // Prueba 1: getProducts debe devolver un arreglo vacío
    console.log('Prueba 1 - getProducts (arreglo vacío):');
    console.log(productManager.getProducts());

    // Prueba 2: addProduct con campos especificados
    console.log('Prueba 2 - addProduct con campos especificados:');
    productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

    // Prueba 3: getProducts al agregar un producto
    console.log('Prueba 3 - getProducts al agregar un producto:');
    console.log(productManager.getProducts());

    // Prueba 4: addProduct con los mismos campos (debe arrojar un error)
    console.log('Prueba 4 - addProduct con campos repetidos (debe arrojar un error):');
    productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

    // Prueba 5: getProductById debe encontrar el producto recién agregado
    console.log('Prueba 5 - getProductById para producto recién agregado (ID 1):');
    console.log(productManager.getProductById(1));

    // Prueba 6: getProductById debe devolver error si no encuentra el producto
    console.log('Prueba 6 - getProductById para ID inexistente (ID 3, debe arrojar un error):');
    console.log(productManager.getProductById(3));

    // Prueba 7: updateProduct para cambiar el campo 'price'
    console.log('Prueba 7 - updateProduct para cambiar el campo "price" (ID 1):');
    productManager.updateProduct(1, { price: 250 });
    console.log(productManager.getProductById(1));

    // Prueba 8: deleteProduct para eliminar el producto con ID 1
    console.log('Prueba 8 - deleteProduct para eliminar el producto con ID 1:');
    productManager.deleteProduct(1);
    console.log(productManager.getProducts());
});
*/

const fs = require("fs").promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.productIdCounter = 1;
    }

    async init() {
        try {
        const data = await fs.readFile(this.filePath, "utf-8");
        this.products = JSON.parse(data);
        this.productIdCounter =
            this.products.length > 0
            ? Math.max(...this.products.map((p) => p.id)) + 1
            : 1;
        } catch (error) {
        this.products = [];
        }
    }

    async saveData() {
        try {
        const dataToSave = JSON.stringify(this.products, null, 2);
        await fs.writeFile(this.filePath, dataToSave);
        } catch (error) {
        console.error("Error al guardar los datos:", error);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (
        !title ||
        !description ||
        !price ||
        !thumbnail ||
        !code ||
        stock === undefined
        ) {
        console.log("Todos los campos son obligatorios.");
            return;
        }
        if (this.products.some((product) => product.code === code)) {
            console.log(`El producto con el código ${code} ya existe.`);
            return;
        }

    const product = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };
    this.products.push(product);

    // Espera a que se complete el guardado de datos antes de continuar
    await this.saveData();
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.log("Producto no encontrado.");
            return;
        }
            return product;
    }

    async updateProduct(id, newData) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            console.log("Producto no encontrado.");
            return;
        }
        this.products[productIndex] = {
        ...this.products[productIndex],
        ...newData,
        };

    // Espera a que se complete el guardado de datos antes de continuar
    await this.saveData();
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            console.log("Producto no encontrado.");
        return;
        }
        this.products.splice(productIndex, 1);

    // Espera a que se complete el guardado de datos antes de continuar
    await this.saveData();
    }
}

const filePath = "./Productos.json"; // Ruta al archivo JSON
const productManager = new ProductManager(filePath);

// Inicializar la instancia y cargar los datos existentes
productManager.init().then(async () => {
// Prueba 1: getProducts debe devolver un arreglo vacío
console.log("Prueba 1 - getProducts (arreglo vacío):");
console.log(await productManager.getProducts());

// Prueba 2: addProduct con campos especificados
console.log("Prueba 2 - addProduct con campos especificados:");
await productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
    );

// Prueba 3: getProducts al agregar un producto
console.log("Prueba 3 - getProducts al agregar un producto:");
console.log(await productManager.getProducts());

// Prueba 4: addProduct con los mismos campos (debe arrojar un error)
console.log(
    "Prueba 4 - addProduct con campos repetidos (debe arrojar un error):"
    );
    await productManager.addProduct(
        "producto prueba",
        "Este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
    );

// Prueba 5: getProductById debe encontrar el producto recién agregado
console.log("Prueba 5 - getProductById para producto recién agregado (ID 1):");
console.log(await productManager.getProductById(1));

// Prueba 6: getProductById debe devolver error si no encuentra el producto
console.log("Prueba 6 - getProductById para ID inexistente (ID 3, debe arrojar un error):");
console.log(await productManager.getProductById(3));
// Prueba 7: updateProduct para cambiar el campo 'price'
console.log('Prueba 7 - updateProduct para cambiar el campo "price" (ID 1):');
await productManager.updateProduct(1, { price: 250 });
console.log(await productManager.getProductById(1));

// Prueba 8: deleteProduct para eliminar el producto con ID 1
console.log('Prueba 8 - deleteProduct para eliminar el producto con ID 1:');
await productManager.deleteProduct(1);
console.log(await productManager.getProducts());
});

// codigo corregido con las sugerencias del tutor (ver devolucion entrega 2)