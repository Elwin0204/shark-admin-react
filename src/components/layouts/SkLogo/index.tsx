import IMG_Logo from "@/assets/images/logo.png";
import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";

interface Props {
  showTitle: boolean;
  className?: string;
}

const SkLogo: React.FC<Props> = ({ className, showTitle = true }) => {
  const { styles: baseStyles, cx } = useBaseStyles();
  const { styles } = useStyles();
  return (
    <Link to="/index" className={cx(baseStyles.wFull, baseStyles.flexCenter, baseStyles.nowrapHidden, styles.skLogoWrapper, className)}>
      <img src={IMG_Logo} className={cx(styles.skLogoImage)} />
      <div style={{ display: showTitle ? "block" : "none" }} className={cx(styles.skLogoTitle)}>
        shark-admin-react
      </div>
    </Link>
  );
}

export default SkLogo;