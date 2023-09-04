import { List, Skeleton } from "antd";
import { useComments } from "../../hooks/comments";
import { Comment } from "./comment";

interface CommentListProps {
  post: { id: string };
}

export default function CommentList({ post }: CommentListProps) {
  const { id } = post;
  const { comments, isLoading } = useComments(id);

  return (
    <>
      {isLoading ? (
        <Skeleton active /> // Display a loading skeleton
      ) : (
        <List
          dataSource={comments}
          renderItem={(comment: any) => (
            <List.Item>
              <Comment comment={comment} />
            </List.Item>
          )}
        />
      )}
    </>
  );
}
