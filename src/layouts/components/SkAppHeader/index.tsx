import classnames from 'classnames'
import useBaseStyles from '@/assets/styles/base'
import useStyles from "./style"
import SkCollapse from '../SkCollapse'

const SkAppHeader: React.FC = () => {
  const { styles: baseStyles } = useBaseStyles()
  const { styles } = useStyles()
  return (
    <div className={classnames(baseStyles.hFull, baseStyles.flexYCenter, styles.appHeader)}>
      <SkCollapse />
      header
    </div>
  )
}

export default SkAppHeader