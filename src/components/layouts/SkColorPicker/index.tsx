import { ColorPicker, Divider, Flex } from 'antd';
import type { ColorPickerProps } from 'antd';
import { Color } from 'antd/es/color-picker';

interface Props {
  defaultValue: string;
  onChange: (value: string) => void;
}

const SkColorPicker: React.FC<Props> = ({ defaultValue, onChange }) => {
  const presets = [{
    label: "预设颜色",
    colors: ["#1677ff", "#722ed1", "#13c2c2", "#52c41a", "#eb2f96", "#f5222d", "#fa8c16", "#fadb14", "#fa541c", "#2f54eb", "#faad14", "#a0d911", "#000000"]
  }];

  const customPanelRender: ColorPickerProps['panelRender'] = (
    _,
    { components: { Picker, Presets } },
  ) => (
    <Flex vertical={true}>
      <Picker />
      <Divider />
      <Presets />
    </Flex>
  );

  function onChangeComplete(value: Color) {
    const hex = value.toHexString();
    onChange(hex);
  }
  return (
    <ColorPicker
      defaultValue={defaultValue}
      styles={{ popupOverlayInner: { width: 258 } }}
      presets={presets}
      disabledAlpha
      disabledFormat
      placement='left'
      panelRender={customPanelRender}
      onChangeComplete={(value) => onChangeComplete(value) }
    />
  );
};

export default SkColorPicker;