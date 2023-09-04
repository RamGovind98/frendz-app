import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { PROTECTED } from '../../routes/route';


export default function UsernameButton(user: any) {
  return (
    <Link to={`${PROTECTED}/profile/${user.id}`}>
      <Button type="link" style={{ color: '#1890ff' }}>
        {user.username}
      </Button>
    </Link>
  );
}
