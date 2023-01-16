import Head from "next/head";
import { Inter } from "@next/font/google";
import Link from "next/link";
import db from "../../utils/db";
import { useRouter } from "next/router";
import s from "../../styles/Category.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Image from "next/image";
import BANNER from "../../public/brandPic/landingBanner.png";
import Product from "../../models/Product";

const inter = Inter({ subsets: ["latin"] });

export default function CategoryPage({ products }) {

  const router = useRouter();
  console.log(products);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={s.centerContainer}>
        <div className={s.bannerContainer}>
          <Image src={BANNER} style={{ height: "100%", objectFit: "cover" }} />
          <div className={s.bannerText}>
            <h1 className={s.headerText}>{router.query.categoryName}</h1>
            <p>
              Welcome to our keyboard reseller company! We are dedicated to
              providing our
              <br />
              customers with a wide selection of top-quality keyboard products
              at competitive prices
            </p>
          </div>
        </div>
        <div className={s.container}>
          {products &&
            products.map((prod) => {
              return <ProductCard prod={prod} />;
            })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const categoryName = context.query.categoryName;

  await db.connect();
  const products = await Product.find({ category: categoryName }).lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
