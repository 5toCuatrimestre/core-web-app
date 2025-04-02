// src/pages/auth/login.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";
import { Button } from "@heroui/react";
import { StyleContext } from "../../core/StyleContext";
import Strings from "../../utils/localizations/Strings";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { setToken } from "../../services/storage";
import toast from 'react-hot-toast';

export function Login() {
  const navigate = useNavigate();
  const { style } = useContext(StyleContext);
  const loginMutation = useLogin();

  const onFinish = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    loginMutation.mutate(values, {
      onSuccess: (data) => {
        setToken(data.jwt);
        navigate("/statistic");
      },
      onError: (error) => {
        toast.error('Error en las credenciales', {
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: style.BgCard,
            color: style.H1,
            border: `1px solid ${style.BgInterface}`,
          },
        });
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundColor: style.BgInterface }}>
      <form onSubmit={onFinish} className="w-96 shadow-2xl rounded-2xl p-6" style={{ backgroundColor: style.BgCard, color: style.H1 }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: style.H2 }}>{Strings.login}</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm" style={{ color: style.H3 }}>{Strings.email}</label>
          <div className="flex items-center bg-opacity-10 rounded-md p-2" style={{ backgroundColor: style.BgInterface }}>
            <UserOutlined className="text-gray-400 mr-2" />
            <input type="email" name="email" placeholder={Strings.email} required className="w-full bg-transparent outline-none text-sm" style={{ color: style.H3 }} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm" style={{ color: style.H3 }}>{Strings.password}</label>
          <div className="flex items-center bg-opacity-10 rounded-md p-2" style={{ backgroundColor: style.BgInterface }}>
            <LockOutlined className="text-gray-400 mr-2" />
            <input type="password" name="password" placeholder={Strings.password} required className="w-full bg-transparent outline-none text-sm" style={{ color: style.H3 }} />
          </div>
        </div>
        <Button type="submit" className="w-full py-2 rounded-md" style={{ background: style.BgButton, color: style.P }} disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
}
