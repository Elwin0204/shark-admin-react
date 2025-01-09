import { Avatar, Dropdown, MenuProps } from "antd";
import React from "react";
import IMG_Avatar from "@/assets/images/avatar.png";
import SvgIcon from "@/components/ui/SvgIcon";

const SkAvatar: React.FC = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <SvgIcon icon="ant-design:home-outlined" style={{ fontSize: "16px" }} />,
      label: <span className="dropdown-item">首页</span>
    },
    {
      key: "2",
      icon: <SvgIcon icon="ant-design:user-outlined" style={{ fontSize: "16px" }} />,
      label: <span className="dropdown-item">个人信息</span>
    },
    {
      key: "3",
      icon: <SvgIcon icon="ant-design:edit-outlined" style={{ fontSize: "16px" }} />,
      label: <span className="dropdown-item">修改密码</span>
    },
    {
      type: "divider"
    },
    {
      key: "4",
      icon: <SvgIcon icon="ant-design:logout-outlined" style={{ fontSize: "16px" }} />,
      label: <span className="dropdown-item">退出登录</span>
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} placement="bottom" arrow trigger={["click"]}>
        <Avatar src={<img src={IMG_Avatar} alt="shark" />} style={{ cursor: 'pointer' }} />
      </Dropdown>
    </>
  );
}

export default SkAvatar;