import { Segmented } from "antd";
import { THEME_MODE_RECORDS } from "@/const/app";
import { SegmentedOptions } from "antd/es/segmented";

interface Props {
  defaultValue: string;
  onChange: (value: string) => void;
}

const options: SegmentedOptions = Object.keys(THEME_MODE_RECORDS).map(item => {
  const key = item as UnionKey.ThemeMode;
  return {
    value: item,
    label: (<SvgIcon
      icon={THEME_MODE_RECORDS[key]}
    />)
  };
});

const SkThemeModeSegment: React.FC<Props> = ({ defaultValue, onChange }) => {
  return (
    <div>
      <Segmented value={defaultValue} options={options} onChange={(value) => onChange(value as string)  } />
    </div>
  );
};

export default SkThemeModeSegment;