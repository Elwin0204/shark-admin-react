import { Spin } from 'antd'
import useStyles from './style'
const SkLoading: React.FC = ({ tip = '加载中...' }: { tip?: string }) => {
  const { styles } = useStyles()
  return (
    <Spin size="large" tip={tip}>
      <span className={ styles.loadingText }>{ tip }</span>
    </Spin>
  )
}

export default SkLoading