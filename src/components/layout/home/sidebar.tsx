import React from "react";
import { Button, Card, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { PROTECTED, USERS } from "../../../routes/route";
import { useAuth } from "../../auth/auth";
import Avatar from "../../profile/avatar";


const { Text } = Typography;

function ActiveUser() {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div>"Loading..."</div>

    return (
        <Space direction="vertical" align="center" style={{ marginTop: "50px" }}>
            {user ? (
                <>
                    <Avatar user={user} size={64}/> 
                    {/* Pass the user prop here */}
                    <Text className="text-white text-lg">@{user.username}</Text>
                    <Link to={`${PROTECTED}/profile/${user.id}`}>
                        <Button  style={{ width: "100%" }}>
                            Edit Profile
                        </Button>
                    </Link>
                </>
            ) : (
                <Text>No user found</Text>
            )}
        </Space>
    );
}

export default function Sidebar() {
    return (
        <Card
            style={{
                padding: '20px',
                height: '100vh',
                width: '100%',
                borderLeftColor: 'teal.100',
                position: 'sticky',
                top: '16px',
                display: "flex",
                justifyContent:"space-between",
                backgroundColor:'#1d314f',
                boxShadow:'3px 5px grey',

            }}
            className="p-2"
        >
            <ActiveUser />
            <div style={{ textAlign: 'center' }}>
                <div style={{ borderBottom: '2px solid', borderColor: 'teal.200',} }className="p-2" />
                <Link to={USERS} style={{ marginTop: '1rem', display: 'inline-block'  }} className="p-2">
                    <Button type="default"  size="small">
                        ALL USERS
                    </Button>
                </Link>
            </div>
        </Card>
    );
}
