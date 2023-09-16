import {
  Button,
  Form,
  Row,
  Space,
  Spin
} from "antd";
import {
  PlusOutlined,
  SyncOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import {
  initPaginationConfig,
} from "@/shared/ajax/request";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const PipelineTemplatePage = () => {
  const history = useHistory();
  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const [tableData, setTableData] = useState<Array<IApplicationBaseDto>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
  const [subOperationElement, setOperationElement] = useState<any>(null);
  const [formData] = Form.useForm();
  const [projectArray, setProjectArray] = useState<Array<any>>([]);
  const [componentIntegrationArray, setComponentIntegrationArray] = useState<Array<any>>([]);





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
