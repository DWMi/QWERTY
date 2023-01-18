import { useCart } from "react-use-cart";
import axios from "axios";
import Image from "next/image";
import Table from "@mui/material/Table";
import Backdrop from "@mui/material/Backdrop";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { BsFillTrashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import s from "../../styles/ProductPage.module.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function checkoutPage() {
  const { items } = useCart();
  const { updateItemQuantity } = useCart();
  const { removeItem } = useCart();
  const { totalItems } = useCart();

  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(null);

  useEffect(() => {
    setCartItems(items);
    setTotalCartItems(totalItems);
  }, [items]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setSpinner(false);
    }, 500);
  }, [loading, spinner]);

  const goToPayment = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("api/stripe/checkout_sessions", {
      cartItems,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ height: "100vh" }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className={s.centerContainer}>
      <h1>Shopping cart</h1>
      {totalCartItems > 0 ? (
        <div
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Total SEK</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems &&
                  cartItems.map((item) => (
                    <>
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Image
                            src={`/assets/${item.img1}`}
                            width={100}
                            height={100}
                            style={{ objectFit: "contain" }}
                          />
                        </TableCell>
                        <TableCell align="left">
                          {item.name}
                          {item.selectedSwitch
                            ? `(${item.selectedSwitch})`
                            : null}
                        </TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        {spinner ? (
                          <TableCell align="right">
                            <CircularProgress color="inherit" />
                          </TableCell>
                        ) : (
                          <TableCell align="right">
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "end",
                              }}
                            >
                              <div
                                onClick={() => {
                                  updateItemQuantity(
                                    item.id,
                                    item.quantity == 1 ? 1 : item.quantity - 1
                                  );
                                  item.quantity == 1 ? setSpinner(false) : setSpinner(true)
                                }}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border: "2px solid black",
                                  width: "20px",
                                  height: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                <p>-</p>
                              </div>

                              <div>{item.quantity}</div>
                              <div
                                onClick={() => {
                                  updateItemQuantity(
                                    item.id,
                                    item.quantity + 1
                                  );
                                  setSpinner(true);
                                }}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border: "2px solid black",
                                  width: "20px",
                                  height: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                <p>+</p>
                              </div>
                            </div>
                          </TableCell>
                        )}

                        <TableCell align="right">{item.itemTotal}</TableCell>
                        <TableCell align="right">
                          <BsFillTrashFill
                            style={{ cursor: "pointer", fontSize: "16px" }}
                            onClick={() => {
                              setLoading(true);
                              removeItem(item.id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            onClick={goToPayment}
            type="submit"
            color="success"
            variant="contained"
            style={{ width: "50%" }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      ) : (
        <h2>Your shopping cart is empty!</h2>
      )}
    </div>
  );
}
