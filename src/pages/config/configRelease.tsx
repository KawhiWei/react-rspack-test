import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  PaginationProps,
  Row,
  Table,
  Tag,
  message,
} from "antd";
import { initPaginationConfig, tacitPagingProps } from "@/shared/ajax/request";
import { useEffect, useState } from "react";

import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import {
  SearchOutlined,
} from "@ant-design/icons";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;
  /**
   * Id
   */
  id?: string;
  /**
   * 操作类型
   */
  operationType: OperationTypeEnum;
  /**
   * 环境id
   */
  environmentId: string;
}

const ConfigRelease = (props: IProp) => {
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const _environmentService: IEnvironmentService = useHookProvider(
    IocTypes.EnvironmentService
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [tableData, setTableData] = useState<Array<any>>([]);
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
        Pagination.current = current;
        Pagination.pageSize = pageSize;
        return Pagination;
      });
      getTable();
    },
    onChange: (page: number, pageSize?: number) => {
      setPaginationConfig((Pagination) => {
        Pagination.current = page;
        if (pageSize) {
          Pagination.pageSize = pageSize;
        }
        return Pagination;
      });
      getTable();
    },
  };
  const columns = [
    {
      title: "配置项key",
      dataIndex: "key",
      key: "key",
      // : 100
    },
    {
      title: "配置项Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "配置项类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "组",
      dataIndex: "group",
      key: "group",
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

  useEffect(() => {
    onGetLoad();
  }, []);

  const onGetLoad = () => {
    editOperationState(true, "发布配置");
    getTable();
  };

  /**
   * 获取数据
   */
  const getTable = () => {

    setLoading(true);
    let param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
    };
    props.environmentId &&
      _environmentService
        .getConfigRelease(props.environmentId, param)
        .then((x) => {
          if (x.success) {
            setPaginationConfig((Pagination) => {
              Pagination.total = x.result.total;
              return Pagination;
            });
            setTableData(x.result.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  /**
   * 弹框取消
   */
  const onCancel = () => {
    editOperationState(false);
    props.onCallbackEvent && props.onCallbackEvent();
  };

  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const release = () => {
    setLoading(true);
    let param: Array<string> = [];
    
    selectedRowKeys.forEach(key => {
      param.push(key.toString());
      return key;
    });
    props.environmentId &&
      _environmentService
        .releasePublish(props.environmentId, param)
        .then((rep) => {
          if (!rep.success) {
            message.error(rep.errorMessage, 3);
          } else {
            message.success("发布成功");
            props.onCallbackEvent && props.onCallbackEvent();
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <div>
      <Modal
        width={1000}
        title={operationState.title}
        open={operationState.visible}
        closable={false}
        onCancel={onCancel}
        getContainer={false}
        footer={
          <Row>
            <Col span="24" style={{ textAlign: "right" }}>
              <Button
                type="primary"
                shape="round"
                style={{ margin: "8px 8px " }}
                onClick={() => {
                  release();
                }}
              >
                发布配置
              </Button>
              <Button
                type="primary"
                shape="round"
                style={{ margin: "8px 8px " }}
                onClick={() => {
                  onCancel();
                }}
              >
                取消
              </Button>
            </Col>
          </Row>
        }
      >
        <Row style={{ margin: "8px" }}>
          <Col span={"24"}>
            <Form layout="inline" name="horizontal_login">
              <Form.Item name="environmentName">
                <Input style={{ borderRadius: 8 }} placeholder="查找key" />
              </Form.Item>
              <Button type="primary" shape="round" htmlType="submit">
                <SearchOutlined />
                查询
              </Button>
            </Form>
          </Col>
        </Row>
        <Row style={{ margin: "8px" }}>
          <Col span={"24"}>
            <Table
              columns={columns}
              dataSource={tableData}
              loading={loading}
              pagination={pagination}
              rowSelection={rowSelection}
              rowKey={"id"}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default ConfigRelease;
