import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";

const SkTabBar: React.FC = () => {
  const { styles: baseStyles, cx } = useBaseStyles();
  const { styles } = useStyles();
  return (
    <SkDarkWrapper className={cx(baseStyles.sizeFull, baseStyles.flexYCenter, styles.appTabBar)}>
      <div>tabs</div>
    </SkDarkWrapper>
  )
}

export default SkTabBar