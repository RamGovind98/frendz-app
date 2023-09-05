import { Button, Form, Input, message, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FEED, REGISTER } from './../../../routes/route';
import { emailValidate, passwordValidate, ValidationObject } from './../../../utils/form-validate';
import { useLogin } from './../auth';
import styled from 'styled-components';
import backgroundImage from '../../../assets/yellow-light-background-hd.jpg'

const { Title, Text } = Typography;

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    

`;

const LoginContent = styled.div`
    max-width: 450px;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 6px grey;
`;

const LoginTitle = styled(Title)`
    text-align: center;
    margin-bottom: 1rem;
`;



const RegisterLink = styled(Link)`
    color: #1890ff;
    text-decoration: underline;
`;

const RegisterSpan = styled.span`
    color: #1890ff;
    text-decoration: underline;
`;

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const { login, isLoading } = useLogin();
    const [form] = Form.useForm();

    const handleLogin = async (values: FormData) => {
        try {
            await login({
                email: values.email,
                password: values.password,
                redirectTo: FEED,
            });
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
        }
    }

    return (
        <LoginContainer >
            <LoginContent>
                <LoginTitle level={2}>Log In</LoginTitle>

                <Form form={form}  onFinish={handleLogin}   name="login">
                    <Form.Item
                        name="email"
                        rules={emailValidate.map((rule: ValidationObject) => {
                            if (rule.required) {
                                return {
                                    required: true,
                                    message: rule.message,
                                };
                            } else if (rule.min) {
                                return {
                                    min: rule.min,
                                    message: rule.message,
                                };
                            } else if (rule.pattern) {
                                return {
                                    pattern: rule.pattern,
                                    message: rule.message,
                                };
                            } else {
                                return {};
                            }
                        })}
                    >
                        <Input placeholder="Email" className="login-input" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={passwordValidate.map((rule: ValidationObject) => {
                            if (rule.required) {
                                return {
                                    required: true,
                                    message: rule.message,
                                };
                            } else if (rule.min) {
                                return {
                                    min: rule.min,
                                    message: rule.message,
                                };
                            } else if (rule.pattern) {
                                return {
                                    pattern: rule.pattern,
                                    message: rule.message,
                                };
                            } else {
                                return {};
                            }
                        })}
                    >
                        <Input.Password placeholder="Password" className="login-input" />
                    </Form.Item>
                    <Form.Item name="button">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-button"
                            loading={isLoading}
                        >
                            Log In
                        </Button>
                    </Form.Item>
                </Form>

                <Text style={{ fontSize: '1.2rem', textAlign: 'center' }}>
                    Don't have an account?{' '}
                    <RegisterLink to={REGISTER}>
                        <RegisterSpan>Register</RegisterSpan>
                    </RegisterLink>{' '}
                    instead!
                </Text>
            </LoginContent>
        </LoginContainer>
    );
}
