import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MyWatchlistsPage from "./pages/MyWatchlistsPage";
import LogoutPage from "./pages/LogoutPage";
import WatchlistPage from "./pages/WatchlistPage";
import ExplorePage from "./pages/ExplorePage";
import OthersWatchlist from "./pages/OthersWatchlists";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about/",
        element: <AboutPage />,
      },
      {
        path: "signup/",
        element: <SignupPage />,
      },
      {
        path: "login/",
        element: <LoginPage />,
      },
      {
        path: "mywatchlists/",
        element: <MyWatchlistsPage />,
      },
      {
        path: "logout/",
        element: <LogoutPage />,
      },
      {
        path: "watchlist/:id",
        element: <WatchlistPage />,
      },
      {
        path: "explore/",
        element: <ExplorePage/>,
      },
      {
        path: "explorewatchlists/",
        element: <OthersWatchlist/>,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
