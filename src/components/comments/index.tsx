import { Card, Typography, Spin, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../../hooks/post";
import NewComment from "./newComment";
import CommentList from "./commentList";
import { Header } from "../posts/header";
import Actions from "../posts/actions";


const { Text } = Typography;



export default function Comments() {
  const { id } = useParams();
  const { post, isLoading } = usePost(id as string);
  const history=useNavigate()

  if (isLoading) return <Spin size="large" />; // Display a loading spinner

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <div style={{ padding: "8px", width:"50vw", textAlign: "left" }}>
         <Button type="primary" onClick={()=>history('/protected/feed')}>Back</Button>
        <Card
          bordered={true}
          bodyStyle={{ minHeight: "100px" }}
          style={{ borderColor: "gray.100", borderRadius: "8px" }}
        >
          <Header post={post} />
          <div style={{ padding: "8px" }}>
            <Text style={{ wordBreak: "break-word", fontSize: "md" }}>
              {post.text}
            </Text>
          </div>
          <Actions post={post} />
          <CommentList post={post} />
        </Card>
      </div>
      <NewComment post={post} />
    </div>
  );
}
