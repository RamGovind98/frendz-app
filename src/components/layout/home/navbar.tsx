import { Button, Layout, Menu, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { FEED } from "../../../routes/route";
import { useLogout } from "../../auth/auth";
import logo from '../../../assets/Frendz.jpg'

const { Header } = Layout;

export default function Navbar() {
    const { logout, isLoading } = useLogout();
    const history = useNavigate();
    const handleNavigate=()=>{
        history(FEED)
    }
    const handleLogout = async () => {
        try {
            await logout();
            history('/login'); // Redirect to the dashboard after logout
            localStorage.clear()
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const menuItems = [
        {
            key: '0',
            label: (
                <div style={{height:"0px",width:'100px',padding:"5px"}} >
<img alt="logo"  src={logo} height={50} width={50}     style={{borderRadius: '25px'}} ></img>
                </div>
                
            ),
            to: FEED,
            fontWeight: 'bold',
            
            
        },
    
        {
            key: '3',
            label: (

                <Button
                    type="text"
                    style={{ marginLeft: 'auto', marginRight: '16px' }}
                    onClick={handleNavigate}
                    loading={isLoading}
                >
                    Home
                </Button>
            ),
            to: FEED,
            fontWeight: 'bold',
            
            
        },
       
        {
            key: '4',
            label: (
                <Button
                    type="text"
                    style={{ marginLeft: 'auto', marginRight: '16px' ,}}
                    onClick={handleLogout}
                    loading={isLoading}

                >
                    Logout
                </Button>
            ),
        },
    ];

    return (
        <Space  direction="vertical">
             <Header
            style={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                position: "fixed",
                width: "100%",
                zIndex: 1,
                backgroundColor: "white",

            }}
        >
            
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={menuItems} // Use the array of Menu.Item elements
                // style={{display:'flex',justifyContent:'end',}}
            />
        </Header>
        </Space>
       
    );
}
