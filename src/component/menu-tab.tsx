import './menu-tab.less'

import { IMenuOutput } from "@/shared/menu/IMenu";
import { Link } from 'react-router-dom';
import { Menu } from "antd";
import React from "react";

const isShow = (_children: IMenuOutput[]) => {
  return _children && _children.length > 0;
}
interface IProp {
  menus: IMenuOutput[]
  defaultpath: any,

}
class Menus extends React.Component<IProp, any> {
  renderMenu = (data: IMenuOutput[]): any => {
    return data.map(item => {
      if (isShow(item.children)) {
        return <Menu.SubMenu key={item.id} title={item.name}>
          {this.renderMenu(item.children)}
        </Menu.SubMenu>
      }
      return item.isShow ? (<Menu.Item key={item.id} title={item.name}>
        <Link to={item.path}>{item.name}</Link>
      </Menu.Item>) : null
    })
  }
  componentWillMount() {
    const menuTreeNode: JSX.Element[] = this.renderMenu(this.props.menus);
    this.setState({
      menuTreeNode
    })
  }
  render() {
    return (
      <div>
        <Menu mode="inline" theme={"dark"} selectedKeys={[this.props.defaultpath]} >
          {this.state.menuTreeNode}
        </Menu>
      </div>

    )
  }
}
export default Menus;