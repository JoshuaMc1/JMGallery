import { Navbar, Avatar, Dropdown } from "flowbite-react";
import NavbarLink from "./NavbarLink";
import Brand from "./Brand";
import { useLocation } from "react-router-dom";
import { initials } from "../helpers/helpers";

const NavBar2 = ({ isLogin = false, userData }) => {
  const { pathname } = useLocation();

  return (
    <header>
      <Navbar fluid={true}>
        <Brand logoPath="/logo.svg" name="JMGallery" />
        <div className="flex md:order-2 mr-2">
          {isLogin && (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  {userData?.profile?.profile !== null ? (
                    <Avatar img={userData?.profile?.profile} rounded={true} />
                  ) : (
                    <Avatar
                      placeholderInitials={initials(userData?.profile?.name)}
                      rounded={true}
                    />
                  )}
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium">
                  {userData?.profile?.name}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <NavbarLink
                  to="/profile"
                  fs="text-md w-full"
                  active={pathname === "/profile"}
                >
                  Perfil
                </NavbarLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavbarLink
                  to="/favorite-posts"
                  fs="text-md w-full"
                  active={pathname === "/favorite-posts"}
                >
                  Publicaciones favoritas
                </NavbarLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavbarLink
                  to="/my-posts"
                  fs="text-md w-full"
                  active={pathname === "/my-posts"}
                >
                  Mis publicaciones
                </NavbarLink>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <NavbarLink to="/logout" fs="text-md w-full">
                  Cerrar sesión
                </NavbarLink>
              </Dropdown.Item>
            </Dropdown>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {isLogin ? (
            <>
              <NavbarLink to="/" active={pathname === "/"}>
                Inicio
              </NavbarLink>
              <NavbarLink to="/new-post" active={pathname === "/new-post"}>
                Nueva publicación
              </NavbarLink>
            </>
          ) : (
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
      </Navbar>
    </header>
  );
};

export default NavBar2;
