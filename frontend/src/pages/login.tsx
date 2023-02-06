import React, {useState} from 'react'
import {Alert, Button, Checkbox, Form, Input, Spin} from 'antd'
import axios from "axios"
import {history} from 'umi'

const LoginPage: React.FC = ({}) => {
  type LoginValueType = {
    username: string,
    password: string,
  }

  const [loading, setLoading] = useState(false)
  const [isLoginIncorrect, setIsLoginIncorrect] = useState(false)
  const onLoginSubmit = (values: LoginValueType) => {
    setLoading(true)
    axios.post('/api/login', {...values})
      .then(resp => {
        history.push('/')
      })
      .catch(e => {
        setLoading(false)
        setIsLoginIncorrect(true)
      })
  }
  return (
    <Spin spinning={loading}>
      <div id={"login-page"}>
        {isLoginIncorrect ? <Alert message="密码错误" type="error"/> : null}
        <Form
          name="basic"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{maxWidth: 600}}
          initialValues={{remember: true}}
          onFinish={onLoginSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{required: true, message: 'Please input your username!'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  )
}

export default LoginPage