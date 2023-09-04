
import { Card, Button, Typography, Space, Popconfirm, message } from "antd";
import { formatDistanceToNow } from "date-fns";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteComment } from "../../hooks/comments";
import { useUser } from "../../hooks/users";
import { useAuth } from "../auth/auth";

import Avatar from "../profile/avatar";


const { Text } = Typography;

interface CommentProps {
  comment: CommentType; // Define the type of your "comment" prop here
}

interface CommentType {
  id: string;
  text: string;
  uid: string;
  date: Date;
}

export function Comment({ comment }: CommentProps) {
  const { text, uid, date, id } = comment;
  const { user, isLoading: userLoading } = useUser(uid);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { deleteComment } = useDeleteComment(id);



  const handleDeleteComment = () => {
    deleteComment()
      .then(() => {
        message.success("Comment deleted successfully.");
      })
      .catch((error) => {
        message.error("Error deleting comment: " + error.message);
      });
  };

  if (userLoading || authLoading) return null; // Return null when loading

  return (
    <Card >
      <Space align="start" size={8}>

        <Avatar user={user} size="small" />
        <div style={{ flex: 1, marginLeft: "4px" }}>
          <div>
            <div>
              <div className="p-2 border-r-4 border-indigo-500">
                <Text  >{user?.username}</Text>
              </div>


            </div>
            {!authLoading && authUser.id === uid && (
              <Popconfirm
                title="Are you sure to delete this comment?"
                onConfirm={handleDeleteComment}
                okText="Yes"
                cancelText="No"
              > <Text className="p-2">{text}</Text>
                <Button
                  size="small"
                  icon={<DeleteOutlined />}
                  type="text"
                  danger
                />
              </Popconfirm>
            )}
          </div>
          <div style={{ paddingTop: "2px", fontSize: "sm" }}>
            <Text style={{ fontSize: "xs", color: "gray" }}>
              {formatDistanceToNow(date)} ago
            </Text>
          </div>
        </div>
      </Space>
    </Card>
  );
}
