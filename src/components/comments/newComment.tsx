import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "react-hook-form";
import { useAddComment } from "../../hooks/comments";
import { useAuth } from "../auth/auth";
interface NewCommentProps {
  post: {
    id: string;
  };
}

export default function NewComment({ post }: NewCommentProps) {
  const { id: postID } = post;
  const { user, isLoading: authLoading } = useAuth();
  const {  reset } = useForm();
  const { addComment, isLoading: commentLoading } = useAddComment({
    postID,
    uid: user?.id,
  });
 

  const handleAddComment = async (data: any) => {
    await addComment(data.text);
    reset();
  };

  if (authLoading) return <div>"Loading..."</div>;

  return (
    <div style={{ maxWidth: "600px", padding: "24px" }}>
      <Form onFinish={handleAddComment}   name="comment">
        <Form.Item name="text">
          <Input
            prefix={<UserOutlined />}
            size="large"
            placeholder="Write comment..."
            autoComplete="off"

          />
        </Form.Item>
        <Form.Item name="button" className="float-right">
          <Button
            loading={commentLoading || authLoading}
            type="primary"
            htmlType="submit"
            size="large"
           
          >
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
