import { Avatar, Dropdown, MenuProps, Modal } from "antd";
import React from "react";
import IMG_Avatar from "@/assets/images/avatar.png";
import SvgIcon from "@/components/ui/SvgIcon";
import useBaseStyle from "@/assets/styles/base";
import { useRootStore } from "@/stores";

const SkAvatar: React.FC = () => {
  const { styles: baseStyles, cx } = useBaseStyle();
  const navigator = useNavigate();
  const rootStore = useRootStore();

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
  const [modalOpen, setModalOpen] = useState(false);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if(key === "4") {
      setModalOpen(true);
    }
  };

  const handleLogout = () => {
    setModalOpen(false);
    rootStore.logout();
    navigator('/login', { replace: true });
  }
  return (
    <>
      <Dropdown menu={{ items, onClick }} placement="bottom" arrow trigger={["click"]}>
        <Avatar src={<img src={IMG_Avatar} alt="shark" />} style={{ cursor: 'pointer' }} />
      </Dropdown>
      <Modal
        title="提示"
        centered
        width="420px"
        open={modalOpen}
        onOk={() => handleLogout() }
        onCancel={() => setModalOpen(false)}
      >
        <p className={cx(baseStyles.flexYCenter)}>
          <SvgIcon icon="fluent-color:warning-24" style={{fontSize: "24px", marginRight: "4px"}} />
          确认退出登录吗</p>
      </Modal>
    </>
  );
}

export default SkAvatar;