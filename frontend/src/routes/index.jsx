import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import FullWidthLayout from "@/layouts/FullWidthLayout";

const publicRoutes = [
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Signup, layout: null },
];
const privateRoutes = [
  { path: "/", component: Home },
  { path: "/profile", component: Profile, layout: FullWidthLayout },
];

export { publicRoutes, privateRoutes };
