import { Card, Col, PageHeader, Row, Spin, Tabs, Tag, Timeline } from "antd";
import { useEffect, useState } from "react";

import DeploymentConfigurationPage from "@/pages/wke/kubernetes/workload-page";
import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IApplicationPipelineService } from "@/domain/application-pipelines/iapplication-pipeline-service";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "@/shared/config/ioc-types";
import PipelinePage from "../application-pipeline-page/index";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

/**
 * 应用看板
 * @returns
 */
const ApplicationDashboard = (props: any) => {
  const [defaultActiveKey, setDefaultActiveKey] = useState<string>("1");
  const history = useHistory();

  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const _applicationPipelineService: IApplicationPipelineService = useHookProvider(
    IocTypes.ApplicationPipelineService
  );

  const [appId, setAppId] = useState<string>("");
  const [appLoading, setAppLoading] = useState<boolean>(false);
  const [pipeLineHistoryLoading, setPipeLineHistoryLoading] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState<IApplicationBaseDto>();
  const [pipeLineHistoryArray, setPipeLineHistoryArray] = useState<Array<any>>([]);
  const Load = () => {
    if (props.location.state && props.location.state.appId) {
      setAppId(props.location.state.appId);
      onGetApplication(props.location.state.appId)
      onGetLatelyPipeLineHistoryList(props.location.state.appId)
    } else {
      backToApplicationList();
    }
  };
  useEffect(() => {
    Load();
  }, []);

  /**
   * 
   * @param _appId 
   */
  const onGetApplication = (_appId: string) => {

    setAppLoading(true);
    _applicationService
      .getApplicationDashboardDetail(_appId)
      .then((rep) => {
        if (rep.success) {
          setApplicationData(rep.result.application);
        }
      })
      .finally(() => {
        setAppLoading(false);
      });
    if (props.location.state.defaultActiveKey) {
      setDefaultActiveKey(props.location.state.defaultActiveKey);
    }


  }

  /**
   * 获取最近的10构建记录
   * @param _appId 
   */
  const onGetLatelyPipeLineHistoryList = (_appId: string) => {

    setPipeLineHistoryLoading(true);

    let _param = {
      pageSize: 10,
      pageIndex: 1,
    };
    _applicationPipelineService
      .getPipeLineHistoryForAppIdPageList(_appId, _param)
      .then((rep) => {
        if (rep.success) {
          console.log(rep.result.data)
          setPipeLineHistoryArray(rep.result.data)
        }
      })
      .finally(() => {
        setPipeLineHistoryLoading(false);
      });
    if (props.location.state.defaultActiveKey) {
      setDefaultActiveKey(props.location.state.defaultActiveKey);
    }


  }
  /**
   * 跳转到应用列表
   * @param _appId
   */
  const backToApplicationList = () => {
    history.push({
      pathname: "/application/list",
    });
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => backToApplicationList()}
        title={appId}
        subTitle={applicationData?.describe}
      />
      <Tabs
        tabPosition="left"
        size="small"
        defaultActiveKey={defaultActiveKey}
        items={[
          {
            label: `基础信息`,
            key: "1",
            children: (
              <div>
                <Row gutter={8} style={{ height: "365px" }}>
                  <Col span={10}>
                    <Spin spinning={appLoading}>
                      <Card size="small" title="应用简介" style={{ overflowY: 'auto', height: "365px" }}>
                        <p><Tag>管理人员</Tag>{applicationData?.describe}</p>
                        <p><Tag>应用名称</Tag>{applicationData?.name}</p>
                        <p><Tag>Git地址</Tag>{applicationData?.gitUrl}</p>
                        <p><Tag>应用描述</Tag>{applicationData?.describe}</p>
                      </Card>
                    </Spin>
                  </Col>
                  <Col span={14}>
                    <Spin spinning={pipeLineHistoryLoading}>
                      <Card size="small" title="构建计划" style={{ height: "365px" }}>
                        <div style={{ overflow: 'auto', paddingTop: "10px", height: "300px" }}>
                          <Timeline>
                            {
                              pipeLineHistoryArray.map((item: any) => {
                                let color = "blue";
                                switch (item.pipelineBuildState) {
                                  case 0:
                                    color = "gray";
                                    break;
                                  case 1:
                                    color = "blue";
                                    break;
                                  case 2:
                                    color = "green";
                                    break;
                                  case 3:
                                    color = "red";
                                    break;
                                  default:
                                    color = "red";
                                    break;
                                }
                                return (
                                  <Timeline.Item color={color}>
                                    <p><Tag>Toyar</Tag>在{item.creationTime}触发了CI流水线；镜像版本<Tag>{item.imageVersion}</Tag>{item.pipelineBuildStateName}</p>
                                  </Timeline.Item>
                                )
                              })
                            }
                          </Timeline>
                        </div>
                      </Card>
                    </Spin>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Card size="small" title="应用监控" style={{ marginTop: "8px" }}>

                    </Card>
                  </Col>

                </Row>
              </div>
            ),
          },
          {
            label: `持续集成`,
            key: "2",
            children: <PipelinePage appId={appId} />,
          },
          {
            label: `持续部署`,
            key: "3",
            children: <DeploymentConfigurationPage appId={appId} />,
          },
          {
            label: `服务发现`,
            key: "4",
            children: (
            <div>
              服务发现界面
            </div>
            ),
          },
        ]}></Tabs>
    </div>
  );
};
export default ApplicationDashboard;
