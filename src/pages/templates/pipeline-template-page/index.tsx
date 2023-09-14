import {
  Avatar,
  Button,
  Card,
  Col,
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

import { IPipelineTemplateService } from "@/domain/pipelinetemplates/ipipelinetemplate-service";
import { IocTypes } from "@/shared/config/ioc-types";
import {
  initPaginationConfig,
} from "@/shared/ajax/request";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const PipelineTemplatePage = () => {
  const history = useHistory();

  const _pipelineTemplateService: IPipelineTemplateService = useHookProvider(
    IocTypes.PipelineTemplateService
  );
  const [tableData, setTableData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());


  const toCiPipeline = () => {
    history.push({
      pathname: "/ci/pipeline/templates/edit",
    });
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
    let _param = {
      pageSize: paginationConfig.pageSize,
      pageIndex: paginationConfig.current,
    };
    _pipelineTemplateService
      .getPipelineTemplatePage(_param)
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
                onClick={() => toCiPipeline()}
              >
                创建模板
              </Button>
            </Space>
          </Row>
        </Row>
        <Row gutter={[12, 12]} style={{ padding: "0px 8px", }}>
          {tableData.map((item: any) => {
            return (
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <Card hoverable={true} bordered={false} style={{ borderRadius: 8 }}
                  key={item.id}
                >
                  <Row>
                    <Avatar size={"large"} shape="square" style={{ marginRight: 15, fontWeight: 700 }}>{item.templateName[0].toUpperCase()}</Avatar>
                    <Row style={{ fontSize: "16px" }}>{item.templateName}</Row>

                  </Row>
                  <Row>
                    <Col span={24}>
                      {item.describe}
                    </Col>
                  </Row>
                </Card>
              </Col>)
          })}
        </Row>
      </Spin>
    </div>
  );
};
export default PipelineTemplatePage;
