import {
  Button,
  Col,
  Form,
  Input,
  PaginationProps,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
  Tooltip,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingTwoTone,
  WarningOutlined,
} from "@ant-design/icons";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { ComponentTypeMap } from "@/domain/maps/componentintegration-map";
import { IComponentIntegrationService } from "@/domain/componentintegration/icomponentintegration-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ComponentIntegrationPage = () => {
  const _componentIntegrationService: IComponentIntegrationService =
    useHookProvider(IocTypes.ComponentIntegrationService);

  const [loading, setLoading] = useState<boolean>(false);

  const [formData] = Form.useForm();
  /**
   * 配置添加/修改组件
   */
  const [OperationElement, setOperationElement] = useState<any>(null);


  const addChange = () => {
    setOperationElement(
      <Operation
        onCallbackEvent={clearElement}
        operationType={OperationTypeEnum.add}
      />
    );
  };

  const clearElement = () => {
    setOperationElement(null);
    getPageList();
  };

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
   * 页面初始化事件
   */
  useEffect(() => {
    getPageList();
  }, [paginationConfig]);

  /**
   * 页面初始化获取数据
   */
  const getPageList = () => {
    setLoading(true);
    let param = formData.getFieldsValue();
    let _param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
      componentLinkType: param.componentLinkType,
      name: param.name,
    };

    _componentIntegrationService
      .getPage(_param)
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
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "集成组件类型",
      dataIndex: "componentLinkTypeName",
      key: "componentLinkTypeName",
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => {
        return (
          <div className="table-operation">
            <Tooltip placement="top" title="编辑">
              <EditOutlined
                style={{ color: "orange", marginRight: 10, fontSize: 16 }}
                onClick={() => editRow(record.id)}
              />
            </Tooltip>
            <Tooltip placement="top" title="删除">
              <Popconfirm
                placement="top"
                title="确认删除?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => deleteRow(record.id)}
                icon={<WarningOutlined />}
              >
                <DeleteOutlined style={{ color: "red", fontSize: 16 }} />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  /**
   * 修改组件配置
   * @param _id
   */
  const editRow = (_id: any) => {
    setOperationElement(
      <Operation
        onCallbackEvent={clearElement}
        operationType={OperationTypeEnum.edit}
        id={_id}
      />
    );
  };

  const onSearch = () => {
    setPaginationConfig((Pagination) => {
      Pagination.current = 1;
      return Pagination;
    });
    getPageList();
  };

  const deleteRow = (_id: string) => {
    _componentIntegrationService.delete(_id).then((res) => {
      if (!res.success) {
        message.error(res.errorMessage, 3);
      } else {
        getPageList();
      }
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Form
          form={formData}
          name="horizontal_login"
          layout="horizontal"
          {...searchFormItemDoubleRankLayout}
          onFinish={onSearch}
        >
          <Row>
            <Col span="6">
              <Form.Item name="componentType" label="组件类型：">
                <Select allowClear={true} placeholder="请选择组件类型">
                  {ComponentTypeMap.map((item: any) => {
                    return (
                      <Select.Option value={item.key}>
                        {item.value}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span="6">
              <Form.Item name="name" label="集成名称：">
                <Input
                  style={{ borderRadius: 8 }}
                  placeholder="请请输入集成名称"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="6" style={{ textAlign: "center" }}>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                onClick={() => {
                  getPageList();
                }}
              >
                <SearchOutlined />
                查询
              </Button>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col span="24" style={{ textAlign: "right" }}>
            <Button
              shape="round"
              type="primary"
              style={{ margin: "8px 8px" }}
              onClick={() => {
                addChange();
              }}
            >
              <PlusOutlined />
              添加
            </Button>
          </Col>
        </Row>
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
        {OperationElement}
      </Spin>
    </div>
  );
};

export default ComponentIntegrationPage;
