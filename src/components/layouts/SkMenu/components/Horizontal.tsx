import { APP_HEADER_MENU_ID } from "@/const/app";
import { createPortal } from "react-dom";

const Horizontal: React.FC = () => {
  const container = useGetElementById(APP_HEADER_MENU_ID);

  if(!container) return null;

  return createPortal(<HorizontalMenu />, container);
}

export default Horizontal;