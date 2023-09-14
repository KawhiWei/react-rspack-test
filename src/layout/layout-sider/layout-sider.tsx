import './layout-sider.less'

import React, { useState } from 'react';

import { IMenuOutput } from '@/shared/menu/IMenu';
import { Layout } from 'antd';
import Menus from "@/component/menu-tab";

const LayoutSider = (props: { menus: IMenuOutput[],defaultpath:any }) => {

  const [collapsed, setCollapsed] = useState<boolean>(false)
  
  const onCollapse = () => {
    collapsed?setCollapsed(false):setCollapsed(true);
  };
  
  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed} width={246}>
      <div  className="logo">核桃PaaS平台</div>
      <Menus defaultpath={props.defaultpath} menus={props.menus} />
    </Layout.Sider>
  )
}
export default LayoutSider;