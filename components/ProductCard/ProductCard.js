import s from "../ProductCard/ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";

const ProductCard = (props) => {
  const prod = props.prod;
  return (
    <div className={s.productCard}>
      <Link href={`/product/${prod.name}`}>
        <Image
          style={{ objectFit: "contain", width: "100%" }}
          src={prod.img1}
          width={"200"}
          height={"200"}
          alt={prod.name}
        />
        <h3>{prod.name}</h3>
        <h2>{prod.price} :-</h2>
      </Link>
    </div>
  );
};

export default ProductCard;
