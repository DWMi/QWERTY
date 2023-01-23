import { Html, Head, Main, NextScript } from "next/document";
import { Abel } from "@next/font/google";

const fontStyle = Abel({ weight: "400", subnets: ["sans-serif"] });

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
