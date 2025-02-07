import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input } from "antd";
import { Button } from "@heroui/react";
import { StyleContext } from "../../core/StyleContext";
import Strings from "../../utils/localizations/Strings";

export function Login() {
  const navigate = useNavigate();
  const { style } = useContext(StyleContext); // Accede al estilo global

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    navigate("/statistic");
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: style.BgInterface }}
    >
      <Form
        className="w-96 shadow-2xl rounded-2xl p-4 pt-8"
        name={Strings.login}
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
          backgroundColor: style.BgCard,
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
            prefix={
              <UserOutlined style={{ color: style.lightBackgroundColor }} />
            }
            placeholder={Strings.email}
            style={{ backgroundColor: style.BgInterface, color: style.H3 }}
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
            prefix={
              <LockOutlined style={{ color: style.lightBackgroundColor }} />
            }
            type={Strings.password}
            placeholder={Strings.password}
            style={{ backgroundColor: style.BgInterface, color: style.H3 }}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: style.H3 }}>Remember me</Checkbox>
            </Form.Item>
            <a href="" style={{ color: style.H3 }}>
              Forgot password
            </a>
          </div>
        </Form.Item>

        <Form.Item className="justify-items-center w-full">
          <Button
            className="w"
            block
            type="primary"
            htmlType="submit"
            style={{ background: style.BgButton, color: style.P }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
