import { FaUserCircle } from "react-icons/fa";
import Logo from "../../../assets/icons8-discotecas.svg";
import styles from "./NavBar.module.css";
import { CartModal } from "../CartModal/CartModal";
import { useState } from "react";
import useCartContext from "../../../hooks/useCartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";

export const NavBar = () => {
  const [showCartModal, setShowCartModal] = useState(false);

  const {
    state: { cartItems },
  } = useCartContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  const handleNavigateToHome = () => {
    navigate("/");
  };

  const handleToLogin = () => {
    navigate("/Login");
  };
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarDetail} onClick={handleNavigateToHome}>
        <img className={styles.logoWhite} src={Logo} alt="logo ecommerce" />
        <h3>Renew</h3>
      </div>
      <FaUserCircle
        style={{
          fontSize: "30px",
          color: "#fff",
          cursor: "pointer",
          marginRight: "30px",
        }}
        onClick={handleToLogin}
      />
      {location.pathname !== "/checkout" && (
        <>
          <div className={styles.navbarCartContainer}>
            <p className={styles.navbarTextAmount}>{cartItems.length}</p>
            <BsHandbag
              style={{
                fontSize: "24px",
                color: "#000000",
                cursor: "pointer",
              }}
              onClick={handleShowCartModal}
            />
            <img />
          </div>
          {showCartModal && (
            <CartModal handleShowCartModal={handleShowCartModal} />
          )}
        </>
      )}
    </div>
  );
};
