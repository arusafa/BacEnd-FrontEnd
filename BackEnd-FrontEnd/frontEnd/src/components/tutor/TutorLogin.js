import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, notification, Alert } from "antd";
import { AuthContext } from "../auth/AuthProvider";
import { AuthProvider } from "../auth/AuthProvider";
import { ProtectedProvider } from "../auth/ProtectedProvider";

const TutorLogin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { authenticated } = useContext(AuthContext);

  const BASE_URL = "https://capstone-backend-gldz.onrender.com/home";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/tutor/login`, values);
      setLoading(false);
      form.resetFields();
      notification.success({
        message: "Login success",
        description: "Welcome back to our platform.",
      });
      navigate("/landing");
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Login failed",
        description: error.message,
      });
    }
  };

  if (authenticated) {
    return <Alert message="You're already logged in" type="warning" />;
  }

  return (
    <div className="login" style={{ margin: "5%" }}>
    <Form form={form} onFinish={onFinish}>
      <h1 style={{ textAlign: "center" }}>Log In</h1>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Log in
        </Button>
      </Form.Item>
      <Link to="/home/tutor/signup">Don't have an account? Sign up</Link>
    </Form>
    </div>
  );
};

export default () => (
  <AuthProvider>
    <TutorLogin />
  </AuthProvider>
);
