import Head from "next/head";
import React, { useState } from "react";
import LoginForm from "../src/Components/LogIn";
import { LoginType } from "../src/utils/dataType";
import { emailRegex, initialLoginData } from "../src/utils/initialData";
import AdminLayout from "./layout";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginType>(initialLoginData);
  const [errors, setErrors] = useState<LoginType>(initialLoginData);

  const handleChangeLoginValue = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onsubmit = () => {
    if (!loginData?.email?.match(emailRegex)) {
      setErrors({
        ...errors,
        email: "does not match",
      });
    }
    if (!loginData.password) {
      setErrors({
        ...errors,
        password: "required",
      });
    } else {
      console.log("loginData", loginData);
    }
  };
  return (
    <AdminLayout login>
      <Head>
        <title>Kallal Academy | This is Login page</title>
      </Head>
      <main id="contents">
        <>
          <LoginForm
            loginData={loginData}
            handleChangeLoginValue={handleChangeLoginValue}
            errors={errors}
            onsubmit={onsubmit}
          />
        </>
      </main>
    </AdminLayout>
  );
};

export default LoginPage;
