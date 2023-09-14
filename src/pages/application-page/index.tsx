import "../table.less";
import "./index.less";
import "../search-panel.less"

import {
  Avatar,
  Button,
  Col,
  Empty,
  Form,
  PaginationProps,
  Row,
  Spin,
  Tooltip,
  message
} from "antd";
import {
  BranchesOutlined,
  CameraOutlined,
  EditOutlined,
  PartitionOutlined,
  PlusOutlined,
  SyncOutlined
} from "@ant-design/icons";
import {
  initPaginationConfig,
  tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { IApplicationOutputDto } from "@/domain/applications/application-dto";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ApplicationPage = () => {
  const history = useHistory();
  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );

  const [tableData, setTableData] = useState<Array<IApplicationOutputDto>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [subOperationElement, setOperationElement] = useState<any>(null);
  const [formData] = Form.useForm();


  const PandaSvg = () => (
    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1590" width="200" height="200">
      <path d="M64.76828 577.792279a129.151919 129.151919 0 0 1 127.67992-109.695932h636.287602a43.199973 43.199973 0 0 0 43.199973-43.199973V256.06448a43.199973 43.199973 0 0 0-43.199973-43.199973H414.848061a175.93589 175.93589 0 0 1-171.967893 137.727914 175.67989 175.67989 0 0 1-175.99989-175.295891A175.67989 175.67989 0 0 1 242.880168 0.00064a175.99989 175.99989 0 0 1 169.215894 126.911921h416.63974c71.295955 0 129.151919 57.855964 129.151919 129.151919v168.831894a129.151919 129.151919 0 0 1-129.151919 129.15192H192.4482a43.199973 43.199973 0 0 0-43.199973 43.199973V768.00016c0 23.871985 19.391988 43.199973 43.199973 43.199973h413.951741a175.93589 175.93589 0 0 1 171.903893-137.727914 175.67989 175.67989 0 0 1 175.99989 175.295891A175.67989 175.67989 0 0 1 778.303834 1024a175.99989 175.99989 0 0 1-169.215895-126.911921h-416.639739A129.151919 129.151919 0 0 1 63.36028 767.93616V597.248267c0-6.591996 0.448-13.119992 1.408-19.455988z m178.111888-316.799802c47.80797 0 86.399946-38.399976 86.399946-85.695947 0-47.23197-38.591976-85.695946-86.399946-85.695946-47.80797 0-86.399946 38.399976-86.399946 85.695946 0 47.23197 38.591976 85.695946 86.399946 85.695947z m535.423666 502.015686c-47.74397 0-86.399946 38.399976-86.399946 85.695947 0 47.23197 38.655976 85.695946 86.399946 85.695946 47.80797 0 86.399946-38.399976 86.399946-85.695946 0-47.23197-38.591976-85.695946-86.399946-85.695947z" fill="#979797" p-id="1591">
      </path>
    </svg>
  );

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
   * 
   * @param name 
   * @returns 
   */
  const getAvatarColor = (name: any) => {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const charIndex = Math.abs(name.charCodeAt(0) - 65) % 4;
    return colors[charIndex];
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
    setLoading(true);
    _applicationService.getDetail(_id).then(rep => {
      if (rep.success) {
        setOperationElement(
          <Operation
            onCallbackEvent={clearElement}
            operationType={OperationTypeEnum.edit}
            id={_id}
            formData={rep.result}
          />
        );
      }
      else {
        message.error(rep.errorMessage, 3);
      }
    })
      .finally(() => {
        setLoading(false);
      });


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

  const addApplication = () => {
    setOperationElement(
      <Operation
        onCallbackEvent={clearElement}
        operationType={OperationTypeEnum.add}
      />
    );
  };

  return (
    <div >
      <Spin spinning={loading}>
        <Row className="search-panel">
          <Row className="search-button">
            <SyncOutlined
              style={{ textAlign: "right", marginRight: 10, fontSize: 16 }}
              onClick={() => {
                getPageList();
              }} />
            <Button
              style={{ float: "right" }}
              size="middle"
              icon={<PlusOutlined />}
              onClick={() => addApplication()}
            >
              创建应用
            </Button>
          </Row>
        </Row>

        {
          tableData.length === 0 ?
            <Empty/> : <Row gutter={[12, 12]} style={{ padding: "0px 8px", }} >
              {tableData.map((item: IApplicationOutputDto) => {
                return (
                  <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                    <div className="app-card" style={{ borderRadius: 8 }} >
                      <div className="app-card-title" onClick={() => { goToApplicationDashboard(item.appId) }}>
                        <Avatar size={35} shape="square" style={{ marginRight: 15, backgroundColor: getAvatarColor(item.appId), fontWeight: 700 }}>{item.appId[0].toUpperCase()}</Avatar>
                        <div >{item.appId}</div>
                      </div>
                      <div className="card-operation-label-body">
                        <div className="card-operation-label-filed">
                          <div >最新镜像：<span>Release20230620</span></div>
                        </div>
                      </div>
                      <div className="card-operation" >
                        <div className="card-operation-text" >
                          其他操作
                        </div>
                        <div className="card-operation-body">
                          <div className="card-operation-body-icon">
                            <Tooltip title="流水线">
                              <PartitionOutlined onClick={() => { goToApplicationDashboard(item.appId) }} />
                            </Tooltip>
                          </div>
                          <div className="card-operation-body-icon">
                            <Tooltip title="构建快照">
                              <CameraOutlined onClick={() => { }} />
                            </Tooltip>
                          </div>
                          <div className="card-operation-body-icon">
                            <Tooltip title="改动记录">
                              <BranchesOutlined onClick={() => { }} />
                            </Tooltip>
                          </div>
                          <div className="card-operation-body-icon">
                            <Tooltip title="编辑">
                              <EditOutlined onClick={() => editRow(item.id)} />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>)
              })}
            </Row>
        }
        {subOperationElement}
      </Spin>
    </div>
  );
};
export default ApplicationPage;
