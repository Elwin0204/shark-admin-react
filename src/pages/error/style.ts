import { createStyles } from 'antd-style'

export default createStyles(({ css }) => ({
  center: {
    display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		[`.ant-result-image`]: {
      margin: 0
    },
  },
}))