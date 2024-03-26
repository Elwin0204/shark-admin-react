/**
 * @author Elwin
 * @description 通用配置|主题配置|网络配置导出|多语言配置
 */
import setting from "./setting.config"
import theme from "./theme.config"
import network from "./net.config"
import lang from "./lang.config"

const settings = {
  ...setting,
  ...theme,
  ...network,
  ...lang
}

export default settings
