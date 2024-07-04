import { Button, Col, Form, Input, Row, Space } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelName, PageProps } from './model';
import { connect } from 'umi';
import { dispatchMethod } from '@/utils';
import { Loading } from '@/components';

import "./index.less";

const Page: FC<PageProps> = ({
  dispatch,
  pageState: { loading, token },
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<{ 'id': any }>();

  const id = Form.useWatch('id', form);

  const handleLogin = async () => {
    await form.validateFields();
    if (id) {
      await dispatchMethod(dispatch, ModelName, "login", {
        userEmail: id
      });
    }
  }

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token);
      window.location.href = '/';
    }
  }, [token]);

  return (
    <div className='preview-result' style={{textAlign: 'left'}}>
      <Loading loading={loading} />
      <Row>
        <Col span={24}>
          <Form
            form={form}
            name='login'
            labelCol={{span: 9}}
            wrapperCol={{span: 7}}
            layout={'horizontal'}
            onFinish={handleLogin}
          >
            <Form.Item label='账号' name='id' rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱' }]}>
              <Input placeholder='请输入邮箱'/>
            </Form.Item>
            <Form.Item wrapperCol={{span: 24}} style={{textAlign:'center'}}>
              <Space>
                <Button type='primary' htmlType='submit'>登陆</Button>
              </Space>
            </Form.Item>
          </Form>
          {/* <div id='codeArea'>
            <iframe title='login' frameBorder='0' sandbox='allow-scripts allow-same-origin allow-top-navigation' scrolling='no'  
            src={qrCodeUrl} height='400'></iframe>
          </div> */}
        </Col>
      </Row>
    </div>
  )
}

export default connect((state: any) => ({
  pageState: state[ModelName],
}))(Page);