import useStyles from "./style";

interface Props extends React.ComponentProps<"div"> {
  inverted?: boolean;
}

const SkDarkWrapper: React.FC<Props> = ({ children, inverted, ...rest }) => {
  const { styles, cx } = useStyles();
  return (
    <div className={ cx(styles.skDarkWrapper, inverted ? styles.skInverted : "") }  {...rest}>
      {children}
    </div>
  );
}

export default SkDarkWrapper;