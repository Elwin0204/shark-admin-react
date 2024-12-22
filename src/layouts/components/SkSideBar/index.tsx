import useStyles from './style'

const SKSideBar: React.FC = () => {
  const { styles } = useStyles()
  return (
    <div className={ styles.sideBarContainer }>side bar</div>
  )
}

export default SKSideBar