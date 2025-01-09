import { APP_SIDER_MENU_ID } from '@/const/app'
import useStyles from './style'
import useBaseStyles from '@/assets/styles/base';
import SkLogo from '@/components/layouts/SkLogo';

interface Props {
  showLogo: boolean;
  collapse: boolean;
}

const SKSideBar: React.FC<Props> = ({ showLogo, collapse }) => {
  const { styles: baseStyles } = useBaseStyles();
  const { styles } = useStyles();

  return (
    <div>
      {showLogo && (
        <SkLogo showTitle={!collapse} />
      )}
      <div id={APP_SIDER_MENU_ID} className={showLogo ? baseStyles.flex1Hidden : baseStyles.hFull } />
    </div>
  )
}

export default SKSideBar