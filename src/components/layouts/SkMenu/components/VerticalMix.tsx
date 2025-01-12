import { APP_SIDER_MENU_ID } from "@/const/app";
import { createPortal } from "react-dom";

const VerticalMixContent = () => {
  return (
    <div>VerticalMix</div>
  );
}

const VerticalMix: React.FC = () => {
  const container = useGetElementById(APP_SIDER_MENU_ID);

  if(!container) return null;

  return createPortal(<VerticalMixContent />, container);
}

export default VerticalMix;