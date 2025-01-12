import Horizontal from "./components/Horizontal";
import HorizontalMix from "./components/HorizontalMix";
import Vertical from "./components/Vertical";
import VerticalMix from "./components/VerticalMix";

interface Props {
  layout: UnionKey.LayoutMode;
}

const SkMenu: React.FC<Props> = memo(({ layout }) => {
  const componentMap = useMemo(
    () => ({
      vertical: <Vertical />,
      "vertical-mix": <VerticalMix />,
      horizontal: <Horizontal />,
      "horizontal-mix": <HorizontalMix />
    }),
    []
  );

  return componentMap[layout];
})

export default SkMenu;