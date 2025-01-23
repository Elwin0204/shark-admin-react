import useBaseStyles from "@/assets/styles/base";
import useStyles from "./style";

interface Props {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const SkSettingItem: React.FC<Props> = memo(({ label, children, className }) => {
  const { styles: baseStyles, cx } = useBaseStyles();
  const { styles } = useStyles();
  return (
    <div className={cx(baseStyles.flexRowBetween, className)}>
      <span className={styles.skSettingItemLabel}>{label}</span>
      {children}
    </div>
  );
});

export default SkSettingItem;