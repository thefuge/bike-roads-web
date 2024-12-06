import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import ProtectedRouter from "./HOC/ProtectedRouter";
import MainPage from "./components/pages/MainPage";
import Layout from "./components/Layout";
import useUser from "./components/hooks/useUser";
import ProfilePage from "./components/pages/ProfilePage";
import RouteOneCard from "./components/pages/RouteOneCard";
import NotFoundPage from "./components/pages/NotFoundPage"


function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: '/',
          element: <MainPage user={user} />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
        {
          path: '/route/:id',
          element: <RouteOneCard />,
        },
        {
          element: (
            <ProtectedRouter
              isAllowed={user.status === 'logged'}
              redirect="/account/login"
            />
          ),
          children: [
            {
              path: '/profile',
              element: <ProfilePage user={user} />,
            },
          
          ],
        },
        {
          element: <ProtectedRouter isAllowed={user.status !== 'logged'} redirect="/" />,
          children: [
            

            {
              path: '/account/new',
              element: <SignUpPage signUpHandler={signUpHandler} />,
            },
            {
              path: '/account/login',
              element: <LoginPage signInHandler={signInHandler} />,
            },
           
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App
