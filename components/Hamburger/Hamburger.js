import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

const HamburgerMenu = (props) => {
  const data = props.data;
  return (
    <div style={{display:'flex', justifyContent:'flex-start', width:'100%'}}>
        <div className="relative p-2" >
            <Menu
                customBurgerIcon={<HamburgerIcon />}
                width={"auto"}
                className="left-0 top-12"
            >
            <Link style={{ color: "#979797" }} href="/">
                HOME
            </Link>
            <div >
                <div style={{fontStyle:'10px'}}>
                    PRODUCTS:
                </div>
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
            <Link href="/">FAQ</Link>
            <Link href="/">CONTACT</Link>
        </Menu>
        </div>
    </div>
  );
};

const HamburgerIcon = () => (
  <div className="p-1/2" style={{color:'black'}}>
    <svg
      className="w-8 h-8 text-gray-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </div>
);

export default HamburgerMenu;
