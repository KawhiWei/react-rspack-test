import { Route, useNavigate } from 'react-router-dom';

import { USER_MENU } from '@/store/actionType';
import { message } from 'antd';
import store from '@/store';
import { useEffect } from 'react';

export const CreateRouter = (props: any) => {

    const token = localStorage.getItem("token");
    const { config, location } = props;
    const { pathname } = location;


    const getMenus = async () => {
        try {
            // let res = await this.menus.getMenus();
            // if (res.success) {
            // this.menus.setMenus(res.data);
            await store.dispatch({
                type: USER_MENU,
                // data: this.menus.menusByShow
                data: require("@/constans/menu").menuList
            });
            // message.success(res.message);
            // } else {
            //   message.error(res.message);
            // }
        } catch (error: any) {
            message.error(error);
        }
    };

    Route;
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
        return (pathname === "/login" || pathname === "/");
    };



    /**
     * 是否仅有一个节点
     */
    const isOneChildren = (): boolean => {
        return Main[0].children.length === 1;
    };


    return (
        <div>
            {/* {isNotLoginOrRootNode(pathname) ? (isOneChildren() ? <RouterProvider router={router} /> : null) : null} */}

        </div>

    );
};
