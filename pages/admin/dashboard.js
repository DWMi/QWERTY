import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout.js";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getError } from "../../utils/error.js";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session?.user);
  console.log(router);
  useEffect(() => {
    if (!session?.user.isAdmin) {
      router.push("/");
      //make unauthorized page later
    }
  }, []);
  return (
    <div className={styles.AdminDashboardContainer}>
      <h1>ADMIN PAGE</h1>
      <br></br>
      <div className={styles.AdminDashboardBackToSiteContainer}>
        <Link href={"/"}>
          <h1>Back to the website</h1>
        </Link>
      </div>
      <div className={styles.AdminDashboardCategoriesContainer}>
        <div className={styles.AdminDashboardCategory}>
          <Link href={"/admin/orders"}>
            <h1>Orders</h1>
          </Link>
        </div>
        <div className={styles.AdminDashboardCategory}>
          <Link href={"/admin/products"}>
            <h1>Products</h1>
          </Link>
        </div>
        <div className={styles.AdminDashboardCategory}>
          <Link href={"/admin/users"}>
            <h1>Users</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
