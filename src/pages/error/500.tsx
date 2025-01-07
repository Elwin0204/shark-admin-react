import settings from "@/config";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import useStyles from './style';

const Page500 = () => {
	const { styles } = useStyles();
  const navigate = useNavigate();
	const redirectHome = () => {
    navigate(settings.homeUrl);
  };

	return (
		<Result
			className={ styles.center }
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
			extra={
				<Button type="primary" onClick={redirectHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default Page500;