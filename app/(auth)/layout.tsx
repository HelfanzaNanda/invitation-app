"use client"
import React from 'react';
import { DiffOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import SiderCommom from './SiderCommon';
import HeaderCommon from './HeaderCommon';

const { Header, Content } = Layout;



export default function RootLayout({ children, }: { children: React.ReactNode; }) {
    const [collapsed, setCollapsed] = React.useState(false);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    return (
        <Layout>
            <SiderCommom collapsed={collapsed} />
            <Layout>
                <HeaderCommon collapsed={collapsed} colorBgContainer={colorBgContainer} setCollapsed={setCollapsed} />
                <Content className='!min-h-[calc(100vh-112px)]' style={{ margin: '24px 16px', padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, }} >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}