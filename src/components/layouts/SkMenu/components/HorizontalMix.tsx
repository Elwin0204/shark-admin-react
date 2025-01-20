import { APP_SIDER_MENU_ID } from "@/const/app";
import Horizontal from "./Horizontal";
import { createPortal } from "react-dom";

const HorizontalMix: React.FC = () => {
  const container = useGetElementById(APP_SIDER_MENU_ID);

  if(!container) return null;

  return [
    <Horizontal mode="2" key="horizontal" />,
    createPortal(<FirstLevelMenu key="first-level-menu" />, container)
  ];
}

export default HorizontalMix;