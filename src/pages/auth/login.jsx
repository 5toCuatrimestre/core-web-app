import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { StyleContext } from "../../core/StyleContext";
import Strings from "../../utils/localizations/Strings";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export function Login() {
  const navigate = useNavigate();
  const { style } = useContext(StyleContext);

  const onFinish = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    console.log("Received values of form: ", values);
    navigate("/statistic");
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: style.BgInterface }}
    >
      <form
        onSubmit={onFinish}
        className="w-96 shadow-2xl rounded-2xl p-6"
        style={{ backgroundColor: style.BgCard, color: style.H1 }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: style.H2 }}>
          {Strings.login}
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm" style={{ color: style.H3 }}>
            {Strings.email}
          </label>
          <div className="flex items-center bg-opacity-10 rounded-md p-2" style={{ backgroundColor: style.BgInterface }}>
            <UserOutlined className="text-gray-400 mr-2" />
            <input
              type="email"
              name={Strings.email}
              placeholder={Strings.email}
              required
              className="w-full bg-transparent outline-none text-sm"
              style={{ color: style.H3 }}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm" style={{ color: style.H3 }}>
            {Strings.password}
          </label>
          <div className="flex items-center bg-opacity-10 rounded-md p-2" style={{ backgroundColor: style.BgInterface }}>
            <LockOutlined className="text-gray-400 mr-2" />
            <input
              type="password"
              name={Strings.password}
              placeholder={Strings.password}
              required
              className="w-full bg-transparent outline-none text-sm"
              style={{ color: style.H3 }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mb-4">
          <label className="flex items-center" style={{ color: style.H3 }}>
            <input type="checkbox" name="remember" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-sm" style={{ color: style.H3 }}>
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full py-2 rounded-md"
          style={{ background: style.BgButton, color: style.P }}
        >
          Log in
        </Button>
      </form>
    </div>
  );
}
