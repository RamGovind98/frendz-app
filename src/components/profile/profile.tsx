import { Card, Divider, Image, Space, Typography } from "antd";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../hooks/post";
import { useUser } from "../../hooks/users";

import Avatar from "./avatar";
import Actions from "../posts/actions";
import { Header } from "../posts/header";
import EditProfile from "./editProfile";


const { Text } = Typography;

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    const { posts, isLoading: postsLoading } = usePosts(id);
    const { user, isLoading: userLoading } = useUser(id as string);
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [user]);

    if (userLoading) return <Text>Loading...</Text>;

    return (
        <Space direction="vertical" size={16}>
            <Card>
            <Space align="center">
                <Avatar size="default" user={user} />

                <Space direction="vertical">
                    
                    <Text style={{ fontSize: "2xl" }}>{user.username}</Text>
                    <Space>
                        <Text style={{ color: "gray" }}>Posts: {posts?.length}</Text>
                        <Text style={{ color: "gray" }}>
                            Joined: {format(new Date(user.date), "MMMM yyyy")}
                        </Text>
                    </Space>
                </Space>

                <EditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </Space>
            </Card>
            <Divider />

            {postsLoading ? (
                <Text>Posts are loading...</Text>
            ) : (
                <div style={{ padding: "0 16px", textAlign: "center"}} className="mt-4">
                    {posts?.length === 0 ? (
                        <Card> 
<Text style={{ fontSize: "xl" }}>
                            No posts yet... Feeling a little lonely here.
                        </Text>
                        </Card>
                        
                    ) : (
                        posts?.map((post: any) => {
                            return (
                                <div style={{ padding: "8px", width: "100%", textAlign: "left" }}>
                                    <Card
                                        bordered={true}
                                        bodyStyle={{ minHeight: "100px" }}
                                        style={{ borderColor: "gray.100", borderRadius: "8px" }}
                                    >
                                        <Header post={post} />
                                        <div  className='ml-[5rem]'>
                                            <Text style={{ wordBreak: "break-word", fontSize: "md" }}>
                                                {post.text}
                                            </Text>
                                        <br/>
                                            {post.image?<Image height={400} width={400} alt="preview image" src={post.image} />:''}
                                        </div>
                                        <Actions post={post} />
                                    </Card>
                                </div>
                            )
                        })
                    )}
                </div>
            )}
        </Space>
    );
}
