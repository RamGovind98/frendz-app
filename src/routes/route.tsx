import { Layout } from "antd";
import Login from "../components/auth/login/login";
import Register from "../components/auth/register/register";
import Comments from "../components/comments";
import Feed from "../components/feed/feed";
import Profile from "../components/profile/profile";
import Users from "../components/users";


export const ROOT = " ";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const FEED = "/protected/feed";
export const USERS = "/protected/users";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";

const routes: any[] = [
    {
        path: ROOT,
        component: Login,
    },
    
    {
        path: LOGIN,
        component: Login,
    },
    {
        path: REGISTER,
        component: Register,
    },
    {
        path: PROTECTED,
        component: Layout,
        routes: [
            {
                path: FEED,
                component: Feed,
            },
            {
                path: USERS,
                component: Users,
            },
            {
                path: PROFILE,
                component: Profile,
            },
            {
                path: COMMENTS,
                component: Comments,
            },
        ],
    },
];

export default routes;
