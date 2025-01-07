import settings from "@/config";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import useStyles from './style';

const Page404 = () => {
	const { styles } = useStyles()
  const navigate = useNavigate();
	const redirectHome = () => {
    navigate(settings.homeUrl);
  };

	return (
		<Result
			className={ styles.center }
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" onClick={redirectHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default Page404;