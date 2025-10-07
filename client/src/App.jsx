import HomePage from "./routes/homePage/HomePage";
import ProfileUpdate from "./routes/profileUpdatePage/ProfileUpdate";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ListPage from "./routes/listPage/ListPage";
import  { Layout,RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loader.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader:listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader:singlePageLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader:profilePageLoader,
        },
        {
          path:"/profile/update",
          element:<ProfileUpdate/>,
        },
        {
          path:"/addpost",
          element:<NewPostPage/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
