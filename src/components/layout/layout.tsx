import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import { LOGIN } from "../../routes/route";
import { useAuth } from "../auth/auth";
import Navbar from "./home/navbar";
import Sidebar from "./home/sidebar";

const {  Content, Sider } = AntLayout;

export default function Layout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && pathname.startsWith("/") && !user) {
            navigate(LOGIN);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, user, isLoading]);

    if (isLoading) return <div>Loading auth user...</div>;

    return (

        <AntLayout style={{backgroundColor:'#ccd4e0'}}>
            
<Navbar></Navbar>

          
            <Sider>
                <Sidebar></Sidebar>
                
            </Sider>
            <Content className="m-[120px]" >
                <Outlet></Outlet>
                
            </Content>

        </AntLayout>
    );
}
