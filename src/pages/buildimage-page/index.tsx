import {Button, Col, Form, Input, PaginationProps, Popconfirm, Row, Spin, Table, Tooltip, message} from 'antd';
import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, WarningOutlined} from "@ant-design/icons";
import {
    initPaginationConfig,
    tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { IBuildImageService } from  "@/domain/buildimages/ibuildimage-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import BulidImageVersion from "./bulidimage-version";

const BuildImagePage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [formData] = Form.useForm();
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const _buildImageService: IBuildImageService = useHookProvider(
        IocTypes.BuildImageService
    );
    const [subOperationElement, setOperationElement] = useState<any>(null);
    const [subBulidImageVersionElement, setBulidImageVersionElement] = useState<any>(null);
    const columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "镜像名",
            dataIndex: "buildImageName",
            key: "buildImageName"
        },
        {
            title: "构建脚本",
            dataIndex: "compileScript",
            key: "compileScript"
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => {
                return (
                    <div className="table-operation">
                        <Tooltip placement="top" title="应用看板">
                            <EyeOutlined
                                style={{ color: "#108ee9", marginRight: 10, fontSize: 16 }}
                                onClick={() => details(record.id)}
                            />
                            </Tooltip>
                            <Tooltip placement="top" title="添加版本">
                            <PlusOutlined
                                style={{ color: "#108ee9", marginRight: 10, fontSize: 16 }}
                                onClick={() => addVersion(record.id,record.name)}
                            />
                            </Tooltip>
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
                )
            }
        }
    ]

    useEffect(() => {
        getPageList();
    },[paginationConfig])

    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        showTotal:(total) => {
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
        }
    }
    const getPageList = () => {
        setLoading(true);
        let param = formData.getFieldsValue();
        let _param = {
            pageSize: paginationConfig.pageSize,
            pageIndex: paginationConfig.current,
            name:param.name,
            buildImageName: param.buildImageName
        }
        _buildImageService.getPage(_param)
            .then((rep) => {
                if(rep.success){
                    setPaginationConfig((Pagination) => {
                        Pagination.total = rep.result.total;
                        return Pagination;
                    });
                    setTableData(rep.result.data);
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const addChange = () => {
        setOperationElement(
            <Operation onCallbackEvent={clearElement}
                operationType={OperationTypeEnum.add}
            />
        )
    }

    const deleteRow = (_id:string) => {
        setLoading(true);
        _buildImageService.delete(_id).then(res => {
            if(res.success){
                getPageList();
            }else{
                message.error(res.errorMessage, 3);
            }
        }).finally(() => {
            setLoading(false);
        })
    }
    const editRow = (_id:string) => {
        setOperationElement(
            <Operation onCallbackEvent={clearElement}
                operationType={OperationTypeEnum.edit}
                id={_id}
            />
        )
    }

    const clearElement = () => {
        setOperationElement(null);
        setBulidImageVersionElement(null);
        getPageList();
    }

    const details = (_id:string) => {
        setOperationElement(
            <Operation 
                onCallbackEvent={clearElement}
                operationType={OperationTypeEnum.view}
                id={_id}
            />)
    }

    const addVersion = (_id:string, _name:string) => {
        setBulidImageVersionElement(<BulidImageVersion
            operationType={OperationTypeEnum.add}
            buildImageId={_id}
            buildImageName={_name}
            onCallbackEvent={clearElement}
        />);
    }
    return (
        <div>
            <Spin spinning={loading}>
                <Row>
                    <Form form={formData} name= "horizontal_login" layout="inline">
                        <Form.Item name="name" label="名称">
                            <Input style={{ borderRadius: 8 }} />
                        </Form.Item>
                        <Button
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        onClick={() => {
                            getPageList();
                        }}>
                            <SearchOutlined />
                            查询
                        </Button>
                    </Form>
                </Row>
                <Row>
                    <Col span="24" style = {{ textAlign: "right"}}>
                        <Button
                            type="primary"
                            shape="round"
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
                {subOperationElement}
                {subBulidImageVersionElement}
            </Spin>
        </div>
    )
}

export default BuildImagePage;