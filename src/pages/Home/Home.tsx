import { Hero } from "../../components/ui/Hero/Hero";
import styles from "./Home.module.css";
import { CardProduct } from "../../components/ui/CardProduct/CardProduct";
import { getProducts } from "../../service";
import { Toaster } from "sonner";
import { useQuery } from "react-query";
import { useState } from "react";

const PRODUCTS_PER_PAGE = 10;

const Home = () => {
  const [page, setPage] = useState(1);

  const { data: products = [], isLoading, isError } = useQuery(
    "products",
    getProducts
  );

  // Lógica de paginación en el frontend
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <>
      <Hero />
      <Toaster />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      <div className={styles.heroTitleContainer}>
        <h1>Bin de Vinilos -</h1>
      </div>
      <div className={styles.container}>
        {paginatedProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className={styles.paginationButton}
        >
          Previous Page
        </button>
        <div className={styles.paginationActive}>
          <span>
            {page}
          </span>
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
  );
};

export default Home;
