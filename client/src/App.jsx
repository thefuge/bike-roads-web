import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import ProtectedRouter from "./HOC/ProtectedRouter";
import HelloPage from "./components/pages/HelloPage";
import Layout from "./components/Layout";
import useUser from "./components/hooks/useUser";
import AddPostCard from "./components/ui/AddPostCard";
import OneRouteP from "./components/pages/OneRouteP";

function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: '/',
          element: <HelloPage user={user} />,
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
              path: '/posts/new',
              element: <AddPostCard />,
            },
            {
              path: '/reviews',
              element: <OneRouteP />,
            }
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
