import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/categories");
  }, [router]);

  return <div></div>;
};

export default Admin;
