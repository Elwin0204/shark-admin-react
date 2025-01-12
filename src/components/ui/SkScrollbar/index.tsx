import SimplebarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css"
import useBaseStyles from "@/assets/styles/base";

interface Props {
  children: React.ReactNode;
}

const SkScrollbar: React.FC<Props> = ({ children }) => {
  const { styles: baseStyles, cx } = useBaseStyles();
  return (
    <div className={cx(baseStyles.hFull, baseStyles.flex1Hidden)}>
      <SimplebarReact className={cx(baseStyles.hFull)}>{ children }</SimplebarReact>
    </div>
  );
}

export default SkScrollbar;