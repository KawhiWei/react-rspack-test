import {
  Button,
  Col,
  Empty,
  PaginationProps,
  Row,
  Spin,
  Table,
  Tag,
} from "antd";
import {
  PlusOutlined,
  RollbackOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import ConfigOperation from "./operation";
import ConfigRelease from "./configRelease";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 环境Id
   */
  environmentId: string;
}

const ConfigTablePage = (props: IProp) => {
  /**
   * 分页对象
   */
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  /**
   * 注入底层实现
   */
  const _environmentService: IEnvironmentService = useHookProvider(
    IocTypes.EnvironmentService
  );
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * 配置添加/修改组件
   */
  const [configOperationElement, setconfigOperationElement] =
    useState<any>(null);

  /**
   * 发布组件
   */
  const [configRelease, setConfigRelease] = useState<any>(null);

  /**
   * 分页信息定义
   */
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
      getConfigList();
    },
    onChange: (page: number, pageSize?: number) => {
      setPaginationConfig((Pagination) => {
        Pagination.current = page;
        if (pageSize) {
          Pagination.pageSize = pageSize;
        }
        return Pagination;
      });
      getConfigList();
    },
  };

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getConfigList();
  }, [paginationConfig]);

  /**
   * Table表格绑定数据
   */
  const [tableData, setTableData] = useState<Array<any>>([]);
  /**
   * table 列名
   */
  const columns = [
    {
      title: "唯一标识",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Value内容",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "分组",
      dataIndex: "group",
      key: "group",
      // : 100
    },
    {
      title: "是否公开",
      dataIndex: "isOpen",
      key: "id",
      render: (text: any, record: any) => {
        return (
          <div>
            {record.isOpen ? (
              <Tag color="cyan">是</Tag>
            ) : (
              <Tag color="orange">否</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "是否发布",
      dataIndex: "isPublish",
      key: "id",
      render: (text: any, record: any) => {
        return (
          <div>
            {record.isPublish ? (
              <Tag color="cyan">是</Tag>
            ) : (
              <Tag color="orange">否</Tag>
            )}
          </div>
        );
      },
    },
  ];
  /**
   * 获取环境列表信息
   */
  const getConfigList = () => {
    setLoading(true);
    let _param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
    };
    _environmentService
      .getConfigListForEnvironmentId(props.environmentId, _param)
      .then((rep) => {
        if (rep.success) {
          setPaginationConfig((Pagination) => {
            Pagination.total = rep.result.total;
            return Pagination;
          });
          setTableData(rep.result.data);
        }
      }).finally(()=>{
        setLoading(false);
      });
  };

  /**
   * 清除弹框
   */
  const claerConfigOperation = () => {
    setconfigOperationElement(null);
    getConfigList();
  };

  /**
   * 添加配置弹框
   */
  const addChangeConfig = () => {
    setconfigOperationElement(
      <ConfigOperation
        onCallbackEvent={claerConfigOperation}
        operationType={OperationTypeEnum.add}
        environmentId={props.environmentId}
      ></ConfigOperation>
    );
  };

  /**
   *
   */
  const publishConfig = () => {
    setConfigRelease(
      <ConfigRelease
        onCallbackEvent={claerConfigRelease}
        operationType={OperationTypeEnum.view}
        environmentId={props.environmentId}
      ></ConfigRelease>
    );
  };

  const claerConfigRelease = () => {
    setConfigRelease(null);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          <Col span="24" style={{ textAlign: "right" }}>
            <Button
              type="primary"
              shape="round"
              style={{ margin: "8px 8px" }}
              onClick={() => {
                addChangeConfig();
              }}
            >
              <PlusOutlined />
              添加
            </Button>
            <Button
              type="primary"
              shape="round"
              style={{ margin: "8px 8px " }}
              onClick={() => {
                publishConfig();
              }}
            >
              <SendOutlined rotate={-40} />
              发布
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={pagination}
                scroll={{ y: 600 }}
              />
            }
          </Col>
        </Row>
        {configOperationElement}
        {configRelease}
      </Spin>
    </div>
  );
};

export default ConfigTablePage;
