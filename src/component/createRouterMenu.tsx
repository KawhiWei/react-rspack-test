import { IMenuOutput, IMenuRoute } from '@/shared/menu/IMenu';
import { Route, useNavigate } from 'react-router-dom'

import { Guid } from "guid-typescript";
import HomePage from "@/pages/home-page/home-page";
import LayoutView from "@/layout/layout-view";
import { USER_MENU } from '@/store/actionType';
import { message } from 'antd';
import store from '@/store';
import { useEffect } from 'react';

const Main: IMenuRoute[] = [
    {
        id: Guid.EMPTY,
        name: "layout",
        path: "/",
        component: LayoutView,
        isShow: false,
        children: [
            {
                id: Guid.create().toString(),
                name: "主页",
                path: "/home",
                component: HomePage,
                isShow: true,
                exact: true,
                children: [],
            }
        ]
    }
]

const CreateRouter = (props: any) => {

    const token = localStorage.getItem("token");
    const { config, location } = props;
    const { pathname } = location;


    const getMenus = async () => {
        try {
            // let res = await this.menus.getMenus();
            // if (res.success) {
            // this.menus.setMenus(res.data);
            store.dispatch({
                type: USER_MENU,
                // data: this.menus.menusByShow
                data: require("@/constans/menu").menuList
            })
            // message.success(res.message);
            // } else {
            //   message.error(res.message);
            // }

        } catch (error: any) {
            message.error(error);
        }
    }

    Route
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        let navigate = useNavigate();
        if (!!token) {
            getMenus();
            if (isNotLoginOrRootNode(pathname)) {
                if (isOneChildren()) {
                    navigate('/home');
                }
            }
        }





    });

    /**
     * 是否登录节点或者跟节点
     * @param _pathname 
     */
    const isNotLoginOrRootNode = (_pathname: string): boolean => {
        return (pathname === "/login" || pathname === "/")
    }



    /**
     * 是否仅有一个节点
     */
    const isOneChildren = (): boolean => {
        return Main[0].children.length === 1
    }


    return (
        <div>
            {/* {isNotLoginOrRootNode(pathname) ? (isOneChildren() ? <RouterProvider router={router} /> : null) : null} */}

        </div>

    )
}

export default CreateRouter;

// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Page1 from './pages/page1'
// import Page2 from './pages/page2'
// import Page3 from './pages/page3'

// const router = createBrowserRouter([{
//   path: '/page1',
//   Component: Page1,
// }, {
//   path: '/page2',
//   Component: Page2,
// }, {
//   path: '/page3',
//   Component: Page3,
// }])

// function App() {
//   return (
//     <RouterProvider router={router} />
//   )
// }

// export default App
