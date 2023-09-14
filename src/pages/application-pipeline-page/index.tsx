import "../search-panel.less"

import { Button, Card, Col, Empty, Row, Space, Spin, Tag, message } from "antd";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  SyncOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import BuildLogs from "./build-log";
import ExecutedHistory from "./executed-history";
import {
  IApplicationPipelineOutputDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplication-pipeline-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { PipelineBuildStateEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import { initPaginationConfig } from "../../shared/ajax/request";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 应用Id
   */
  appId: string;


}

/***
 * 应用流水线设计
 */
const PipelinePage = (props: IProp) => {
  const history = useHistory();
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);

  const [subOperationElement, setOperationElement] = useState<any>(null);
  const [applicationPipelineBasicElement, setApplicationPipelineBasicElement] = useState<any>(null);

  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<
    Array<IApplicationPipelineOutputDto>
  >([]);
  const [appId, setAppId] = useState<string>();

  const [subBuildLogsElement, setBuildLogsElement] = useState<any>(null);

  const [subExecutedHistoryElement, setExecutedHistoryElement] =
    useState<any>(null);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    if (props.appId) {
      props.appId && setAppId(props.appId);
      getPageList();
    }
  }, [appId]);

  /**
   * 执行一次任务
   */
  const onExecuteJob = (_data: IApplicationPipelineOutputDto) => {
    if (_data.pipelineBuildState === PipelineBuildStateEnum.running) {
      message.error("有正在运行的任务，请等待运行完成在执行新的任务", 3);
      return;
    }

    _applicationPipelineService
      .executeJob(_data.id)
      .then((rep) => {
        if (rep.success) {
          message.success("任务下发成功", 3);
        } else {
          message.error(rep.errorMessage, 3);
        }
      })
      .finally(() => {
        getPageList();
      });
  };

  /**
   * 执行一次任务
   */
  const onDelete = (_id: string) => {
    _applicationPipelineService
      .delete(_id)
      .then((rep) => {
        if (rep.success) {
          message.success("删除成功", 3);
        } else {
          message.success(rep.errorMessage, 3);
        }
      })
      .finally(() => {
        getPageList();
      });
  };

  /**
   * 执行一次任务
   */
  const onPublish = (_id: string) => {
    _applicationPipelineService
      .publish(_id)
      .then((rep) => {
        if (rep.success) {
          message.success("发布成功", 3);
        } else {
          message.success(rep.errorMessage, 3);
        }
      })
      .finally(() => {
        getPageList();
      });
  };

  /**
   * 页面初始化获取数据
   */
  const getPageList = () => {
    setLoading(true);
    let _param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
    };
    props.appId &&
      _applicationPipelineService
        .getPage(props.appId, _param)
        .then((rep) => {
          if (rep.success) {
            setTableData(rep.result.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  /**
   * 页面初始化获取数据
   */
  const onShowLog = (_appId: string, _id: string) => {
    setBuildLogsElement(
      <BuildLogs
        id={_id}
        applicationPipelineId={_appId}
        onCallbackEvent={onShowLogClear}
      ></BuildLogs>
    );
  };

  /**
   * 页面初始化获取数据
   */
  const onShowLogClear = () => {
    setBuildLogsElement(null);
  };

  /**
   * 页面初始化获取数据
   */
  const onShowExecutedHistory = (_id: string) => {
    setBuildLogsElement(null);
    setExecutedHistoryElement(
      <ExecutedHistory
        id={_id}
        onCallbackEvent={onExecutedHistoryClear}
      ></ExecutedHistory>
    );
  };
  /**
   * 处理标签
   * @param _projectStatus
   * @returns
   */
  const onPipelineBuildStateTag = (
    _pipelineBuildState: PipelineBuildStateEnum
  ): string => {
    switch (_pipelineBuildState) {
      case PipelineBuildStateEnum.ready:
        return "cyan";
      case PipelineBuildStateEnum.running:
        return "processing";
      case PipelineBuildStateEnum.success:
        return "success";
      case PipelineBuildStateEnum.fail:
        return "error";
      default:
        return "";
    }
  };

  /**
   * 页面清空日志组件
   */
  const onExecutedHistoryClear = () => {
    setExecutedHistoryElement(null);
  };

  /**
    * 清空流水线基础配置抽屉组件
    */
  const clearApplicationPipelineBasicOperation = () => {
    setApplicationPipelineBasicElement(null);
  };

  /**
   * 添加流水线显示抽屉
   */
  const showApplicationPipelineBasicOperation = () => {
    setApplicationPipelineBasicElement(
      <Operation
        appId={props.appId}
        onConfirmCallbackEvent={ConfirmCallbackEvent}
        onCancelCallbackEvent={clearApplicationPipelineBasicOperation}
        operationType={OperationTypeEnum.add}
      />
    );

  };

  /**
   * 流水线编辑事件
   * @param _id 
   */
  const onEdit = (_id: string) => {
    gotoPipelineConfig(_id)
  }

  /**
   * 抽屉确认回调事件，判断是否需要前往流水线配置界面
   * @param _isGotoPipelineConfig 
   * @param _id 
   */
  const ConfirmCallbackEvent = (_isGotoPipelineConfig: boolean, _id: string) => {
    if (_isGotoPipelineConfig) {
      gotoPipelineConfig(_id)
    }
    else {
      clearApplicationPipelineBasicOperation();
      getPageList();
    }

  }


  /**
   * 是否前往流水线配置
   */
  const gotoPipelineConfig = (_id: string) => {
    history.push({
      pathname: "/application/pipeline/flow/config",
      state: {
        id: _id,
      },
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Row className="search-panel">
          <Row className="search-button">
            <SyncOutlined
              style={{ textAlign: "right", marginRight: 10, fontSize: 16 }}
              onClick={() => {
                getPageList();
              }} />
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                showApplicationPipelineBasicOperation();
              }}>
              创建构建计划
            </Button>

          </Row>

        </Row>

        {
          tableData.length === 0 ? <Empty /> :
            <Row gutter={[16, 16]}>
              {tableData.map((item) => {
                return (
                  <Col span={4}>
                    <Card
                      title={item.name}
                      actions={[

                        <PlayCircleOutlined
                          style={{
                            fontSize: 20,
                          }}
                          onClick={() => onExecuteJob(item)}
                        />,
                        <CloudUploadOutlined
                          key="setting"
                          style={{
                            color: "#2db7f5",
                            fontSize: 20,
                          }}
                          onClick={() => onPublish(item.id)}
                        />,
                        <EditOutlined
                          style={{
                            color: "orange",
                            fontSize: 20,
                          }}
                          onClick={() => onEdit(item.id)}
                        />,
                        <HistoryOutlined
                          onClick={() => onShowExecutedHistory(item.id)}
                        />,



                        <DeleteOutlined
                          style={{
                            color: "red",
                            fontSize: 20,
                          }}
                          onClick={() => onDelete(item.id)}
                        />,
                      ]}
                    >
                      <Row style={{ marginBottom: 10 }}>
                        <Col span="24">
                          最近任务：
                          <Tag
                            style={{ textAlign: "center" }}
                            color={onPipelineBuildStateTag(item.pipelineBuildState)}
                            onClick={() => {
                              onShowLog(
                                item.id,
                                item.lastApplicationPipelineExecutedRecordId
                              );
                            }}
                          >
                            {item.jenkinsBuildNumber}
                          </Tag>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        <Col span="24">
                          是否发布：
                          {item.published ? (
                            <Tag style={{ textAlign: "center" }} color="processing">
                              已发布
                            </Tag>
                          ) : (
                            <Tag style={{ textAlign: "center" }} color="gold">
                              未发布
                            </Tag>
                          )}
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
        }
        {subBuildLogsElement}
        {subExecutedHistoryElement}
        {subOperationElement}
        {applicationPipelineBasicElement}
      </Spin>
    </div>
  );
};
export default PipelinePage;
