import settings from "@/config";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import useStyles from './style';

const Page403 = () => {
  const { styles } = useStyles()
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate(settings.homeUrl);
  };

  return (
    <Result
      className={ styles.center }
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page"
      extra={
        <Button type="primary" onClick={redirectHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default Page403;