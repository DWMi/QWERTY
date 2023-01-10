import style from "./Header.module.css";
import Image from "next/image";
import LOGO from "../../public/QWERTYLOGO.svg";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Abel } from "@next/font/google";
import { useSession } from "next-auth/react";

const fontStyle = Abel({ weight: "400", subnets: ["sans-serif"] });

const Header = () => {
  const { status, data: session } = useSession();
  console.log(status);
  return (
    <div className={style.headerCon}>
      <Image src={LOGO} alt="QWERTY LOGO" />
      <div className={`${style.headerLinksCon} ${fontStyle.className}`}>
        <Link style={{ color: "#979797" }} href="/">
          HOME
        </Link>
        <Link className={style.headerLinks} href="/">
          BRANDS
        </Link>
        <Link className={style.headerLinks} href="/">
          FAQ
        </Link>
        <Link className={style.headerLinks} href="/">
          CONTACT
        </Link>
        <Link
          className={style.headerLinks}
          href={status === "authenticated" ? "/profile" : "/login"}
        >
          {status === "loading"
            ? "LOADING"
            : session?.user
            ? "My account"
            : "LOGIN"}
        </Link>
        <Link className={style.headerLinks} href="/">
          <AiOutlineShoppingCart
            style={{ stroke: "black", strokeWidth: "10", fontSize: "20px" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
