import db from "../../db.json"; // Importa el archivo db.json
import { Product } from "../interface";

// Obtiene los productos directamente desde el archivo db.json
export const getProducts = async (): Promise<Product[]> => {
  try {
    return db.vinilos; // Accede al array `vinilos` dentro de `db.json`
  } catch (error) {
    throw new Error(`Error obteniendo los productos: ${error instanceof Error ? error.message : "Error desconocido"}`);
  }
};

export const createProduct = async (product: Product): Promise<Product> => {
  try {
    // Generamos un nuevo ID como string (aseguramos que sea de tipo string)
    const newProduct: Product = { 
      ...product, 
      id: (db.vinilos.length + 1).toString() // Convertimos el ID a string
    };

    db.vinilos.push(newProduct); // Agrega el producto al array en memoria
    return newProduct; // Retorna el nuevo producto
  } catch (error) {
    throw new Error(`Error creando el producto: ${error instanceof Error ? error.message : "Error desconocido"}`);
  }
};


export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const index = db.vinilos.findIndex((product) => product.id.toString() === id.toString()); // Convertir ambos ids a string
    if (index !== -1) {
      db.vinilos.splice(index, 1); // Elimina el producto del array
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    throw new Error(`Error eliminando el producto: ${error instanceof Error ? error.message : "Error desconocido"}`);
  }
};