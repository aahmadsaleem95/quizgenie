import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Avatar, Space, Typography, message } from "antd";

export const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <div className="AppHeader">
      <Space>
        <Avatar size={"large"} icon={<UserOutlined />} />
        <Typography.Text>Admin</Typography.Text>
      </Space>
      <Typography.Title>Expense Management Dashboard</Typography.Title>
      <Space>
        <Badge count={0}>
          <LogoutOutlined
            style={{ fontSize: 24, rotate: "270deg" }}
            onClick={() => {
              logoutHandler();
            }}
          />
        </Badge>
      </Space>
    </div>
  );
};
