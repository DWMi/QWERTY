import style from "./Header.module.css";
import Image from "next/image";
import LOGO from "../../public/QWERTYLOGO.svg";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Abel } from "@next/font/google";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import { BsChevronDown } from "react-icons/bs";

const fontStyle = Abel({ weight: "400", subnets: ["sans-serif"] });

const Header = () => {
  const { data, error } = useSWR("/api/categories/get-all-categories", fetcher);

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
                    <Link
                      href={`/category/${cat.name}`}
                      key={cat._id}
                    >
                      <h3>{cat.name}</h3>
                    </Link>
                    {cat.brands &&
                      cat.brands.map((brand) => (
                        <Link href={`/${brand.brandName}`}>
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
          MY ORDERS
        </Link>
        <Link className={style.headerLinks} href="/">
          CONTACT
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
