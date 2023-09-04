
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Space, Upload, Spin } from "antd";
import { useAuth } from "../auth/auth";
import { useUpdateAvatar } from "../../hooks/users";
import Avatar from "./avatar";

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileProps) {
  const { user, isLoading: authLoading } = useAuth();
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.id as string);

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
    }
  };

  if (authLoading) return <Spin size="large" />; 

  return (
    <Modal
      title="Edit Profile"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Space direction="vertical" align="center">
        <Avatar user={user} overrideAvatar={fileURL} />
        <Form onFinish={updateAvatar}   name="profile">
          <Form.Item  name="" label="Change Avatar">
            <Upload
              customRequest={() => { }}
              onChange={handleChange}
              showUploadList={false}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="button">
            <Button
              type="primary"
              htmlType="submit"
              loading={fileLoading}
              block
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
}
