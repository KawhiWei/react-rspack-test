import {

} from "@ant-design/icons";

import { Button, Card, Col, Descriptions, Form, Input, Layout, List, Modal, PaginationProps, Popconfirm, Row, Spin, Table, Tabs, Tag, Tooltip, message } from "antd";
import {
    DeleteOutlined,
    DeleteTwoTone,
    EditOutlined,
    EyeOutlined,
    FileAddTwoTone,
    LeftOutlined,
    PlusOutlined,
    SearchOutlined,
    SettingTwoTone,
    WarningOutlined,
} from '@ant-design/icons';
import { formItemDoubleRankLayout, searchFormItemDoubleRankLayout, tailLayout } from "@/constans/layout/optionlayout";
import { initPaginationConfig, tacitPagingProps } from "../../shared/ajax/request"
import { useEffect, useState } from "react";

import ConfigOperation from "../config/operation";
import ConfigRelease from "../config/configRelease";
import { IApplicationBaseDto } from "@/domain/applications/application-dto";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const EnvironmentPage = (props: any) => {
    const [paginationConfig, setPaginationConfig] =
        useState<initPaginationConfig>(new initPaginationConfig());
    const _environmentService: IEnvironmentService =
        useHookProvider(IocTypes.EnvironmentService);
    /**
    * 配置添加/修改组件
    */
    const [OperationElement, setOperationElement] = useState<any>(null);
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

    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "环境中文名称",
            dataIndex: "chinesName",
            key: "chinesName",
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => {
                return (
                    <div className="table-operation">
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
    ]
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData] = Form.useForm();
    const onSearch = () => {
        setPaginationConfig((Pagination) => {
            Pagination.current = 1;
            return Pagination;
        });
        getPageList();
    };



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

    const deleteRow = (_id: string) => {
        _environmentService.delete(_id).then((res) => {
            if (!res.success) {
                message.error(res.errorMessage, 3);
            } else {
                getPageList();
            }
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
        };
        _environmentService.getPage(_param)
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

    const addEnvironment = () => {
        setOperationElement(
            <Operation
                onCallbackEvent={clearElement}
                operationType={OperationTypeEnum.add}
            />
        );
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
                            <Form.Item name="name" label="名称：">
                                <Input
                                    style={{ borderRadius: 8 }}
                                    placeholder="请请输入环境名称"
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
                                addEnvironment()
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
        </div>)
}

export default EnvironmentPage;