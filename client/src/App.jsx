import Homepage from "./routes/HomePage/Homepage";
import { Layout, RequireAuth } from "./routes/layout/Layout.jsx";
import ListPage from "./routes/listPage/ListPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./routes/login/Login.jsx";
import SinglePage from "./routes/singlePage/SinglePage.jsx";
import ProfilePage from "./routes/profilePage/ProfilePage.jsx";
import Register from "./routes/register/Register.jsx";
import ProfileUpdatepage from "./routes/profileUpdatePage/ProfileUpdatePage.jsx"
import NewPostPage from "./routes/newPostPage/NewPostPage.jsx"
import { listPageLoader, profilePageLoader, singlePageLoader } from "./routes/lib/loaders.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/List",
          element: <ListPage />,
          loader:listPageLoader,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />, // Protect routes under RequireAuth
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader:profilePageLoader // Profile page is protected
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatepage />, // update Profile page is protected
        },
        {
          path: "/add",
          element: <NewPostPage/>, // new post page is protected
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

//hello test
