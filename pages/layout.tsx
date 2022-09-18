import React, { ReactNode, useContext } from "react";
import { useRouter } from "next/router";
import styles from "../src/Style/subroute.module.scss";
import Link from "next/link";
import AdminMenu from "../src/Components/AdminMenu/AdminMenu";

interface Props {
  login?: boolean
  children?: ReactNode | ReactNode[] 
}

const AdminLayout: React.FC<Props> = ({
  login,
  children,
}) => {
  const router = useRouter();

  return (
    <div>
      <div className={styles.container}>
        <Link href="/">
          <a>
            <img
              src="/images/common/logo.svg"
              alt="logo"
              className={styles.logo}
            />
          </a>
        </Link>
        <button
          style={{
            background: "none",
            marginLeft: "auto",
            paddingRight: "25px",
            fontSize: '18px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => router.push('/login')}
        >
          Logout
        </button>
      </div>
      <div className={styles.layout}>
        {!login && <AdminMenu />}
        <div className={styles.menuContents}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
