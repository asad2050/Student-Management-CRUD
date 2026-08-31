import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import LoginPage from "./components/LoginPage.jsx";
import StudentsPage from "./components/StudentsPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "students",
        element: (
          <ProtectedRoute>
            <StudentsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter}></RouterProvider>
);
