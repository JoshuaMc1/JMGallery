import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar2 from "./NavBar.v2";
import AccountVerified from "./AccountVerified";

const Layout = ({ addToken, token, userData, setLoad, verified }) => {
  return (
    <>
      <NavBar2 isLogin={!!token} userData={userData} />
      <main className="container h-full my-6 ">
        <AccountVerified
          isLogged={!!token}
          verified={verified}
          email={userData?.email}
        />
        <Outlet
          context={{
            addToken,
            userData,
            setLoad,
          }}
        />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
