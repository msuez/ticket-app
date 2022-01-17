import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import { useHideMenu } from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';

const { Title, Text } = Typography;

export const Signin = () => {

    const history = useNavigate();
    const [user] = useState( getUserStorage() );

    useHideMenu(false);

    const onFinish = ({ agent, desktop }) => {
        localStorage.setItem('agent', agent);
        localStorage.setItem('desktop', desktop);
        history('/desktop');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if( user.agent && user.desktop ) {
        return <Navigate to="/desktop" />
    }

    return (
    <>
        <Title level={ 2 }>Sign in</Title>
        <Text level={ 2 }>Enter your agent name and desktop number</Text>
        <Divider />
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            <Form.Item
                label="Agent name: "
                name="agent"
                rules={[{ required: true, message: 'Please input your agent name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Desktop: "
                name="desktop"
                rules={[{ required: true, message: 'Please input your desktop number!' }]}
            >
                <InputNumber min={ 1 } max={ 90 } />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button 
                    type="primary" 
                    htmlType="submit"
                    shape="round">
                    <SaveOutlined />
                    Sign in
                </Button>
            </Form.Item>
        </Form>
    </>
    )
}
