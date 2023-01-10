import s from "../ProductCard/ProductCard.module.css";
import Image from "next/image";

const ProductCard = (props) => {
  const prod = props.prod;
  return (
    <div className={s.productCard}>
      <Image
        style={{ objectFit: "contain", width: "100%" }}
        src={`/assets/${prod.Img1}`}
        width={"200"}
        height={"200"}
        alt={prod.name}
      />
      <h3>{prod.Name}</h3>
      <h2>{prod.Price} :-</h2>
    </div>
  );
};

export default ProductCard;
