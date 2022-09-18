import Link from "next/link";
import { useRouter } from "next/router";
import React, { SetStateAction } from "react";
import { LoginType } from "../../utils/dataType";
import PlainTextInput from "../common/Inputs/PlainTextInput";
import LogInDesign from "./LogIn.module.scss";

interface LoginProps {
  loginData: LoginType;
  errors: LoginType;
  handleChangeLoginValue: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onsubmit: () => void;
}

const LoginForm: React.FC<LoginProps> = ({
  loginData,
  handleChangeLoginValue,
  errors,
  onsubmit,
}) => {
  const router = useRouter();
  const [passwordDisplay, setPasswordDisplay] = React.useState(false);

  const changePasswordDisplay = (e: React.MouseEvent) => {
    e.preventDefault();
    setPasswordDisplay(!passwordDisplay);
  };

  return (
    <section className={LogInDesign.sectionLogin}>
      <section className={LogInDesign.sectionTitle}>
        <h1 className={LogInDesign.title}>Login</h1>
      </section>
      <div className={LogInDesign.sectionBody}>
        <div className={LogInDesign.loginBlock}>
          <header className={LogInDesign.loginBlockHead}>
            <h3 className={LogInDesign.innerTitle}>
              Kallal Academy Admin Login
            </h3>
          </header>
          <div className={LogInDesign.loginBody}>
            <div className={LogInDesign.loginPart}>
              <div className={LogInDesign.loginCont}>
                <div className={LogInDesign.inputWrap}>
                  <PlainTextInput
                    type="text"
                    name="email"
                    placeholder="E-mail address(ID)"
                    onChange={handleChangeLoginValue}
                    value={loginData.email}
                    error={errors.email}
                  />
                </div>
              </div>
            </div>
            <div className={LogInDesign.loginPart}>
              <div className={LogInDesign.loginCont}>
                <div className={LogInDesign.passwordWrap}>
                  <PlainTextInput
                    type={passwordDisplay ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChangeLoginValue}
                    value={loginData.password}
                    error={errors.password}
                  />
                  <p className={LogInDesign.inputDescription}>
                    <a
                      onClick={(e: React.MouseEvent) =>
                        changePasswordDisplay(e)
                      }
                    >
                      Show Password
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <footer className={LogInDesign.footer}>
            <button onClick={onsubmit} className={LogInDesign.loginButton}>
              Login
            </button>
          </footer>
          <footer className={LogInDesign.footer}>
            <p className={LogInDesign.centerDescription}>
              <Link href="">
                <a href="">Forgot your password?</a>
              </Link>
            </p>
          </footer>
        </div>
        {/* <footer className={LogInDesign.footer}>
          <div>
            <button
              className={LogInDesign.signUpButton}
              onClick={() => {
                router.push(paths.signUp);
              }}
            >
              <span className="txt">
                Click here to register as a new member (free)
              </span>
            </button>
          </div>
        </footer> */}
      </div>
    </section>
  );
};

export default LoginForm;
