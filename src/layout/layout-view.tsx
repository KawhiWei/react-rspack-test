import "./layout-view.less";

import { BrowserRouter, Route } from 'react-router-dom';

import ConfigProviderApp from "@/ConfigProvider";
import { IMenuRoute } from '@/shared//menu/IMenu';
import { Layout } from 'antd';
import LayoutSider from "./layout-sider/layout-sider";
import Layoutheader from './layout-header/layout-header';
import React from 'react'
import Test from "@/pages/test-page/test-page"
import { menuList } from "@/constans/menu";
import { renderRoutes } from 'react-router-config';
import { useState } from 'react';

interface IProp {
    route: IMenuRoute;
    location: any;
}

const LayoutView = (props: IProp) => {
    const [routes] = useState(props.route.children);
    return (

        <Layout className="luck-layout">
            <BrowserRouter>

                <LayoutSider menus={menuList} defaultpath="/home" />
                <Layout>
                    <Layoutheader />
                    <Layout.Content className="luck-layout-content"  >
                        {renderRoutes(routes)}
                    </Layout.Content>
                    {/* <Layout.Footer className="luck-layout-footer">VV大佬盛情出品</Layout.Footer> */}
                </Layout>

            </BrowserRouter>

        </Layout>

    )
}
export default LayoutView;
