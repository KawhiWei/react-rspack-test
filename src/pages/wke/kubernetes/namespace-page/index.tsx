import {
    Button,
    Col,
    Form,
    PaginationProps,
    Popconfirm,
    Row,
    Spin,
    Switch,
    Table,
    Tag,
    Tooltip,
    message
} from "antd";
import {
    CloudDownloadOutlined,
    CloudUploadOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    ReloadOutlined,
    WarningOutlined
} from "@ant-design/icons";
import {
    initPaginationConfig,
    tacitPagingProps,
} from "../../../../shared/ajax/request";
import { useEffect, useState } from "react";

import { INameSpaceOutputDto } from "@/domain/kubernetes/namespaces/namespace-dto";
import { INameSpaceService } from "@/domain/kubernetes/namespaces/inamespace-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const NameSpacePage = (props: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData] = Form.useForm();
    const [tableData, setTableData] = useState<Array<INameSpaceOutputDto>>();
    const [subOperationElement, setOperationElement] = useState<any>(null);
    const [paginationConfig, setPaginationConfig] =
        useState<initPaginationConfig>(new initPaginationConfig());
    const _nameSpaceService: INameSpaceService = useHookProvider(IocTypes.NameSpaceService);
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
            title: "集群",
            dataIndex: "clusterName",
        },
        {
            title: "是否发布",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: INameSpaceOutputDto) => {
                return (
                    <div className="table-operation">
                        {
                            record.onlineStatus == 0 ? (<Tag color="success">运行中</Tag>) : null
                        }
                        {
                            record.onlineStatus == 5 ? (<Tag color="processing">未发布</Tag>) : null
                        }
                    </div>
                )
            }
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: INameSpaceOutputDto) => {
                return (
                    <div className="table-operation">
                        <Tooltip placement="top" title="编辑">
                            <EditOutlined
                                style={{ color: "orange", marginRight: 20, fontSize: 16 }}
                                onClick={() => editRow(record.id)} />
                        </Tooltip>
                        {
                            record.onlineStatus == 0 ? (<Tooltip placement="top" title="K8S删除">
                                <Popconfirm
                                    placement="top"
                                    title="您确认从K8S删除吗?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => offlineNameSpace(record.id)}
                                    icon={<WarningOutlined />}
                                >
                                    <CloudDownloadOutlined color="volcano" style={{ marginRight: 20, fontSize: 16 }} />
                                </Popconfirm>
                            </Tooltip>) : null
                        }
                        {
                            record.onlineStatus == 5 ? (<Tooltip placement="top" title="发布到K8S">
                                <Popconfirm
                                    placement="top"
                                    title="您确认发布到K8S吗?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => onlineNameSpace(record.id)}
                                    icon={<WarningOutlined />}
                                >
                                    <CloudUploadOutlined style={{ color: "#1677ff", marginRight: 20, fontSize: 16 }} />
                                </Popconfirm>
                            </Tooltip>) : null
                        }
                        <Tooltip placement="top" title="删除">
                            <Popconfirm
                                placement="top"
                                title="您确认删除吗?"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={() => deleteRow(record.id)}
                                icon={<WarningOutlined />}
                            >
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
        _nameSpaceService.getNameSpacePageList(_param).then((rep) => {
            if (rep.success) {
                setTableData(rep.result.data);
            }
        }).finally(() => {
            setLoading(false);
        })
    }
    const addChange = () => {
        setOperationElement(<Operation operationType={OperationTypeEnum.add} onCallbackEvent={clearElement}></Operation>)
    }

    /***
     * 修改一个配置
     */
    const editRow = (_id: string) => {
        setOperationElement(<Operation operationType={OperationTypeEnum.edit} id={_id} onCallbackEvent={clearElement}></Operation>)
    }

    const deleteRow = (_id: string) => {
        _nameSpaceService.deleteNameSpace(_id).then(res => {
            if (!res.success) {
                message.error(res.errorMessage, 3);
            } else {
                getPageList();
            }
        });
    }

    /**
     * 
     * @param _id 
     */
    const onlineNameSpace = (_id: string) => {
        _nameSpaceService.onlineNameSpace(_id).then(res => {
            if (!res.success) {
                message.error(res.errorMessage, 3);
            } else {
                getPageList();
            }
        });
    }

    /**
     * 
     * @param _id 
     */
    const offlineNameSpace = (_id: string) => {
        _nameSpaceService.offlineNameSpace(_id).then(res => {
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
        <div>
            <Spin spinning={loading}>
                <Form form={formData}
                    name="query"
                    layout="horizontal"
                    {...searchFormItemDoubleRankLayout}
                    onFinish={onSearch}
                >
                    <Row>
                        <Col span="24" style={{ textAlign: "right" }}>
                            <ReloadOutlined
                                style={{ textAlign: "right", marginRight: 10, fontSize: 16 }}
                                onClick={() => {
                                    onSearch();
                                }}
                            />
                            <Button
                                shape="round"
                                type="primary"
                                style={{ margin: "8px 8px" }}
                                onClick={() => {
                                    addChange();
                                }}
                            >
                                <PlusOutlined />
                                添加NameSpace
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns}
                    dataSource={tableData}
                    pagination={pagination}
                    scroll={{ y: 700 }}
                    size="small"
                />
                {subOperationElement}
            </Spin>
        </div>
    )
}

export default NameSpacePage;