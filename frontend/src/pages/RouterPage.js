import React, { useContext } from 'react'
import { Layout, Menu } from 'antd';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link, 
    Navigate,
} from "react-router-dom";
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { UiContext } from '../contexts/UiContext';

import { Signin } from './Signin';
import { Queue } from './Queue';
import { CreateTicket } from './CreateTicket';
import { Desktop } from './Desktop';

const { Sider, Content } = Layout;
export const RouterPage = () => {

    const { menuHidden } = useContext(UiContext)

    return (
    <Router>
        <Layout style={{ height: '100vh' }}>
            <Sider 
                collapsedWidth="0"
                breakpoint="md"
                hidden={ menuHidden }>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item
                        key="1" 
                        icon={ <UserOutlined />}>
                        <Link to="/signin">
                            Sign in
                        </Link>
                    </Menu.Item>
                    <Menu.Item 
                        key="2" 
                        icon={<VideoCameraOutlined />}>
                        <Link to="/queue">
                            Queue
                        </Link>
                    </Menu.Item>
                    <Menu.Item 
                        key="3" 
                        icon={<UploadOutlined />}>
                        <Link to="/create">
                            Create ticket
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">

                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    }}
                >
                    <Routes>
                        <Route 
                            path="/signin" 
                            element={ <Signin /> } />
                        <Route 
                            path="/queue" 
                            element={ <Queue /> } />
                        <Route 
                            path="/create" 
                            element={ <CreateTicket /> } />
                        <Route 
                            path="/desktop" 
                            element={ <Desktop /> } />
                        <Route path="*" element={ <Navigate to="/signin" /> } />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    </Router>
    )
}
