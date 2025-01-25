import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import styles from "./CardCredit.module.css";
import { toast } from 'sonner'
import useCartContext from "../../../hooks/useCartContext";
import { CartProduct } from "../../../interface";

export const CardCredit = () => {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "" as "number" | "name" | "expiry" | "cvc" | "", // Asegurando el tipo correcto
  });

  const { dispatch } = useCartContext()

  const { number, name, expiry, cvc, focus } = cardData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      focus: e.target.name as "number" | "name" | "expiry" | "cvc", // Asegurando el tipo correcto
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([number, name, expiry, cvc].includes("")) {
      toast.error("All fields are required")
      return;
    }

    setCardData({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focus: "",
    });
    dispatch({ type: "CLEAR_CART", payload: {} as CartProduct })
  };

  return (
    <div className={styles.container}>
      <div>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focus || undefined}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label htmlFor="">Card Number</label>
          <input type="text" name="number" id="number" value={number} onChange={handleInputChange} onFocus={handleInputFocus} />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="name">Card Name</label>
          <input type="text" name="name" id="name" value={name} onChange={handleInputChange} onFocus={handleInputFocus} />
        </div>
        {/* GRUPO */}
        <div className={styles.formInputGrup}>
          <div className={styles.formControl}>
            <label htmlFor="expiry">Card Expiry</label>
            <input type="text" name="expiry" id="expiry" value={expiry} onChange={handleInputChange} onFocus={handleInputFocus} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="cvc">Card CVC</label>
            <input type="text" name="cvc" id="cvc" value={cvc} onChange={handleInputChange} onFocus={handleInputFocus} />
          </div>
        </div>
        <button type="submit" className={styles.buyButton}>Buy Now</button>
      </form>
    </div>
  );
};
