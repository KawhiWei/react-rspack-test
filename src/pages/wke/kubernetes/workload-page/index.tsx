import "@/pages/search-panel.less"

import {
    Button,
    Col,
    Form,
    PaginationProps,
    Popconfirm,
    Row,
    Spin,
    Table,
    Tooltip,
    message
} from "antd";
import {
    CloudUploadOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    ReloadOutlined,
    SyncOutlined,
    WarningOutlined
} from "@ant-design/icons";
import {
    initPaginationConfig,
    tacitPagingProps,
} from "../../../../shared/ajax/request";
import { useEffect, useState } from "react";

import { IWorkLoadOutputDto } from "@/domain/kubernetes/workloads/workload-dto";
import { IWorkLoadService } from "@/domain/kubernetes/workloads/iworkload-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 应用Id
     */
    appId: string;


}
const DeploymentConfigurationPage = (props: IProp) => {
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const [formData] = Form.useForm();
    const [tableData, setTableData] = useState<Array<IWorkLoadOutputDto>>();
    const [subOperationElement, setOperationElement] = useState<any>(null);
    const [paginationConfig, setPaginationConfig] =
        useState<initPaginationConfig>(new initPaginationConfig());
    const _deploymentConfigurationService: IWorkLoadService = useHookProvider(IocTypes.WorkLoadService);
    useEffect(() => {
        getPageList();
    }, [paginationConfig])

    const columns = [
        {
            title: "中文名称",
            dataIndex: "chineseName",
        },
        {
            title: "名称",
            dataIndex: "name",
        },
        {
            title: "部署环境",
            dataIndex: "environmentName",
        },
        {
            title: "集群",
            dataIndex: "clusterName",
        },
        {
            title: "运行环境",
            dataIndex: "applicationRuntimeTypeName",
        },
        {
            title: "部署类型",
            dataIndex: "deploymentTypeName",
        },
        {
            title: "NameSpace",
            dataIndex: "nameSpace",
        },
        {
            title: "部署副本数量",
            dataIndex: "replicas",
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IWorkLoadOutputDto) => {
                return (
                    <div className="table-operation">
                        <Tooltip placement="top" title="编辑">
                            <EditOutlined
                                style={{ color: "orange", marginRight: 10, fontSize: 16 }}
                                onClick={() => gotoWorkLoadConfig(record.id)} />
                        </Tooltip>
                        <Tooltip placement="top" title="发布">
                            <CloudUploadOutlined
                                style={{ color: "#1677ff", marginRight: 10, fontSize: 16 }}
                                onClick={() => publishDeploymentConfiguration(record.id)} />
                        </Tooltip>
                        <Tooltip placement="top" title="删除">
                            <Popconfirm
                                placement="top"
                                title="确认删除?"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={() => deleteRow(record.id)}
                                icon={<WarningOutlined />}>
                                <DeleteOutlined style={{ color: "red", fontSize: 16 }} />
                            </Popconfirm>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]
    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        showTotal: (total) => {
            return `共 ${total} 条`;
        },
        onShowSizeChange: (current: number, pageSize: number) => {
            setPaginationConfig(Pagination => {
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
        }
    }

    const onSearch = () => {
        getPageList();
    }

    const getPageList = () => {
        setLoading(true);
        let param = formData.getFieldsValue();
        let _param = {
            pageSize: paginationConfig.pageSize,
            pageIndex: paginationConfig.current,
        }
        _deploymentConfigurationService.getWorkLoadPage(props.appId, _param).then((x) => {
            if (x.success) {
                setTableData(x.result.data);
            }
        }).finally(() => {
            setLoading(false);
        })
    }
    const addWorkLoad = () => {
        setOperationElement(<Operation 
            operationType={OperationTypeEnum.add} 
            appId={props.appId} 
            onCallbackEvent={clearElement}
            onConfirmCallbackEvent={ConfirmCallbackEvent}></Operation>)
    }

     /**
   * 抽屉确认回调事件，判断是否需要前往流水线配置界面
   * @param _isGotoWorkLoadConfig 
   * @param _id 
   */
  const ConfirmCallbackEvent = (_isGotoWorkLoadConfig: boolean, _id: string) => {
    if (_isGotoWorkLoadConfig) {
        gotoWorkLoadConfig(_id)
    }
    else {
        clearElement();
      getPageList();
    }

  }

  
    /***
     * 修改一个配置
     */
    const editRow = (_id: string) => {
        setOperationElement(<Operation operationType={OperationTypeEnum.edit} appId={props.appId} id={_id} onCallbackEvent={clearElement}></Operation>)
    }

    /**
* 是否前往流水线配置
*/
    const gotoWorkLoadConfig = (_id: string) => {
        history.push({
            pathname: "/tks/kubernetes/workload/config",
            state: {
                id: _id,
            },
        });
    };
    /***
     * 发布一个部署配置
     */
    const publishDeploymentConfiguration = (_id: string) => {
        console.log('发布应用')

    }
    const deleteRow = (_id: string) => {
        _deploymentConfigurationService.deleteWorkLoad(_id).then(res => {
            if (!res.success) {
                message.error(res.errorMessage, 3);
            } else {
                getPageList();
            }
        });
    }
    const clearElement = () => {
        setOperationElement(null);
        getPageList();
    };

    return (

        <Spin spinning={loading} >
            <Row className="search-panel">
                <Row className="search-button">
                    <SyncOutlined
                        style={{ textAlign: "right", marginRight: 10, fontSize: 16 }}
                        onClick={() => {
                            onSearch();
                        }} />
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => {
                            addWorkLoad();
                        }}>
                        创建部署计划
                    </Button>
                </Row>
            </Row>
            <Table columns={columns}
                dataSource={tableData}
                pagination={pagination}
                scroll={{ y: 700 }}
                size="small"
            />
            {subOperationElement}
        </Spin>
    )
}

export default DeploymentConfigurationPage;