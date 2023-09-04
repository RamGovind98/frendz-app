// PostsList.tsx (Class Component)
import React, { useState, useEffect } from 'react';
import { Card, Space, Typography } from 'antd';
import Post from './post';
import { useAuth } from '../auth/auth';


interface PostType {
  id: string;
  uid: string;
  date: Date;
  likes: string[];
  text: string;
  followedUsers: string[];
  image: any;
}

interface PostsListProps {
  posts: PostType[];
}

const { Text } = Typography;

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  // console.log(user)
  // console.log(posts)
  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  if (isLoading) {
    return (
      <Text style={{ fontSize: 'xl' }}>
        <Card className='mt-2'>
          <Space>No posts yet... Feeling a little lonely here.</Space>
        </Card>
      </Text>
    );
  }

  if (!posts || !posts.length) {
    return (
      <Text style={{ fontSize: 'xl' }}>
        <Card className='mt-4'>
          <Space>No posts yet... Feeling a little lonely here</Space>
        </Card>
      </Text>
    );
  }

  return (
    <div style={{ padding: '3px', textAlign: 'center', width: '100%' }}>
      {posts
        .filter((element1) =>
          user?.followedUsers?.some((element2: any) => element1.uid === element2 || element1.uid === user.id)
        )
        .map((filteredPost) => (
          <Post key={filteredPost.id} post={filteredPost} />
        ))}
    </div>
  );
};

export default PostsList;