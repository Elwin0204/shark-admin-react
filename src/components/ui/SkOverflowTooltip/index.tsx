import { Tooltip, TooltipProps } from "antd"

type OverflowTooltip = Omit<TooltipProps, "open" | "trigger"> & {
  title: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const SkOverflowTooltip: React.FC<OverflowTooltip> = ({ title, style, className, ...props }) => {
  const [visible, setVisible] = useState(false);

  const contentRef = useRef<HTMLSpanElement>(null);

  const showTooltip = () => {
    if(contentRef.current && contentRef.current.parentElement) {
      const spanWidth = contentRef.current.offsetWidth;
      const parentWidth = contentRef.current.parentElement.offsetWidth;

      if(spanWidth > parentWidth) {
        setVisible(true);
      }
    }
  };

  return (
    <Tooltip
      title={title}
      open={visible}
      { ...props }
    >
      <span ref={contentRef} onMouseOver={showTooltip} onMouseLeave={() => setVisible(false)} style={style} className={className}>{ title }</span>
    </Tooltip>
  );
}

export default SkOverflowTooltip;