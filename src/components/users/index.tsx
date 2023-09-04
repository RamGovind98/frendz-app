import { Row, Col, Skeleton, Card, Space } from "antd";
import { useUsers } from "../../hooks/users";
import User from "./user";
import { useAuth } from "../auth/auth";


export default function Users() {
  const { users, isLoading } = useUsers();
  const { user } = useAuth();
  const currentUser = user;
  if (isLoading) return <Skeleton active />; // Display a loading skeleton

  return (
    <Row className="flex flex-col" justify="space-between">
      {users?.length===0?<Card className='mt-2'>
          <Space>No posts yet... Feeling a little lonely here.</Space>
        </Card>:null}
      {users?.map((user: any) => (
        <Col key={user?.id} xs={24} sm={12} md={8} lg={12} xl={10}>
          {currentUser.id!==user.id?
          <User user={user} currentUser={currentUser} /> :''}
          
        </Col>
      ))}
    
    </Row>
  );
}
