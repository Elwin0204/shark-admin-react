import { App } from "antd";
import useBaseStyle from "@/assets/styles/base";

const ContextHolder = () => {
  const { message, notification, modal } = App.useApp();
  window.$message = message;
  window.$notification = notification;
  window.$modal = modal;
  return null;
}

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = memo(({ children }) => {
  const { styles: baseStyle, cx } = useBaseStyle();
  return (
    <App className={cx(baseStyle.hFull)}>
      <ContextHolder />
      {children}
    </App>
  );
});

export default AppProvider;