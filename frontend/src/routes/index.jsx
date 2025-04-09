import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Login from "@/components/Login";

const publicRoutes = [
  { path: "/login", component: Login, layout: null },
  // { path: "/signup", component: Signup },
];
const privateRoutes = [
  { path: "/", component: Home },
  { path: "/profile", component: Profile },
];

export { publicRoutes, privateRoutes };
