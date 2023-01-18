import Product from "../../models/Product";
import db from "../../utils/db";
import s from "../../styles/ProductPage.module.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { nanoid } from "nanoid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function SingleProduct({ product }) {
  const [loading, setLoading] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState("");

  useEffect(() => {
    if (product.category === "Keyboards") {
      setSelectedSwitch("mx red");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, [loading]);

  const { addItem } = useCart();
  const { items } = useCart();
  const { updateItemQuantity } = useCart();
  console.log(items);

  const addToCart = () => {
    const foundProduct = items.find(
      (item) => item.selectedSwitch == selectedSwitch && item._id == product._id
    );

    if (foundProduct) {
      updateItemQuantity(foundProduct.id, foundProduct.quantity + 1);
    } else {
      const productToAdd = { ...product, id: nanoid(), selectedSwitch };
      addItem(productToAdd, 1);
    }
  
  };

  const handleChange = (event) => {
    setSelectedSwitch(event.target.value);
  };

  return (
    <div className={s.centerContainer}>
      <div className={s.container}>
        <div className={s.imgMainContainer}>
          <Image
            src={product.img1}
            width={200}
            height={300}
            style={{ objectFit: "contain", width: "100%", height: "70%" }}
          />

          {product.img2 ? (
            <Image
              src={product.img2}
              width={200}
              height={200}
              style={{ objectFit: "contain", height: "29%" }}
            />
          ) : null}
        </div>
        <div className={s.productInfoDiv}>
          <h3 style={{ fontSize: "50px", margin: "0" }}>{product.name}</h3>
          <h4 style={{ fontSize: "30px", margin: "0" }}>{product.price} SEK</h4>
          <div className={s.productSelectDiv}>
            {product.switches.length ? (
              <FormControl required sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel value="HEJ" id="demo-simple-select-label">
                  Switch
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
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
            ) : null}

            {loading ? (
              <Button
                onClick={() => {
                  addToCart();
                  setLoading(true);
                }}
                color="success"
                variant="contained"
                style={{width: '130px'}}
              >
                <CircularProgress color="inherit" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  addToCart();
                  setLoading(true);
                }}
                color="success"
                variant="contained"
              >
                ADD TO CART
              </Button>
            )}
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
