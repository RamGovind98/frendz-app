import { Button, Typography, Input, Spin, Empty, Card, Form } from 'antd';
import { useAddPost, usePosts } from '../../../hooks/post';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../auth/auth';
import Actions from '../../posts/actions';
import { Header } from '../../posts/header';


const { Text } = Typography;

interface NewPostFormData {
    text: string;
}

function NewPost() {
    const { register, reset } = useForm<NewPostFormData>();
    const { addPost, isLoading: addingPost } = useAddPost();
    const { user, isLoading: authLoading } = useAuth();

    const handleAddPost = async (data: NewPostFormData) => {
        await addPost({
            uid: user?.id,
            text: data.text,
        } as any);
        reset();
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <Form onFinish={handleAddPost}   name="home">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography.Title level={3}>New Post</Typography.Title>
                    <Spin spinning={authLoading || addingPost} tip="Loading">
                        <Button type="primary" htmlType="submit">
                            Post
                        </Button>
                    </Spin>
                </div>
                <Form.Item name="text" rules={[{ required: true, message: 'Please enter a post text' }]}>
                    <Input.TextArea
                        style={{ marginTop: '10px' }}
                        placeholder="Create a new post..."
                        {...register('text', { required: true })}
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default function Home() {
    const { posts, isLoading } = usePosts();

    if (isLoading) return <Text>Loading posts...</Text>;

    return (
        <>
            <NewPost />
            <div style={{ padding: '20px' }}>
                {posts?.length === 0 ? (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <div style={{ textAlign: 'center', fontSize: 'xl' }} className='mt-2'>
                                No posts yet... Feeling a little lonely here
                            </div>
                        }
                    />
                ) : (
                    posts?.map((post: any) => {
                        return (
                            <Card key={post.id} style={{ padding: '2px', maxWidth: '600px', textAlign: 'left' }}>
                                <div style={{ border: '2px solid #f0f0f0', borderRadius: '4px' }}>
                                    <Header post={post} />
                                    <div style={{ padding: '2px', minHeight: '100px' }}>
                                        <Text style={{ wordBreak: 'break-word', fontSize: '16px' }}>
                                            {post.text}
                                        </Text>
                                    </div>
                                    <Actions post={post} />
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </>
    );
}
