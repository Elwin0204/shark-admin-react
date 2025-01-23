import useStyles from "./style";


const Index: React.FC = () => {
  const { styles } = useStyles();
  return (
    <div>首页
      <div className={styles.testIndex}>测试主题ABCabc123</div>
    </div>
  )
}

export default Index