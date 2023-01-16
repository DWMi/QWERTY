import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout.js";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Product from "../../models/Product";
import db from "../../utils/db";
import ProductCard from "../../components/ProductCard/ProductCard";
import { BsFillGearFill, BsFillTrashFill } from "react-icons/bs";
import AdminRow from "../../components/AdminRow/AdminRow.js";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AdminProduct from "../../components/AdminProduct/AdminProduct.js";

export async function getServerSideProps(context) {
  const categoryName = context.query.categoryName;
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
  db.disconnect();
}

export default function Products({ products }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user.isAdmin) {
      router.push("/");
      //make unauthorized page later
    }
  }, []);
  const [selectedProduct, setSelectedProduct] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = (prod) => {
    setOpen(true);
    setSelectedProduct(prod);
  };
  const handleClose = () => {
    router.push("/admin/products");
    setOpen(false);
  };
  return (
    <>
      <div className={styles.AdminDashboardContainer}>
        <AdminRow></AdminRow>
        {products &&
          products.map((prod) => {
            return (
              <div className={styles.AdminProductRow}>
                <div className={styles.AdminProductRowSingleElement}>
                  <h3>{prod._id.slice(-5)}</h3>
                </div>
                <div className={styles.AdminProductRowSingleElement}>
                  <h3>{prod.name}</h3>
                </div>
                <div className={styles.AdminProductRowSingleElement}>
                  <h3>{prod.qty}</h3>
                </div>
                <div className={styles.AdminProductRowSingleElement}>
                  <h3>{prod.category}</h3>
                </div>
                <div className={styles.AdminProductRowSingleElement}>
                  <h3>{prod.brand}</h3>
                </div>
                <div className={styles.AdminProductRowSingleElementIcon}>
                  <BsFillGearFill
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpen(prod)}
                  ></BsFillGearFill>
                </div>
                <div className={styles.AdminProductRowSingleElementIcon}>
                  <BsFillTrashFill style={{ color: "red" }}></BsFillTrashFill>
                </div>
              </div>
            );
          })}
      </div>

      <AdminProduct
        product={selectedProduct}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
      ></AdminProduct>
    </>
  );
}