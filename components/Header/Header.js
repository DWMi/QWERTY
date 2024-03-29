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

import HamburgerMenu from "../Hamburger/Hamburger";
import { useMediaQuery } from "@mui/material";

const fontStyle = Abel({ weight: "400", subnets: ["sans-serif"] });

const Header = () => {
  const { data, error } = useSWR("/api/categories/get-all-categories", fetcher);
  const { totalItems } = useCart();

  const [totalCartItems, setTotalCartItems] = useState(null);

  useEffect(() => {
    setTotalCartItems(totalItems);
  }, [totalItems]);

  const { status, data: session } = useSession();

  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
  };
  const isTabletOrPhone = useMediaQuery("(max-width:590px)");
  return (
    <div className={style.headerCon}>
      <Link href="/">
        <Image src={LOGO} alt="QWERTY LOGO" />
      </Link>
      {!isTabletOrPhone ? (
        <div className={`${style.headerLinksCon} ${fontStyle.className}`}>
          <Link className={style.headerLinks} href="/">
            HOME
          </Link>

          <Menu as="div" className={style.DropdownMenuHeader}>
            <div className={style.centerContainer}>
              <Menu.Button className={style.headerLinksProd}>
                products
                <BsChevronDown />
              </Menu.Button>
            </div>
            <Menu.Items className={style.MenuItems}>
              {data &&
                data.map((cat) => (
                  <>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href={`/category/${cat.name}`}
                        key={cat._id}
                      >
                        <h3 className={style.CategoryTitle}>{cat.name}</h3>
                      </DropdownLink>
                    </Menu.Item>

                    {cat.brands &&
                      cat.brands.map((brand) => (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href={`/${brand.brandName}`}
                            key={brand.brandName}
                          >
                            <p className={style.BrandsTitle}>
                              {brand.brandName}
                            </p>
                          </DropdownLink>
                        </Menu.Item>
                      ))}
                  </>
                ))}
            </Menu.Items>
          </Menu>
          <Link className={style.headerLinks} href="/faq">
            FAQ
          </Link>
          <Link className={style.headerLinks} href="/contact">
            CONTACT
          </Link>

          {status === "loading" ? (
            "LOADING"
          ) : session?.user ? (
            <Menu as="div" className={style.DropdownMenuHeader}>
              <Menu.Button className={style.headerLinks}>
                my account
                <BsChevronDown />
              </Menu.Button>
              <Menu.Items className={style.MenuItems}>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    Profile
                  </DropdownLink>
                </Menu.Item>
                {session.user.isAdmin && (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/admin/dashboard"
                    >
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
                    left: "15px",
                    top: "-5px",
                  }}
                >
                  <p style={{ fontSize: "12px", color: "white" }}>
                    {totalCartItems}
                  </p>
                </div>
              ) : null}
            </div>
          </Link>
        </div>
      ) : (
        <HamburgerMenu totalCartItems={totalCartItems} data={data} />
      )}
    </div>
  );
};

export default Header;
