import {
  Button,
} from 'antd'
import SkTopBar from './components/SkTopBar'
import SkTabsBar from './components/SkTabsBar'
import SkAppMain from './components/SkAppMain'
import SkSideBar from './components/SkSideBar'
import SkNavBar from './components/SkNavBar'
import classnames from 'classnames'
import useStyles from './style'
import { useSettingStore } from '@stores/index'
import Bus from 'event-bus-hooks'

const BasicLayout: React.FC = () => {
  const { styles } = useStyles()
  const device = useSettingStore(state => state.device)
  const layout = useSettingStore(state => state.layout)
  const header = useSettingStore(state => state.header)
  const tabsBar = useSettingStore(state => state.tabsBar)
  const collapse = useSettingStore(state => state.collapse)
  const setLayout = useSettingStore(state => state.setLayout)
  const foldSidebar = useSettingStore(state => state.foldSidebar)

  const toggleLayout = () => {
    setLayout(layout === 'horizontal' ? 'vertical' : 'horizontal')
  }

  const reloadRouter = () => {
    Bus.$emit('reload-router-view')
    console.log('emit')
  }

  const handleFoldSideBar = () => {
    foldSidebar(true)
  }
  return (
    <div className={ classnames(styles.sharkAdminWrapper, { 'mobile': device === 'mobile' }) }>
      { layout === 'horizontal' ?
        (<div className={ classnames('layout-container-horizontal', { fixed: header === 'fixed' }, { 'no-tabs-bar': tabsBar === false }) }>
          <div className={ classnames({ 'fixed-header': header === 'fixed' }) }>
            <SkTopBar />
            { tabsBar && 
            (<div className={ classnames({ 'tag-view-show': tabsBar }) }>
              <div className='sk-main'>
                <SkTabsBar />
              </div>
            </div>) }
          </div>
          <div className="sk-main main-padding">
            <SkAppMain />
          </div>
        </div>) :
        (<div className={ classnames('layout-container-vertical', { fixed: header === 'fixed' }, { 'no-tabs-bar': tabsBar === false }) }>
          { device === 'mobile' && collapse === false && (<div className='mask' onClick={ () => handleFoldSideBar() }></div>)}
          <SkSideBar />
          <div className={ classnames('sk-main', { 'is-collapse-main': collapse === true }) }>
            <div className={  classnames({ 'fixed-header': header === 'fixed' }) }>
              <SkNavBar />
              { tabsBar && <SkTabsBar /> }
            </div>
            <SkAppMain />
          </div>
        </div>)
      }
      <Button style={ { position: 'fixed', bottom: 10, right: 10 } } onClick={ () => toggleLayout() }>{ layout }</Button>
      <Button style={ { position: 'fixed', bottom: 50, right: 10 } } onClick={ () => reloadRouter() }>重载路由</Button>
    </div>
  )
}

export default BasicLayout