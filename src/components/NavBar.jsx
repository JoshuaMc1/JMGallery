import { Navbar, Avatar } from "flowbite-react";
import NavbarLink from "./NavbarLink";
import Brand from "./Brand";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { user } from "../models/userModel";
import { initials } from "../helpers/helpers";

const NavBar = ({ isLogin = false, token }) => {
  const { pathname } = useLocation();
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    const response = await user(token);

    if (response.success) {
      setUserData(response.user);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, []);

  return (
    <header>
      <Navbar fluid={true}>
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Brand logoPath="/logo.svg" name="JMGallery" />
          <Navbar.Toggle />
          <Navbar.Collapse>
            {isLogin && (
              <div className="flex flex-row gap-4 justify-center items-center">
                <NavbarLink to="/" active={pathname === "/"}>
                  Inicio
                </NavbarLink>
                <NavbarLink to="/new-post">Nueva publicación</NavbarLink>
                <NavbarLink to="/favorite-posts">
                  Publicaciones favoritas
                </NavbarLink>
                <NavbarLink to="/my-posts">Mis publicaciones</NavbarLink>
                <NavbarLink to="/logout">Cerrar sesión</NavbarLink>
                <NavbarLink to="/profile">
                  <div className="flex flex-wrap gap-2 justify-center items-center">
                    {userData?.profile?.profile !== null ? (
                      <Avatar img={userData?.profile?.profile} rounded={true} />
                    ) : (
                      <Avatar
                        placeholderInitials={initials(userData?.profile?.name)}
                        rounded={true}
                      />
                    )}
                    {userData?.profile?.name}
                  </div>
                </NavbarLink>
              </div>
            )}
            {!isLogin && (
              <>
                {pathname === "/login" ? (
                  <>
                    <NavbarLink to="/" active={pathname === "/"}>
                      Inicio
                    </NavbarLink>
                    <NavbarLink to="/register">Registrarse</NavbarLink>
                  </>
                ) : (
                  <>
                    <NavbarLink to="/" active={pathname === "/"}>
                      Inicio
                    </NavbarLink>
                    <NavbarLink to="/login">Iniciar sesión</NavbarLink>
                  </>
                )}
              </>
            )}
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default NavBar;
