import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, notification } from "antd";

const TutorSignup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://capstone-backend-gldz.onrender.com/home";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        phone: values.phone,
        email: values.email,
        password: values.password,
      };
      await axios.post(`${BASE_URL}/tutor/signup`, data);
      setLoading(false);
      form.resetFields();
      notification.success({
        message: "Sign up success",
        description: "Welcome to our platform.",
      });
      navigate("/home/tutor/login");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        notification.error({
          message: "Sign up failed",
          description: "A user with the same email address already exists.",
        });
      } else {
        notification.error({
          message: "Sign up failed",
          description: error.message,
        });
      }
    }
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  });

  return (
    <div className="signup" style={{ margin: "5%" }}>
      <Form form={form} onFinish={onFinish}>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <Form.Item
          name="firstname"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First name" />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last name" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input placeholder="Phone number" />
        </Form.Item>
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
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            validatePassword,
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign up
          </Button>
        </Form.Item>
        <Link to="/home/tutor/login">Already have an account? Log in</Link>
      </Form>
    </div>
  );
};

export default TutorSignup;
