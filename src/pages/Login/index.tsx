import { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useUserStore } from '@/stores/index'
import useStyles from './style'
import { useNavigate } from 'react-router-dom'
import SkBubble from '@/components/ui/SkBubble'

const Login: React.FC = () => {
  const { styles } = useStyles()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { login } = useUserStore()
  const navigator = useNavigate()
  
  const handleLogin = async (values: { username: string, password: string }) => {
    setLoading(true)
    login(values).then(res => {
      if (res) {
        navigator('/')
      }
    }).finally(() => {
      setLoading(false)
    })
  }
  return (
    <div className={ styles.container }>
      <div className={ styles.dialog }>
        <Form
          form={form}
          name="control-hooks"
          onFinish={ handleLogin }
          className={ styles.form }
        >
          <div className={ styles.titleTips }>欢迎来到shark-admin!</div>
          <Form.Item className={ styles.formItem } style={ { marginTop: '40px' } } name="username" rules={[{ required: true }]}>
            <Input placeholder="用户名: admin/editor" className={ styles.input } prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item className={ styles.formItem } name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="密码: 123456" className={ styles.input } prefix={<LockOutlined />} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className={ styles.loginBtn } loading={ loading }>
            登录
          </Button>
        </Form>
      </div>
      <div className={ styles.waveContainer }>
        <svg
          className={ styles.wave }
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="JS_BaseWave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 55-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={ styles.parallax }>
            <use
              xlinkHref="#JS_BaseWave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7)"
            />
            <use
              xlinkHref="#JS_BaseWave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#JS_BaseWave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#JS_BaseWave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      <div style={{ position: "absolute", left: "0", top: "0" }}>
        <SkBubble />
      </div>
    </div>
  )
}

export default Login