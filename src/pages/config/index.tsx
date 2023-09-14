import { Button, Card, Col, Row, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";

import ConfigTable from "./configtable-page";
import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { RollbackOutlined } from "@ant-design/icons";
import { initPaginationConfig } from "../../shared/ajax/request";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ConfigPage = (props: any) => {
  const history = useHistory();
  const _environmentService: IEnvironmentService = useHookProvider(
    IocTypes.EnvironmentService
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [environmentList, setEnvironmentList] = useState<Array<any>>([]);
  const [appId, setAppId] = useState<string>();
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    
  },[appId]);



  /**
   * 跳转到配置中心
   * @param _appId
   */
  const backToApplicationList = () => {
    history.push({
      pathname: "/application/list",
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          <Col span="24">
            <Card
              title="配置管理"
              extra={
                <Button
                  shape="round"
                  style={{ margin: "8px 8px " }}
                  onClick={() => {
                    backToApplicationList();
                  }}
                >
                  <RollbackOutlined />
                  返回上一层
                </Button>
              }
            >
              <Tabs
                defaultActiveKey="1"
                items={environmentList.map((x) => {
                  return {
                    label: x.environmentName,
                    key: x.id,
                    children: <ConfigTable environmentId={x.id} />,
                  };
                })}
              ></Tabs>
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};
export default ConfigPage;
