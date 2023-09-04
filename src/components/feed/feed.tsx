import  { useState } from 'react';
import { Button, Card, Form, Image, Input, Space, Typography, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import {   useAddPost, usePosts } from '../../hooks/post';
import { useAuth } from '../auth/auth';
import PostsList from '../posts/postsList';
import './feed.css'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../auth/firebase';


const { Title, Text } = Typography;

function NewPost() {
    const { handleSubmit, control, reset, watch, formState: { errors } } = useForm();
    const { addPost, isLoading: addingPost } = useAddPost();
    const { user, isLoading: authLoading } = useAuth();
    const [image, setImage] = useState<any | null>('')
    const [imageUrl, setImageUrl] = useState<any | null>('')

 
//    / const [imageURL, setImageUrl] = useState<any | null>(null)

    const onImageChange = (event:any) => {
        // console.log(event.target.files)
 if (event.target.files && event.target.files[0]) {
    setImageUrl(event.target.files[0])
    //handleUpload(,)
 setImage(URL.createObjectURL(event.target.files[0]))
    
 }
}
function handleUpload(file:any) {
    if (file) {
        const storageRef = ref(storage, `images/${file}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
         uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    // switch (snapshot.state) {
    //   case 'paused':
    //     console.log('Upload is paused');
    //     break;
    //   case 'running':
    //     console.log('Upload is running');
    //     break;
    // }
    
    reset();
    setImage('')
    setImageUrl('')
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //   console.log('File available at', downloadURL);
      addPost({
        uid: user?.id || '',
        text: watchedText ,
        image:downloadURL
    } as any);
  
    reset();
    setImage('')
    setImageUrl('')
    });
    
    reset();
    setImage('')
    setImageUrl('')
  }
  
);
    }}
    const watchedText = watch('text');
    const onSubmit = () => {
       
            if(imageUrl && watchedText){
                handleUpload(imageUrl)
                reset();
                setImage('')
                setImageUrl('')
               
           
        }
        else if(watchedText){
            addPost({
                uid: user?.id || '',
                text: watchedText ,
                image:''
            } as any);
            reset();
            setImage('')
            setImageUrl('')

        }
        else{
            message.warning('Please add Post Content');
        }
        
        reset();
        setImage('')
        setImageUrl('')

    };

    return (
        <Card className='w-100'>
            <Form onFinish={handleSubmit(onSubmit)}>
                <Title level={3}>What's On Your mind....</Title>
                <Form.Item
                    name="text"
                    validateStatus={errors.text ? 'error' : ''}
                >
                    <Controller
                        name="text"
                        control={control}
                        render={({ field }) => (
                            <Input.TextArea 
                                {...field}
                                className="placeholder-gray-600 border-slate-600"
                                placeholder="Create a new post..."
                                autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                        )}
                    />
                    {image? <Image height={150} width={150} alt="preview image" src={image}/>:''}
                    
                </Form.Item>
                <Space>
                <Button type="primary" htmlType="submit" loading={authLoading || addingPost}>
                    Add Post
                </Button>
                <Input type='file'   onChange={onImageChange}></Input> 
                </Space>
               
            </Form>
        </Card>
    );
}

const Feed = () => {
    const { posts, isLoading } = usePosts();

    if (isLoading) return <Text>Loading posts...</Text>;

    if (!posts) {
        return <Text>No posts available.</Text>;
    }
    const mappedPosts = posts.map((post) => ({
        id: post.id,
        text: post.text,
        uid: post.uid,
        date: post.date,
        likes: post.likes,
        followedUsers:post.followedUsers,
        image:post.image
    }));

    return (
        <>
            <NewPost />
            <PostsList posts={mappedPosts} />
        </>
    );
};

export default Feed;
