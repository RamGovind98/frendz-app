import React from 'react';
import {
  CommentOutlined,
  DeleteOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useComments } from '../../hooks/comments';
import { useDeletePost, useToggleLike } from '../../hooks/post';
import { PROTECTED } from '../../routes/route';
import { useAuth } from '../auth/auth';

const { Text } = Typography;

interface ActionsProps {
  post: {
    id: string;
    likes: string[];
    uid: string;
  };
}

const Actions: React.FC<ActionsProps> = ({ post }) => { 
  const { id, likes, uid } = post;
  const { user, isLoading: userLoading } = useAuth();

  const isLiked = likes.includes(user?.id as string);
  const config = {
    id,
    isLiked,
    uid: user?.id,
  };

  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments, isLoading: commentsLoading } = useComments(id);

  return (
    <Space style={{ padding: '8px' }} className='ml-[5rem]' >
      <Space align="center" >
        <Button
          onClick={toggleLike}
          loading={likeLoading || userLoading}
          icon={isLiked ? <HeartFilled width={"20px"} /> : <HeartOutlined />}
          shape="circle"
          style={{width:"50px",height:"50px"}}
        
        />
        <Text>{likes.length}</Text>
      </Space>

      <Space align="center">
        <Link to={`${PROTECTED}/comments/${id}`}>
          <Button
            loading={commentsLoading}
            style={{width:"50px",height:"50px"}}
            icon={
              comments?.length === 0 ? (
                <CommentOutlined />
              ) : (
                <CommentOutlined />
              )
            }
            shape="circle"
          />
        </Link>
        <Text>{comments?.length}</Text>
      </Space>

      {!userLoading && user?.id === uid && (
        <Tooltip title="Delete">
          <Button
            onClick={deletePost}
            loading={deleteLoading}
            icon={<DeleteOutlined />}
            shape="circle"
          />
        </Tooltip>
      )}
    </Space>
  );
};

export default Actions;
