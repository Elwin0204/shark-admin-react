import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";

const SkAppHeader: React.FC = () => {
  const { styles: baseStyles } = useBaseStyles();
  const { styles, cx } = useStyles();
  return (
    <SkDarkWrapper className={cx(styles.appFooter, baseStyles.hFull, baseStyles.flexCenter, baseStyles.transitionAll300)}>
      <a href="javascropt:void;" target="_blank"
        rel="noopener noreferrer">
        Copyright MIT © 2024 Shark admin react
      </a>
    </SkDarkWrapper>
  )
};

export default SkAppHeader;