import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout.js";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { getError } from "../../utils/error.js";
import { useRouter } from "next/router";

export default function Orders() {
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
  return <div className={styles.AdminDashboardContainer}></div>;
}
