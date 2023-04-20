import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import ForgotPassword, { action as forgotAction } from "./pages/ForgotPassword";
import ChangePassword, {
  action as changeAction,
  loader as changeLoader,
} from "./pages/ChangePassword";
import { useEffect, useState } from "react";
import { logout, user } from "./models/userModel";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";
import NewPost, {
  action as newPostAction,
  loader as newPostLoader,
} from "./pages/profile/NewPost";
import Profile, { action as profileAction } from "./pages/profile/Profile";
import FavoritePosts from "./pages/profile/FavoritePosts";
import MyPosts, {
  loader as myPostsLoader,
  action as myPostsAction,
} from "./pages/profile/MyPosts";
import useGetToken from "./hooks/useGetToken";

const App = () => {
  const [token, setToken] = useState(useGetToken());

  const [userData, setUserData] = useState(null);
  const [load, setLoad] = useState(true);
  const [verified, setVerified] = useState(1);

  const addToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem(
      import.meta.env.VITE_TOKEN_NAME,
      JSON.stringify(newToken)
    );
  };

  const handleUnauthorized = () => {
    localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, null);
    setToken(null);
    window.location = "/login";
    console.clear();
  };

  useEffect(() => {
    if (load) {
      handleLoadDataUser();
      setLoad(false);
    }
  }, [load]);

  const handleLoadDataUser = async () => {
    if (!!token) {
      const response = await user(token);

      if (response.success) {
        setUserData(response.user);
        setVerified(response.user.verified);
      } else {
        handleUnauthorized();
      }
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
          addToken={addToken}
          token={token}
          userData={userData}
          setLoad={setLoad}
          verified={verified}
        />
      ),
      children: [
        {
          index: true,
          element: <GalleryPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/login",
          element: (
            <RedirectIfLoggedIn isLoggedIn={!!token}>
              <Login />
            </RedirectIfLoggedIn>
          ),
          errorElement: <ErrorPage />,
          action: loginAction,
        },
        {
          path: "/register",
          element: (
            <RedirectIfLoggedIn isLoggedIn={!!token}>
              <Register />
            </RedirectIfLoggedIn>
          ),
          errorElement: <ErrorPage />,
          action: registerAction,
        },
        {
          path: "/forgot",
          element: (
            <RedirectIfLoggedIn isLoggedIn={!!token}>
              <ForgotPassword />
            </RedirectIfLoggedIn>
          ),
          errorElement: <ErrorPage />,
          action: forgotAction,
        },
        {
          path: "/change/:token",
          element: (
            <RedirectIfLoggedIn isLoggedIn={!!token}>
              <ChangePassword />
            </RedirectIfLoggedIn>
          ),
          errorElement: <ErrorPage />,
          action: changeAction,
          loader: changeLoader,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute
              isAllowed={!!token}
              redirectTo="/login"
              unauthorized={handleUnauthorized}
            >
              <Profile />
            </ProtectedRoute>
          ),
          action: profileAction,
          errorElement: <ErrorPage />,
        },
        {
          path: "/new-post/:slug?",
          element: (
            <ProtectedRoute
              isAllowed={!!token}
              redirectTo="/login"
              unauthorized={handleUnauthorized}
            >
              <NewPost />
            </ProtectedRoute>
          ),
          errorElement: <ErrorPage />,
          action: newPostAction,
          loader: newPostLoader,
        },
        {
          path: "/favorite-posts",
          element: (
            <ProtectedRoute
              isAllowed={!!token}
              redirectTo="/login"
              unauthorized={handleUnauthorized}
            >
              <FavoritePosts />
            </ProtectedRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/my-posts",
          element: (
            <ProtectedRoute
              isAllowed={!!token}
              redirectTo="/login"
              unauthorized={handleUnauthorized}
            >
              <MyPosts />
            </ProtectedRoute>
          ),
          loader: myPostsLoader,
          action: myPostsAction,
          errorElement: <ErrorPage />,
        },
        {
          path: "/logout",
          loader: async () => {
            const response = await logout(token);

            if (response.success) {
              localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, null);
              setToken(null);

              return redirect("/login");
            }

            return redirect("/login");
          },
          errorElement: <ErrorPage />,
        },
        {
          path: "*",
          errorElement: <h1>Error 404</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
