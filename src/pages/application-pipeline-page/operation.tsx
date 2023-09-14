import { Button, Checkbox, Drawer, Form, Input, Select, Space, message } from "antd";
import { useEffect, useState } from "react";

import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { IApplicationPipelineInputDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplication-pipeline-service";
import { IComponentIntegrationService } from "@/domain/componentintegration/icomponentintegration-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 应用Id
     */
    appId: string;

    /**
     * 流水线Id
     */
    id?: string;

    /**
     * 操作类型
     */
    operationType: OperationTypeEnum;

    /**
     * 操作确认回调事件
     */
    onConfirmCallbackEvent?: any;

    /**
     * 操作取消回调事件
     */
    onCancelCallbackEvent?: any;

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
    const [checked, setChecked] = useState(props.operationType === OperationTypeEnum.add);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData] = Form.useForm();
    const _applicationPipelineService: IApplicationPipelineService =
        useHookProvider(IocTypes.ApplicationPipelineService);
    const _componentIntegrationService: IComponentIntegrationService =
        useHookProvider(IocTypes.ComponentIntegrationService);
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    const [componentArray, setComponentArray] = useState<Array<any>>([]);



    /**
     * 页面初始化事件
     */
    useEffect(() => {
        onLoad();
    }, []);

    /**
     * 编辑获取一个表单
     * @param _id
     */
    const onLoad = () => {
        _componentIntegrationService.getPage({}).then(resp => {
            if (resp.success) {
                console.log(resp.result.data)
                setComponentArray(resp.result.data)
            }
        })
        switch (props.operationType) {
            case OperationTypeEnum.add:
                editOperationState(true, "基础配置")
                break;
            case OperationTypeEnum.edit:
                props.id && _applicationPipelineService.getDetail(props.id).then(resp => {
                    if (resp.success) {

                        formData.setFieldsValue(resp.result)
                        editOperationState(true, "基础配置")
                    }
                })
                    .finally(() => {

                    })
                break;
        }
    };


    /**
     * 修改弹框属性
     * @param _visible
     * @param _title
     */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    };

    /**
     * 
     * @param e 
     */
    const onChange = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked);
    };

    /**
     * 保存事件
     */
    const onFinish = () => {
        formData.validateFields().then((values) => {
            let param = formData.getFieldsValue();
            setLoading(true);
            switch (props.operationType) {
                case OperationTypeEnum.add:
                    onCreate(param);
                    break;
                case OperationTypeEnum.edit:
                    onUpdate(param);
                    break;
            }

        })
            .catch((error) => {
            });
    }

    /**
     * 新增保存事件
     */
    const onCreate = (_params: IApplicationPipelineInputDto) => {
        _params.appId = props.appId;
        _applicationPipelineService.create(_params)
            .then(resp => {
                if (!resp.success) {
                    message.error(resp.errorMessage, 3);
                } else {
                    message.success("保存成功", 3);
                    props.onConfirmCallbackEvent && props.onConfirmCallbackEvent(checked, resp.result)
                }
            }).finally(() => {
                setLoading(false);
            })

    }

    /**
     * 编辑保存事件
     */
    const onUpdate = (_params: IApplicationPipelineInputDto) => {
        _params.appId = props.appId;
        props.id && _applicationPipelineService.update(props.id, _params)
            .then(resp => {
                if (!resp.success) {
                    message.error(resp.errorMessage, 3);
                } else {
                    message.success("保存成功", 3);
                    props.onConfirmCallbackEvent && props.onConfirmCallbackEvent(checked, resp.result)
                }
            }).finally(() => {
                setLoading(false);
            })

    }

    /**
     * 取消抽屉
     */
    const onCancel = () => {
        editOperationState(false)
        props.onCancelCallbackEvent && props.onCancelCallbackEvent();
    }

    return (
        <div>
            <Drawer
                title={operationState.title}
                width={600}
                placement="right"
                onClose={() => onCancel()}
                open={operationState.visible}
                footer={
                    <Space style={{ float: "right" }}>
                        <Checkbox checked={checked} disabled={props.operationType === OperationTypeEnum.edit} onChange={onChange}>
                            是否前往配置详情
                        </Checkbox>
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
                    </Space>}>
                <p style={{ whiteSpace: "pre" }}>流水线基础信息设置</p>
                <Form
                    form={formData}
                    name="nest-messages"
                    layout="vertical"
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ required: true }]}
                        colon={false}
                    >
                        <Input
                            disabled={props.operationType === OperationTypeEnum.edit}
                        />
                    </Form.Item>
                    <Form.Item
                        name="continuousIntegrationImage"
                        label="CI镜像"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="buildComponentId"
                        label="构建集群"
                        rules={[{ required: true }]}
                    >
                        <Select allowClear={true} placeholder="请选择构建集群">
                            {componentArray.map((item: any) => {
                                return (
                                    <Select.Option value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="imageWareHouseComponentId"
                        label="镜像仓库"
                        rules={[{ required: true }]}
                    >
                        <Select allowClear={true} placeholder="请选择镜像仓库">
                            {componentArray.map((item: any) => {
                                return (
                                    <Select.Option value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Form>

            </Drawer>
        </div>
    );
};

export default Operation;
