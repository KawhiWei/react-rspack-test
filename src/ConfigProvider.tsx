import { ConfigProvider } from "antd";
import Router from "../src/router/index";

/**
 * 全局屬性設置
 * @returns
 */
const ConfigProviderApp = () => {

    return (
        <ConfigProvider componentSize="middle">
            <Router />
        </ConfigProvider>
    );
};
export default ConfigProviderApp;
