// Post.tsx (Class Component)
import React, {  useEffect, useState } from 'react';
import { Card, Image, Typography } from 'antd';
import { Header } from './header';
import Actions from './actions';


const { Text } = Typography;

interface PostType {
  id: string;
  uid: string;
  date: Date;
  likes: string[];
  text: string;
  followedUsers:string[]
  image:any
}

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { uid } = post;
  const mentionRegex = /@(\w+)/g;


  const [processedText, setProcessedText] = useState<string>(post.text);

  useEffect(() => {
    // Replace mentions with links
    const updatedText = post.text.replace(mentionRegex, (match, username) => (
      `<a>${match}</a>`
    ));
    setProcessedText(updatedText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.text]);

  return (
    <Card style={{ padding: '2px', width: '100%', textAlign: 'left',marginTop:"10px" }}>
      <div>

        {uid ? <Header post={post} /> : null}
        <div style={{ padding: '10px', minHeight: '100px' ,}} className='ml-[5rem]'>
          
          <Text style={{ wordBreak: 'break-word', fontSize: 'md' }}>
            <div dangerouslySetInnerHTML={{ __html: processedText }} />
          </Text>
          <br />
          {post.image?<Image height={400} width={400} alt="preview image" src={post.image} />:''}
          
        </div>
        <Actions post={post}  />
      </div>
    </Card>
  );
};

export default Post;
