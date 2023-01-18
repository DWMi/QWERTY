import style from "./Header.module.css";
import Image from "next/image";
import LOGO from "../../public/brandPic/QWERTYLOGO.svg";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Abel } from "@next/font/google";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import { BsChevronDown } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropdownLink from "../Dropdown Link/DropdownLink";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";


const fontStyle = Abel({ weight: "400", subnets: ["sans-serif"] });

const Header = () => {
  const { data, error } = useSWR("/api/categories/get-all-categories", fetcher);
  const { totalItems } = useCart();

  const [totalCartItems, setTotalCartItems] = useState(null)

  useEffect(() => {
    setTotalCartItems(totalItems)
  }, [totalItems]);


  const { status, data: session } = useSession();

  const logoutHandler = () => {
    signOut({ callbackUrl: "/login" });
  };
  return (
    <div className={style.headerCon}>
      <Image src={LOGO} alt="QWERTY LOGO" />
      <div className={`${style.headerLinksCon} ${fontStyle.className}`}>
        <Link style={{ color: "#979797" }} href="/">
          HOME
        </Link>
        <div className={style.centerContainer}>
          <Link className={style.headerLinks} href="/">
            PRODUCTS
            <div className={style.dropDownDiv}>
              {data &&
                data.map((cat) => (
                  <>
                    <Link href={`/category/${cat.name}`} key={cat._id}>
                      <h3 key={cat.name}>{cat.name}</h3>
                    </Link>
                    {cat.brands &&
                      cat.brands.map((brand) => (
                        <Link href={`/${brand.brandName}`} key={brand._id}>
                          {brand.brandName}
                        </Link>
                      ))}
                  </>
                ))}
            </div>
          </Link>
          <BsChevronDown />
        </div>
        <Link className={style.headerLinks} href="/">
          FAQ
        </Link>
        <Link className={style.headerLinks} href="/">
          CONTACT
        </Link>

        {status === "loading" ? (
          "LOADING"
        ) : session?.user ? (
          <Menu as="div" className={style.DropdownMenuHeader}>
            <Menu.Button className={style.headerLinks}>my account</Menu.Button>
            <Menu.Items className={style.MenuItems}>
              <Menu.Item>
                <DropdownLink className="dropdown-link" href="/profile">
                  Profile
                </DropdownLink>
              </Menu.Item>
              {session.user.isAdmin && (
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/admin">
                    Admin Dashboard
                  </DropdownLink>
                </Menu.Item>
              )}
              <Menu.Item>
                <a className="dropdown-link" href="#" onClick={logoutHandler}>
                  Logout
                </a>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Link className={style.headerLinks} href="/login">
            LOGIN
          </Link>
        )}
        <Link className={style.headerLinks} href="/checkout">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <AiOutlineShoppingCart
              style={{
                stroke: "black",
                strokeWidth: "10",
                fontSize: "20px",
                position: "relative",
              }}
            />
            {totalCartItems > 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "red",
                  borderRadius: "50%",
                  padding: "5px",
                  width: "15px",
                  height: "15px",
                  position: "absolute",
                  left: '15px',
                  top: '-5px'
                
                }}
              >
                <p style={{ fontSize: "12px", color: 'white' }}>{totalCartItems}</p>
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
