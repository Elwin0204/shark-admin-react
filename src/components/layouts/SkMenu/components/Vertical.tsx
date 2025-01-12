import { APP_SIDER_MENU_ID } from "@/const/app";
import { createPortal } from "react-dom";

const Vertical = () => {
  const container = useGetElementById(APP_SIDER_MENU_ID);

  if(!container) return null;

  return createPortal(<VerticalMenu />, container);
}

export default Vertical;