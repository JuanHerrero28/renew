import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Product } from "../../interface";
import { createProduct, getProducts, deleteProduct } from "../../service";

const PRODUCTS_PER_PAGE = 5;

const Dashboard = () => {
  const [product, setProduct] = useState({
    id: "",  // Debería ser un number si la interfaz Product tiene id como number
    title: "",
    image: "",
    type: "",
    price: 0,
  });

  const [showForm, setShowForm] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [page, setPage] = useState(1); // Paginación para Dashboard
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (!userLogin) {
      navigate("login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const mutation = useMutation((newProduct: Product) => {
    return createProduct(newProduct);
  });

  const deleteMutation = useMutation((id: number) => deleteProduct(id), {
    onSuccess: () => {
      // Refrescar la lista de productos después de eliminar
      queryClient.invalidateQueries("products");
    },
  });

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery("products", getProducts);

  // Lógica de paginación para Dashboard
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(product);
  };

  const handleShowForm = () => {
    setShowProducts(false);
    setShowForm(true);
  };

  const handleShowProduct = () => {
    setShowForm(false);
    setShowProducts(true);
  };

  const errorMessage = error instanceof Error ? error.message : "Ha ocurrido un error";

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h1>Menu</h1>
        <ul>
          <li onClick={handleShowForm}>Crear Producto</li>
          <li>Editar Producto</li>
          <li onClick={handleShowProduct}>Listar Productos</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <h1>Dashboard</h1>

        {showProducts && (
          <div className={styles.productList}>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{errorMessage}</p>
            ) : (
              <>
                <ul>
                  {paginatedProducts.map((product: Product) => (
                    <li key={product.id} className={styles.productItem}>
                      <img
                        className={styles.imgDash}
                        src={product.image}
                        alt=""
                      />
                      <div className={styles.productDetails}>
                        <h3>
                          <span>Album:</span> {product.title}
                        </h3>
                        <p>
                          <span>Genero:</span> {product.type}
                        </p>
                        <p>
                          <span>Precio:</span> $ {product.price}
                        </p>
                      </div>
                      <button
                        className={styles.deleteButton}
                        onClick={() => {
                          if (product.id && product.id.trim() !== "") {
                            const idNumber = Number(product.id); // Convertimos el string a number
                            if (!isNaN(idNumber)) {  // Comprobamos si la conversión es exitosa
                              deleteMutation.mutate(idNumber);  // Pasamos el id como número
                            } else {
                              console.error("El ID del producto no es un número válido");
                            }
                          } else {
                            console.error("El ID del producto es vacío o inválido");
                          }
                        }}
                        disabled={deleteMutation.isLoading}
                      >
                        {deleteMutation.isLoading
                          ? "Eliminando..."
                          : "Eliminar"}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className={styles.paginationContainer}>
                  <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                    className={styles.paginationButton}
                  >
                    Previous Page
                  </button>
                  <div className={styles.paginationActive}>
                    Página {page} de {totalPages}
                  </div>
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === totalPages}
                    className={styles.paginationButton}
                  >
                    Next Page
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className={styles.formControl}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formControl}>
              <label htmlFor="image">Image</label>
              <input
                type="url"
                id="image"
                name="image"
                value={product.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formControl}>
              <label htmlFor="type">Genero</label>
              <input
                type="text"
                id="type"
                name="type"
                value={product.type}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formControl}>
              <label htmlFor="price">Precio</label>
              <input
                type="text"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formControl}>
              <button type="submit">Add Product</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
