import { Button, Col, Drawer, Form, Input, Modal, Row, Space, message } from "antd";
import { formItemDoubleRankLayout, tailLayout } from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
    /**
     * 操作类型
     */
    operationType: OperationTypeEnum,


    /**
     * 表单数据
     */
    id?: any;

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
    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [formData] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    /**
         * 页面初始化事件
         */
    useEffect(() => {
        onGetLoad()
    }, [formData]);

    const onGetLoad = () => {
        switch (props.operationType) {
            case OperationTypeEnum.add:
                editOperationState(true, "添加")
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看")
                break;
            case OperationTypeEnum.edit:
                props.id && _environmentService.getDetail(props.id).then(rep => {
                    debugger
                    if (rep.success) {
                        formData.setFieldsValue(rep.result);
                        editOperationState(true, "修改")
                    }
                    else{
                        
                    }
                })
                break;
        }
    }

    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }

    const onFinish = () => {
        formData.validateFields().then((values) => {
            switch (props.operationType) {
                case OperationTypeEnum.add:
                    onAddEnvironment(values);
                    break;
                case OperationTypeEnum.edit:
                    //onUpdate(param);
                    break;
            }
        })
            .catch((error) => {
            });




    };

    const onAddEnvironment = (_param: any) => {
        _environmentService.addEnvironment(_param).then(res => {
            if (!res.success) {
                message.error(res.errorMessage, 3)
            }
            else {
                message.success("保存成功", 3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }

    /**
    * 弹框取消事件
    */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent()
    };
    return (
        <div>
            <Drawer width={"600"}
                onClose={onCancel}
                title={
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        {operationState.title}
                    </div>
                }
                closable={false}
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
                    </Space>}>
                <Form form={formData}
                    name="nest-messages"
                    onFinish={onFinish}
                    layout="vertical"
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="chinesName"
                        label="环境中文名称"
                        rules={[{ required: true }]}
                        style={{ textAlign: 'left' }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="环境名称"
                        rules={[{ required: true }]}
                        style={{ textAlign: 'left' }}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Drawer>
        </div>
    )
}
export default Operation;
