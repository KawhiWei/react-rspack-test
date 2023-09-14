import 'antd/dist/antd.css';

import { ConfigProvider } from "antd";
import Router from "../src/router/index";

/**
 * 全局屬性設置
 * @returns
 */
const ConfigProviderApp = (props: any) => {

    return (
        <ConfigProvider componentSize="middle">
            <Router />
        </ConfigProvider>
    );
};
export default ConfigProviderApp;
