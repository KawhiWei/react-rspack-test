import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  PaginationProps,
  Popover,
  Row,
  Space,
  Spin,
  message
} from "antd";
import {
  EllipsisOutlined,
  PlusOutlined,
  SyncOutlined
} from "@ant-design/icons";
import { IApplicationBaseDto, IApplicationOutputDto } from "@/domain/applications/application-dto";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "@/shared/ajax/request";
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const PipelineTemplatePage = () => {
  const history = useHistory();
  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const _projectService: IProjectService = useHookProvider(
    IocTypes.ProjectService
  );
  const [tableData, setTableData] = useState<Array<IApplicationBaseDto>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [subOperationElement, setOperationElement] = useState<any>(null);
  const [formData] = Form.useForm();
  const [projectArray, setProjectArray] = useState<Array<any>>([]);
  const [componentIntegrationArray, setComponentIntegrationArray] = useState<Array<any>>([]);



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

  const goToApplicationDashboard = (_appId: string) => {
    history.push({
      pathname: "/application/dashboard",
      state: {
        appId: _appId,
      },
    });
  };

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    getPageList();
  }, [paginationConfig]);

  const onSearch = () => {
    setPaginationConfig((Pagination) => {
      Pagination.current = 1;
      return Pagination;
    });
    getPageList();
  };

  /**
   * 修改任务
   * @param _id
   */
  const editRow = (_id: any) => {
    setOperationElement(
      <Operation
        componentIntegrationArray={componentIntegrationArray}
        onCallbackEvent={clearElement}
        operationType={OperationTypeEnum.edit}
        id={_id}
        projectArray={projectArray}
      />
    );
  };

  /**
   * 页面初始化获取数据
   */
  const getPageList = () => {
    setLoading(true);
    let param = formData.getFieldsValue();
    let _param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
      projectId: param.projectId,
      appId: param.appId,
      englishName: param.englishName,
      chineseName: param.chineseName,
      principal: param.principal,
      applicationState: param.applicationState,
    };
    _applicationService
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

  const clearElement = () => {
    setOperationElement(null);
    getPageList();
  };

  const deleteRow = (_id: string) => {
    _applicationService.delete(_id).then((res) => {
      if (!res.success) {
        message.error(res.errorMessage, 3);
      } else {
        getPageList();
      }
    });
  };

  const addChange = () => {
    setOperationElement(
      <Operation
        componentIntegrationArray={componentIntegrationArray}
        onCallbackEvent={clearElement}
        projectArray={projectArray}
        operationType={OperationTypeEnum.add}
      />
    );
  };

  return (
    <div >
      <Spin spinning={loading}>
        <Row style={{ marginBottom: "10px", backgroundColor: "white", height: "56px", padding: "0px 28px", }}>
          <Row>
            <Space align="center" >
              <SyncOutlined
                style={{ textAlign: "right", marginRight: 10, fontSize: 16 }}
                onClick={() => {
                  getPageList();
                }}
              />
              <Button
                style={{ float: "right" }}
                size="middle"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => addChange()}
              >
                创建应用
              </Button>
            </Space>
          </Row>
        </Row>
        <Row gutter={[12, 12]} style={{ padding: "0px 8px", }}>
          
        </Row>
        {subOperationElement}
      </Spin>
    </div>
  );
};
export default PipelineTemplatePage;
