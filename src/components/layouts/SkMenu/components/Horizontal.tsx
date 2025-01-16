import { APP_HEADER_MENU_ID } from "@/const/app";
import { createPortal } from "react-dom";

interface Props {
  mode?: UnionKey.MenuMode;
}

const Horizontal: React.FC<Props> = ({ mode = "1" }) => {
  const container = useGetElementById(APP_HEADER_MENU_ID);

  if(!container) return null;

  return createPortal(<HorizontalMenu mode={mode} />, container);
}

export default Horizontal;