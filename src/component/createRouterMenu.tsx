import { IMenuOutput, IMenuRoute } from '@/shared/menu/IMenu';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Guid } from "guid-typescript";
import HomePage from "@/pages/home-page/home-page";
import LayoutView from "@/layout/layout-view";
import store from '@/store';

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

const router = createBrowserRouter([])
  
const CreateRouter = (props: any) => {

    const { config, location } = props;
    const { pathname } = location;

    const targetRouterConfig = config.find((item: IMenuRoute) => item.path === pathname);
    const token = localStorage.getItem("token");

    const handleRouters = (menu: IMenuOutput[]) => {
        let childRouter: IMenuRoute[] = [];
        menu.forEach((item) => {
            if (!!item.children && item.children.length) {
                childRouter = [...childRouter, ...handleRouters(item.children)];
            } else {
                const itemMenu: IMenuRoute = JSON.parse(JSON.stringify(item));
                const component = item.component;
                itemMenu.component = () => import(`@/${component}.tsx`);/* webpackChunkName: "[request]" */
                return childRouter.push(itemMenu)
            }
        })
        return childRouter
    }


    const filterMain = () => {
        const menu: IMenuOutput[] = store.getState().user.menu;
        const menus = handleRouters(menu);
        Main[0].children = [...Main[0].children, ...menus];
    }
    /**
     * 是否登录节点或者跟节点
     * @param _pathname 
     */
    const isLoginOrRootNode = (_pathname: string): boolean => {
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
            {isLoginOrRootNode(pathname) ? (isOneChildren() ? <RouterProvider router={router} /> : null) : null}
            
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
