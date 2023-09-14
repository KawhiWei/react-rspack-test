import {
  Button,
  Col,
  Form,
  Input,
  PaginationProps,
  Popconfirm,
  Row,
  Spin,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import ProjectOperation from "./operation";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ProjectPage = () => {
  const [subOperationElement, setOperationElement] = useState<any>(null);
  const _projectService: IProjectService = useHookProvider(
    IocTypes.ProjectService
  );
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<any>>([]);
  const [formData] = Form.useForm();

  /**
   * 枚举列表
   */
  const [projectStatusEnumArray, setProjectStatusEnumArray] = useState<
    Array<any>
  >([]);

  const columns = [
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "项目状态",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => {
        return (
          <div>
            <Tag color={projectStatusTag(record.projectStatus)}>
              {record.projectStatusName}
            </Tag>
            {/* <Tag color="blue">{record.projectStatusName}</Tag> */}
          </div>
        );
      },
    },
    {
      title: "负责人",
      dataIndex: "businessLine",
      key: "businessLine",
    },
    {
      title: "计划开始-结束时间",
      dataIndex: "id",
      key: "id",
      width: 240,
      render: (text: any, record: any) => {
        return (
          <div>
            {record.planStartTime}——
            {record.planEndTime ? record.planEndTime : "无限期"}
          </div>
        );
      },
    },
    {
      title: "工作完成度",
      dataIndex: "mainProductManager",
      key: "mainProductManager",
    },
    {
      title: "需求数量",
      dataIndex: "productAim",
      key: "productAim",
    },
    {
      title: "Bug数量",
      dataIndex: "productPrincipal",
      key: "productPrincipal",
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => {
        return (
          <div className="table-operation">
            <Tooltip placement="top" title="项目概览">
              <SettingOutlined
                style={{ color: "#108ee9", marginRight: 10, fontSize: 16 }}
                onClick={() => { }}
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

  const addChange = () => {
    setOperationElement(
      <ProjectOperation
        onCallbackEvent={clearElement}
        operationType={OperationTypeEnum.add}
        projectStatusEnumArray={projectStatusEnumArray}
      />
    );
  };

  /**
   * 清空弹框
   */
  const clearElement = () => {
    setOperationElement(null);
    getPageList();
  };

  /**
   * 处理标签
   * @param _projectStatus
   * @returns
   */
  const projectStatusTag = (_projectStatus: any): string => {
    switch (_projectStatus) {
      case "UnStart":
        return "blue";
      case "Actity":
        return "green";
      case "Suspended":
        return "warning";
      case "End":
        return "volcano";
      default:
        return "";
    }
  };
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getPageList();
    getEnumList();
  }, [paginationConfig]);

  const pagination: PaginationProps = {
    ...tacitPagingProps,
    total: paginationConfig.total,
    current: paginationConfig.current,
    pageSize: paginationConfig.pageSize,
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
   * 获取项目状态列表
   */
  const getEnumList = () => {
    _projectService.getEnumList().then((rep) => {
      if (rep.success) {
        setProjectStatusEnumArray(rep.result);
      }
    });
  };

  const onSearch = () => {
    setPaginationConfig((Pagination) => {
      Pagination.current = 1;
      return Pagination;
    });
    getPageList();
  };

  /**
   * 页面初始化获取数据
   */
  const getPageList = () => {
    setLoading(true);
    let param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
    };
    _projectService.getPage(param).then((rep) => {
      if (rep.success) {
        setPaginationConfig((Pagination) => {
          Pagination.total = rep.result.total;
          return Pagination;
        });
        rep.result.data.map((item: any, index: number) => {
          item.key = item.id;
          return item;
        });
        setTableData(rep.result.data);
        setLoading(false);
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  const deleteRow = (_id: string) => {
    _projectService.delete(_id).then((res) => {
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
              <Form.Item name="name" label="项目名称：">
                <Input
                  style={{ borderRadius: 8 }}
                  placeholder="请请输入项目名称"
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
              size="small"
            />
          </Col>
        </Row>
        {subOperationElement}
      </Spin>
    </div>
  );
};

export default ProjectPage;
