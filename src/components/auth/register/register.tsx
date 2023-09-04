import { Form, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useRegister } from '../auth';
import {  LOGIN } from '../../../routes/route';
import { ValidationObject, emailValidate, passwordValidate, usernameValidate } from '../../../utils/form-validate';
import styled from 'styled-components';
import backgroundImage from '../../../assets/yellow-light-background-hd.jpg'

const { Title, Text } = Typography;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`;

const RegisterContent = styled.div`
  max-width: 450px;
  width: 100%;
  height:40vh;
  background-color: #fff;
  padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 6px grey;
  
`;

const RegisterTitle = styled(Title)`
  text-align: center;
  margin-bottom: 1rem;
`;

const RegisterFormItem = styled(Form.Item)`
  &.register-form-item {
    margin-bottom: 1rem;
  }
`;

const RegisterButton = styled(Button)`
  width: 100%;
`;

const RegisterLoginText = styled(Text)`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
`;

const RegisterLoginLink = styled(Link)`
  color: #1890ff;
  text-decoration: underline;
`;

const RegisterLoginLinkText = styled.span`
  color: #1890ff;
  text-decoration: underline;
`;

interface FormData {
    username: string;
    email: string;
    password: string;
    avatar:string;
    followedUsers:string[]
}


export default function Register() {
    const { register: signup, isLoading } = useRegister();

    const onFinish = async (data: FormData) => {
        signup({
            username: data.username,
            email: data.email,
            password: data.password,
            avatar:'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
            followedUsers:[''],
            redirectTo: LOGIN,
        });
    };

    return (
        <RegisterContainer>
            <RegisterContent>
                <RegisterTitle level={3}>Register</RegisterTitle>

                <Form
                    onFinish={onFinish}
                    initialValues={{ username: '', email: '', password: '' }}
                >
                    <RegisterFormItem
                        label="Username"
                        name="username"
                        rules={usernameValidate.map((rule: ValidationObject) => ({
                            ...rule,
                            message: rule.message,
                        }))}
                    >
                        <Input placeholder="Username" />
                    </RegisterFormItem>
                    <RegisterFormItem
                        label="Email"
                        name="email"
                        rules={emailValidate.map((rule: ValidationObject) => ({
                            ...rule,
                            message: rule.message,
                        }))}
                    >
                        <Input type="email" placeholder="user@email.com" />
                    </RegisterFormItem>
                    <RegisterFormItem
                        label="Password"
                        name="password"
                        rules={passwordValidate.map((rule: ValidationObject) => ({
                            ...rule,
                            message: rule.message,
                        }))}
                    >
                        <Input.Password placeholder="password123" />
                    </RegisterFormItem>
                    <RegisterFormItem>
                        <RegisterButton
                            type="primary"
                            htmlType="submit"
                            className="register-button"
                            loading={isLoading}
                        >
                            Register
                        </RegisterButton>
                    </RegisterFormItem>
                </Form>

                <RegisterLoginText>
                    Already have an account?{' '}
                    <RegisterLoginLink to={LOGIN}>
                        <RegisterLoginLinkText>Log In</RegisterLoginLinkText>
                    </RegisterLoginLink>{' '}
                    instead!
                </RegisterLoginText>
            </RegisterContent>
        </RegisterContainer>
    );
}
