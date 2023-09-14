import "./layout-header.less";

import { Avatar, Button, Dropdown, Layout, MenuProps, Popconfirm, Space, message } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import React, { useState } from "react";

const LayoutHeader = () => {
    const text = 'Are you sure to delete this task?';
    const description = 'Delete the task';
    const [collapsed, setCollapsed] = useState(false);
    const logout = () => {
        localStorage.removeItem("token");
    }
    return (
        <div>
            <Layout.Header className="luck-layout-header">
               {/* <Space> */}
                    {/* <Button ghost={true} type="primary" onClick={logout}>退出登录</Button> */}
                    <div className="sub-menu-fold">
                        <div>
                        {
                            collapsed === true ? (<MenuUnfoldOutlined />) : (<MenuFoldOutlined />)
                        }
                        </div>
                        
                    </div>
                    {/* <div className="avatar">
                        个人信息
                    </div> */}
                    {/* </Space> */}
            </Layout.Header>
        </div>
    )
};
export default LayoutHeader;