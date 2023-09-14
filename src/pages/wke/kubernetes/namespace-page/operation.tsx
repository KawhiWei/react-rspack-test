import "../../../drawer.less";

import { Button, Card, Col, Drawer, Form, Input, InputNumber, Row, Select, Space, message } from "antd";
import { ImagePullPolicyTypeMap, RestartPolicyTypeMap } from "@/domain/maps/container-map";
import {
    MinusCircleOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { IClusterOutputDto } from "@/domain/kubernetes/clusters/cluster-dto";
import { IClusterService } from "@/domain/kubernetes/clusters/icluster-service";
import { INameSpaceInputDto } from "@/domain/kubernetes/namespaces/namespace-dto";
import { INameSpaceService } from "@/domain/kubernetes/namespaces/inamespace-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { formItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

// import "../description.less";



interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;

    /**
     * id
     */
    id?: string;

    /**
     * 操作类型
     */
    operationType: OperationTypeEnum;

}

const validateMessages = {
    required: "${label} 不可为空",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};
const Operation = (props: IProp) => {
    const [clusterData, setClusterData] = useState<Array<IClusterOutputDto>>([]);
    const _nameSpaceService: INameSpaceService = useHookProvider(IocTypes.NameSpaceService);
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });

    const _clusterService: IClusterService = useHookProvider(IocTypes.ClusterService);
    const [loading, setLoading] = useState<boolean>(false);
    const [nameSpace, setNameSpace] = useState<INameSpaceInputDto>({
        chineseName: '',
        name: '',
        clusterId: '',
    });

    const [nameSpaceFormData] = Form.useForm();

    /**
     * 初始化加载事件
     */
    useEffect(() => {
        onLoad();
    }, []);



    /**
     * 编辑获取一个表单
     * @param _id
     */
    const onLoad = () => {
        onClusterList();
        switch (props.operationType) {
            case OperationTypeEnum.add:
                nameSpaceFormData.setFieldsValue(nameSpace)
                editOperationState(true, "添加");
                break;
            case OperationTypeEnum.edit:
                props.id && onGetNameSpaceDetail(props.id)
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看");
                break;
        }
    };

    const onGetNameSpaceDetail = (_id: string) => {
        _nameSpaceService.getNameSpaceDetail(_id).then(rep => {
            if (rep.success) {
                nameSpaceFormData.setFieldsValue(rep.result);
                editOperationState(true, "编辑");
            } else {
                message.error(rep.errorMessage, 3);
            }
        })

    }
    const onClusterList = () => {
        _clusterService.getClusterList().then(rep => {
            if (rep.success) {
                setClusterData(rep.result)

            } else {
                debugger
                message.error(rep.errorMessage, 3);
            }
        })

    }
    /**
       * 底部栏OK事件
       */
    const onFinish = () => {
        nameSpaceFormData.validateFields().then((_nameSpace: INameSpaceInputDto) => {
            switch (props.operationType) {
                case OperationTypeEnum.add:
                    onCreate(_nameSpace);
                    break;
                case OperationTypeEnum.edit:
                    props.id && onUpdate(props.id, _nameSpace);
                    break;
            }
        })
            .catch((error) => {
            });

    };

    /**
     * 弹框取消事件
     */
    const onCreate = (_params: INameSpaceInputDto) => {
        setLoading(true);
        _nameSpaceService.createNameSpace(_params).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3);
            } else {
                message.success("保存成功", 3);
                props.onCallbackEvent && props.onCallbackEvent();
            }
        }).finally(() => {
            setLoading(false);
        });
    };


    /**
     * 修改事件
     */
    const onUpdate = (_id: string, _deploymentContainer: INameSpaceInputDto) => {
        setLoading(true);
        _nameSpaceService.updateNameSpace(_id, _deploymentContainer).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3);
            } else {
                message.success("保存成功", 3);
                props.onCallbackEvent && props.onCallbackEvent();
            }
        }).finally(() => {
            setLoading(false);
        });
    };


    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false);
        props.onCallbackEvent && props.onCallbackEvent();
    };

    /**
     * 修改弹框属性
     * @param _visible
     * @param _title
     */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title + "NameSpace配置" });
    };
    return (
        <div>
            <Drawer style={{ borderRadius: 6 }}
                width="600"
                title={
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        {operationState.title}
                    </div>
                }
                onClose={() => onCancel()}
                closable={true}
                open={operationState.visible}
                footer={
                    <Space style={{ float: "right" }}>
                        <Button
                            shape="round"
                            disabled={loading}
                            onClick={() => onCancel()}
                        >
                            取消
                        </Button>
                        <Button
                            shape="round"
                            style={{ margin: "0 8px" }}
                            type="primary"
                            loading={loading}
                            onClick={() => onFinish()}
                        >
                            保存
                        </Button>
                    </Space>
                }>
                <Form
                    form={nameSpaceFormData}
                    name="nest-messages"
                    layout="vertical"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >

                            <Form.Item
                                name="clusterId"
                                label="绑定集群"
                                rules={[{ required: true}]}>
                                <Select
                                    allowClear={true}
                                    placeholder="绑定集群"
                                >
                                    {clusterData.map((item: IClusterOutputDto) => {
                                        return (
                                            <Select.Option value={item.id}>
                                                {item.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="NameSpace"
                                rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            
                            <Form.Item
                                name="chineseName"
                                label="中文名称"
                                rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>


                </Form>
            </Drawer>
        </div>
    )
}
export default Operation;