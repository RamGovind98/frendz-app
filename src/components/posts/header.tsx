import React from 'react';
import { Card, Space, Spin, Typography } from 'antd';
import { useUser } from '../../hooks/users';
import { formatDistanceToNow } from "date-fns";
import UsernameButton from '../profile/usernameButton';
import Avatar from "../profile/avatar";

const { Text } = Typography;

const headerStyle = {
  background: 'rgba(0, 0, 0, 0.3) !important', // Black with 30% opacity
  color: 'white', // White font color
};

const buttonStyle = {
  background: '#1890ff', // Primary button color
  borderColor: '#1890ff', // Primary button border color
  color: 'white', // White font color for button
};

interface HeaderProps {
  post: {
    uid: string;
    date: Date;
  };
}

export const Header: React.FC<HeaderProps> = (posts: any) => {

  const { post } = posts;
  const { user, isLoading } = useUser(post.uid);
  
  if (isLoading) return <Spin tip="Loading..." />;

  return (
    <Card style={headerStyle}>
      <Space>
        <Avatar  size={64}  user={user}/>
        <Text className='text-lg'>{user?.username}</Text>
        <div className='flex gap-[550px]'>
          <UsernameButton user={user} />
          <Text type="secondary">
            {formatDistanceToNow(post?.date)} ago
          </Text>
        </div>
      </Space>
      <UsernameButton user={user} style={buttonStyle} />
    </Card>
  );
}
