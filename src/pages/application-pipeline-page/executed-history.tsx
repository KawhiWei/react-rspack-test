import { Col, Drawer, PaginationProps, Row, Table, Tag } from "antd";
import {
  EditOutlined,
  EyeOutlined,
  FileSearchOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingTwoTone,
  WarningOutlined,
} from "@ant-design/icons";
import { initPaginationConfig, tacitPagingProps } from "@/shared/ajax/request";
import { useEffect, useState } from "react";

import BuildLogs from "./build-log";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplication-pipeline-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { PipelineBuildStateEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 阶段信息
   */
  id: string;

  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;
}

const ExecutedHistory = (props: IProp) => {
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });
  const [subBuildLogsElement, setBuildLogsElement] = useState<any>(null);
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<any>>([]);
  const columns = [
    {
      title: "Number",
      dataIndex: "jenkinsBuildNumber",
      key: "jenkinsBuildNumber",
    },
    {
      title: "镜像版本",
      dataIndex: "imageVersion",
      key: "imageVersion",
      width: 210,
    },
    {
      title: "执行结果",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => {
        return (
          <div>
            <Tag
              style={{ textAlign: "center" }}
              color={onPipelineBuildStateTag(record.pipelineBuildState)}
            >
              {record.pipelineBuildStateName}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "操作",
      key: "id",
      fixed: false,
      render: (text: any, record: any) => {
        return (
          <div>
            <FileSearchOutlined
              onClick={() => {
                onShowLog(record.applicationPipelineId, record.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  const pagination: PaginationProps = {
    ...tacitPagingProps,
    total: paginationConfig.total,
    current: paginationConfig.current,
    pageSize: paginationConfig.pageSize,
    showTotal: (total) => {
      return `共 ${total} 条`;
    },
    onShowSizeChange: (current: number, pageSize: number) => {
      setPaginationConfig((Pagination) => {
        Pagination.pageSize = pageSize;
        Pagination.current = current;
        return Pagination;
      });
      getPageList();
    },
    onChange: (page: number, pageSize?: number) => {
      setPaginationConfig((Pagination) => {
        Pagination.current = page;
        if (pageSize) {
          Pagination.pageSize = pageSize;
        }
        return Pagination;
      });
      getPageList();
    },
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
   * 页面初始化获取数据
   */
  const getPageList = () => {
    let _param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
    };
    _applicationPipelineService
      .getPipeLineHistoryForPipeLineIdPageList(props.id, _param)
      .then((rep) => {
        if (rep.success) {
          setPaginationConfig((Pagination) => {
            Pagination.total = rep.result.total;
            return Pagination;
          });
          setTableData(rep.result.data);
        }
      })
      .finally(() => {
        editOperationState(true);
        setLoading(false);
      });
  };

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onLoad();
  }, []);

  /**
   * 编辑获取一个表单
   * @param _id
   */
  const onLoad = () => {
    getPageList();
  };

  /**
   * 页面初始化获取数据
   */
  const onShowLog = (_applicationPipelineId: string, _id: string) => {
    setBuildLogsElement(
      <BuildLogs
        id={_id}
        applicationPipelineId={_applicationPipelineId}
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
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
    if (!_visible) {
      props.onCallbackEvent && props.onCallbackEvent();
    }
  };
  return (
    <div>
      <Drawer
        title="构建历史"
        width={600}
        placement="right"
        maskClosable={false}
        onClose={() => editOperationState(false)}
        open={operationState.visible}
      >
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={pagination}
              scroll={{ y: 700 }}
            />
          </Col>
        </Row>
        {subBuildLogsElement}
      </Drawer>
    </div>
  );
};

export default ExecutedHistory;
