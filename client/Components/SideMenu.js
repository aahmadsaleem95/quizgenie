import {
  AppstoreOutlined,
  ShopOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SideMenu = ({ userDetails }) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const menuItems = [
    {
      label: "Dashboard",
      icon: <AppstoreOutlined />,
      key: "/",
    },
    {
      label: "Courses",
      key: "/course",
      icon: <ShopOutlined />,
    },
    {
      label: "Quizes",
      key: "/quiz",
      icon: <ShopOutlined />,
    },
  ];

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={menuItems.filter((menu) => {
          let privileges = userDetails?.rolePrivilege?.privileges;
          if (
            !privileges?.includes("CAN_VIEW_REPORTS") &&
            menu.label === "Report"
          ) {
            return false;
          } else {
            return true;
          }
        })}
      ></Menu>
    </div>
  );
};
