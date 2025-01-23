interface Props {
  pin?: boolean;
  onClick?: React.ComponentProps<'button'>['onClick'];
  className: string;
}

const SkPin: React.FC<Props> = memo(({ pin, onClick, className }) => {
  const  icon = pin ? "f7:pin-slash-fill" : "f7:pin-fill";
  return (
    <SkButton tooltipPlacement="bottomLeft" triggerParent onClick={onClick} className={className}>
      <SvgIcon icon={icon} />
    </SkButton>
  );
});

export default SkPin;