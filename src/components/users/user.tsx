import  { useState, useEffect } from "react";
import { Card, Button, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../routes/route";
import Avatar from "../profile/avatar";


import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../auth/firebase";

const { Text } = Typography;

interface UserProps {
  user: { id: string; username: string; avatar: string; };
  currentUser: any
}

export default function User1({ user, currentUser }: UserProps) {
  const { id, username } = user;
  const [isFollowing, setIsFollowing] = useState(false);

  // Function to check if the current user is already following this user
  const checkIfFollowing = async () => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.id);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const followedUsers = userData.followedUsers || [];
        setIsFollowing(followedUsers.includes(id));
      }
    }
  };

  useEffect(() => {
    checkIfFollowing();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, id]);

  const followUser = async () => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.id);
      await updateDoc(userDocRef, {
        followedUsers: arrayUnion(id),
      });
      setIsFollowing(true);
    }
  };

  const unfollowUser = async () => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.id);
      await updateDoc(userDocRef, {
        followedUsers: arrayRemove(id),
      });
      setIsFollowing(false);
    }
  };

  return (
    <Card
      style={{
        background: "gray.100",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
        textAlign: "center",
        marginBottom: "16px",
        display:'flex',
        justifyContent:'space-between',
      }}
    >
      <Avatar user={user} />
      <Text code>@{username}</Text>
      <Space>
      <Link to={`${PROTECTED}/profile/${id}`}>
        <Button type="link" size="small" style={{ color: "teal" }}>
          View Profile
        </Button>
      </Link>
      {!isFollowing ? (
        <Button
          type="primary"
          size="small"
          style={{ color: "white" }}
          onClick={followUser}
        >
          Follow
        </Button>
      ) : (
        <Button
          type="primary"
          size="small"
          style={{ color: "white" }}
          onClick={unfollowUser}
        >
          Unfollow
        </Button>
      )}
      </Space>
     
    </Card>
  );
}
