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
import AddNewProduct from "../../components/AddNewProduct/AddNewProduct";
import DeleteProduct from "../../components/DeleteProduct/DeleteProduct.js";
import AddNewBrand from "../../components/AddNewBrand/AddNewBrand";
import { useMediaQuery } from "@mui/material";

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
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openBrand, setOpenBrand] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpen = (prod) => {
    setOpen(true);
    setSelectedProduct(prod);
  };

  const handleOpenNew = (product) => {
    setOpenAdd(true);
  };

  const handleOpenBrand = (product) => {
    setOpenBrand(true);
  };

  const handleOpenDelete = (prod) => {
    setOpenDelete(true);
    setSelectedProduct(prod);
  };

  const handleClose = () => {
    router.push("/admin/products");
    setOpen(false);
    setOpenAdd(false);
    setOpenDelete(false);
    setOpenBrand(false);
  };
  const isTabletOrPhone = useMediaQuery("(max-width:590px)");

  return (
    <>
      {!isTabletOrPhone ? (
        <>
          <div className={styles.AdminDashboardContainer}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "80%",
                gap: "20px",
              }}
            >
              <button
                className={styles.AdminButton}
                type="submit"
                onClick={() => handleOpenBrand()}
              >
                Add Brand
              </button>
              <button
                className={styles.AdminButton}
                type="submit"
                onClick={() => handleOpenNew()}
              >
                Add product
              </button>
            </div>
            <AdminRow></AdminRow>
            {products &&
              products.map((prod) => {
                return (
                  <div className={styles.AdminProductRow}>
                    <div className={styles.AdminProductRowSingleElement}>
                      <h3 style={{ textTransform: "uppercase" }}>
                        {prod._id.slice(-5)}
                      </h3>
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
                      <BsFillTrashFill
                        onClick={() => handleOpenDelete(prod)}
                        style={{ color: "red", cursor: "pointer" }}
                      ></BsFillTrashFill>
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
          <AddNewProduct
            handleClose={handleClose}
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
          ></AddNewProduct>
          <AddNewBrand
            handleClose={handleClose}
            openBrand={openBrand}
            setOpenBrand={setOpenBrand}
          ></AddNewBrand>
          <DeleteProduct
            product={selectedProduct}
            handleClose={handleClose}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
          ></DeleteProduct>
          ;
        </>
      ) : (
        <div className={styles.MQAdminDashboardContainer}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "80%",
              gap: "20px",
            }}
          >
            <button
              className={styles.AdminButton}
              type="submit"
              onClick={() => handleOpenBrand()}
            >
              Add Brand
            </button>
            <button
              className={styles.AdminButton}
              type="submit"
              onClick={() => handleOpenNew()}
            >
              Add product
            </button>
          </div>

          {products &&
            products.map((prod) => {
              return (
                <>
                  <div className={styles.mqCon}>
                    <div className={styles.mqBox1}>
                      <p>ID:</p>
                      <p>NAME:</p>
                      <p>QTY:</p>
                    </div>
                    <div className={styles.mqBox2}>
                      <div>
                        <h3 style={{ textTransform: "uppercase" }}>
                          {prod._id.slice(-5)}
                        </h3>
                      </div>
                      <div>
                        <h3>{prod.name}</h3>
                      </div>
                      <div>
                        <h3>{prod.qty}</h3>
                      </div>
                    </div>
                    <div className={styles.mqBox1}>
                      <p>CATEGORY:</p>
                      <p>BRAND/TYPE:</p>
                      <p>EDIT/DELETE:</p>
                    </div>
                    <div className={styles.mqBox2}>
                      <div>
                        <h3>{prod.category}</h3>
                      </div>
                      <div>
                        <h3>{prod.brand}</h3>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "30px",
                        }}
                      >
                        <div>
                          <BsFillGearFill
                            style={{ cursor: "pointer" }}
                            onClick={() => handleOpen(prod)}
                          ></BsFillGearFill>
                        </div>
                        <div>
                          <BsFillTrashFill
                            onClick={() => handleOpenDelete(prod)}
                            style={{ color: "red", cursor: "pointer" }}
                          ></BsFillTrashFill>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AdminProduct
                    product={selectedProduct}
                    handleClose={handleClose}
                    open={open}
                    setOpen={setOpen}
                  ></AdminProduct>
                  <AddNewProduct
                    handleClose={handleClose}
                    openAdd={openAdd}
                    setOpenAdd={setOpenAdd}
                  ></AddNewProduct>
                  <AddNewBrand
                    handleClose={handleClose}
                    openBrand={openBrand}
                    setOpenBrand={setOpenBrand}
                  ></AddNewBrand>
                  <DeleteProduct
                    product={selectedProduct}
                    handleClose={handleClose}
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                  ></DeleteProduct>
                </>
              );
            })}
        </div>
      )}
    </>
  );
}
