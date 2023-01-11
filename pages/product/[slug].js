import Product from "../../models/Product";
import db from "../../utils/db";
import s from "../../styles/ProductPage.module.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useCart } from "react-use-cart";
import { nanoid } from 'nanoid'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function SingleProduct({ product }) {
  const [selectedSwitch, setSelectedSwitch] = useState("");

  const { addItem } = useCart();
  const { items } = useCart();

  console.log(items);

  const addToCart = () => {
    const productToAdd = {...product, id: nanoid(), selectedSwitch}
    addItem(productToAdd, 1)
  };

  const handleChange = (event) => {
    setSelectedSwitch(event.target.value);
  };

  return (
    <div className={s.centerContainer}>
      <div className={s.container}>
        <div className={s.imgMainContainer}>
          <Image
            src={`/assets/${product.img1}`}
            width={200}
            height={300}
            style={{ objectFit: "contain", width: "100%", height: "70%" }}
          />
          <Image
            src={`/assets/${product.img1}`}
            width={200}
            height={200}
            style={{ objectFit: "contain", height: "29%" }}
          />
        </div>
        <div className={s.productInfoDiv}>
          <h3 style={{ fontSize: "50px", margin: "0" }}>{product.name}</h3>
          <h4 style={{ fontSize: "30px", margin: "0" }}>{product.price} SEK</h4>
          <p>
            Welcome to our keyboard reseller company! We are dedicated to
            providing our
          </p>
          <div className={s.productSelectDiv}>
            {product.switches.length ? 
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">Switch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSwitch}
                label="selectedSwitch"
                onChange={handleChange}
              >
                {product &&
                  product.switches.map((keySwitch) => {
                    return <MenuItem value={keySwitch}>{keySwitch}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            : null
            }
            <Button
              onClick={addToCart}
              color="success"
              variant="contained"
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const productName = context.query.slug;

  await db.connect();
  const product = await Product.findOne({ name: productName }).lean();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
