/**
 * @author Elwin
 * @description 通用配置
 */
const setting = {
  // 开发以及部署时的URL
  publicPath: '',
  // 生产环境构建文件的目录名
  outputDir: 'docs',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  // 进行编译的依赖
  transpileDependencies: [],
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: 'shark-admin',
  //版本号
  version: import.meta.env.VITE_VERSION,
  //这一项非常重要！请务必保留MIT协议下package.json及copyright作者信息 即可免费商用，不遵守此项约定你将无法使用该框架
  copyright: 'shark',
  //是否显示页面底部自定义版权信息
  footerCopyright: true,
  //是否显示顶部进度条
  progressBar: true,
  //缓存路由的最大数量
  keepAliveMaxNum: 99,
  // 路由模式，可选值为 history 或 hash
  routerMode: 'hash',
  //不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/404', '/401'],
  //加载时显示文字
  loadingText: '正在加载中...',
  //token名称
  tokenName: 'accessToken',
  //token在localStorage、sessionStorage存储的key的名称
  tokenTableName: 'sharkAdmin',
  //token存储位置localStorage sessionStorage
  storage: 'localStorage',
  //是否开启登录RSA加密
  loginRSA: true,
  // 是否自动登录
  loginAuto: false,
  //vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: true,
  //是否显示终端donation打印
  donation: true,
  homeUrl: "/index",
}
export default setting