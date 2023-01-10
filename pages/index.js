import styles from "../styles/Home.module.css";
import Image from "next/image";
import BANNER from "../public/brandPic/landingBanner.png";
import Link from "next/link";
import brandPic1 from "../public/brandPic/Keychron.png";
import brandPic2 from "../public/brandPic/Varmilo.png";
import brandPic3 from "../public/brandPic/Ducky.png";
import brandPic4 from "../public/brandPic/Yunzii.png";
import promoBanner from "../public/brandPic/promoBanner.png";

const Landing = () => {
  return (
    <>
      <div className={styles.bannerCon}>
        <div style={{ height: "100%", height: "40%" }}>
          <div className={styles.infoBoxCon}>
            <div className={styles.infoBox}>
              <h1 style={{ fontWeight: "inherit" }}>QWERTY</h1>
              <br />
              <p style={{ color: "rgba(255, 255, 255, 0.514)" }}>
                Welcome to our keyboard reseller company! We are dedicated to
                providing our customers with a wide selection of top-quality
                keyboard products at competitive prices. Our team is constantly
                scouring the market to find the best deals on the latest and
                greatest keyboard models. We take pride in our customer service
                and strive to make every shopping experience with us a pleasant
                one.{" "}
              </p>
              <button
                style={{
                  margin: "15px 0px",
                  padding: "10px 40px",
                  fontSize: "10px",
                  backgroundColor: "white",
                  border: "none",
                  color: "black",
                }}
              >
                <Link href="/">LEARN MORE</Link>
              </button>
            </div>
          </div>
          <Image
            style={{ width: "100%", objectFit: "cover" }}
            src={BANNER}
            alt="QWERTY BANNER"
            priority
          ></Image>
        </div>
      </div>
      <div className={styles.contentCon}>
        <h2
          style={{
            borderBottom: "solid 3px #C4C4C4",
            color: "black",
            fontWeight: "lighter",
          }}
        >
          BRANDS
        </h2>
        <br />
        <p style={{ color: "#616161" }}>
          Here are the available brands of our Keyboards
        </p>
        <div className={styles.content}>
          <div className={styles.brandsCon}>
            <div className={styles.brandPicCon}>
              <Image
                src={brandPic1}
                style={{ width: "100%", height: "100%" }}
                alt="brand name"
              />
              <div className={styles.brandInfoBox}>
                <h4>Keychron</h4>
                <p style={{ color: "#B4B4B4" }}>lorem</p>
              </div>
            </div>
            <div className={styles.brandPicCon}>
              <Image
                src={brandPic2}
                style={{ width: "100%", height: "100%" }}
                alt="brand name"
              />
              <div className={styles.brandInfoBox}>
                <h4>Varmilo</h4>
                <p style={{ color: "#B4B4B4" }}>test</p>
              </div>
            </div>
            <div className={styles.brandPicCon}>
              <Image
                src={brandPic3}
                style={{ width: "100%", height: "100%" }}
                alt="brand name"
              />
              <div className={styles.brandInfoBox}>
                <h4>Ducky</h4>
                <p style={{ color: "#B4B4B4" }}>test</p>
              </div>
            </div>
            <div className={styles.brandPicCon}>
              <Image
                src={brandPic4}
                style={{ width: "100%", height: "100%" }}
                alt="brand name"
              />
              <div className={styles.brandInfoBox}>
                <h4>Yunzii</h4>
                <p style={{ color: "#B4B4B4" }}>test</p>
              </div>
            </div>
          </div>
          <div className={styles.promoBanCon}>
            <div className={styles.promoPicCon}>
              <Image
                style={{ width: "100%", height: "100%" }}
                src={promoBanner}
                alt="promo banner"
              />
            </div>
            <div className={styles.promoInfoBox}>
              <h1 style={{ color: "black" }}>New Year deal</h1>
              <br />
              <p style={{ color: "black" }}>
                Limited time offer! Use promocode 'JAN20' at checkout to get 20%
                off your entire order. Offer expires January 31st, so shop now
                and save on your favorite products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
