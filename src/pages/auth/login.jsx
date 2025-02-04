import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { StyleContext } from '../../core/StyleContext';
import Strings from "../../utils/localizations/Strings";

export function Login() {
  const navigate = useNavigate();
  const { style } = useContext(StyleContext); // Accede al estilo global

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    navigate("/statistics");
  };

  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundColor: style.lightBackgroundColor }}>
      <Form
        className="w-96 shadow-2xl rounded-2xl p-4 pt-8"
        name={Strings.login}
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
          backgroundColor: style.baseColor,
          color: "#ffffff",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name={Strings.email}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: style.lightBackgroundColor }} />}
            placeholder={Strings.email}
            style={{ backgroundColor: style.darkBackgroundColor, color: "#ffffff" }}
          />
        </Form.Item>

        <Form.Item
          name={Strings.password}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined style={{ color: style.lightBackgroundColor }} />}
            type={Strings.password}
            placeholder={Strings.password}
            style={{ backgroundColor: style.darkBackgroundColor, color: "#ffffff" }}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#ffffff" }}>Remember me</Checkbox>
            </Form.Item>
            <a href="" style={{ color: "#ffffff"}}>Forgot password</a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button 
            block 
            type="primary" 
            htmlType="submit" 
            style={{ backgroundColor: style.mediumBackgroundColor, borderColor: style.mediumBackgroundColor }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
