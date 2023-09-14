import { useEffect, useState } from "react";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { IBuildImageService } from "@/domain/buildimages/ibuildimage-service";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import { IocTypes } from "@/shared/config/ioc-types";
import { Button, Col, Form, Input, message, Modal, Row, Space } from 'antd';
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { formItemSingleRankLayout } from "@/constans/layout/optionlayout";

interface IProp {
    onCallbackEvent?: any;
    buildImageId: string;
    buildImageName: string;
    operationType: OperationTypeEnum;
}

const validateMessages = {
    required: "${label} 不可为空",
    types: {

    }
}

const BulidImageVersion = (props: IProp) => {
    const _buildImageService: IBuildImageService = useHookProvider(
        IocTypes.BuildImageService
    );
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    const [formData] = Form.useForm();

    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        onLoad();
    },[])
    const onLoad = () => {
        switch (props.operationType){
            case OperationTypeEnum.add:
                editOperationState(true, "添加");
                break
        }
    }
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    };

    const onCancel=()=>{
        editOperationState(false);
        props.onCallbackEvent && props.onCallbackEvent();
    }
    const onFinish=()=>{
        formData.validateFields().then(values => {
            let param = formData.getFieldsValue();
            switch (props.operationType){
                case OperationTypeEnum.add:
                    onAdd(param);
                    break
            }
        }).catch(error => {
            
        })
    }
    const onAdd=(_param: any)=>{
        setLoading(true);
        let param = {
            ..._param,
            buildImageId: props.buildImageId
        }
        _buildImageService.addBulidImageVersion(param).then(rep => {
            if(rep.success){
                message.success("保存成功",3);
                props.onCallbackEvent && props.onCallbackEvent();
            }else{
                message.error(rep.errorMessage, 3);
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div>
            <Modal
                title = {operationState.title}
                destroyOnClose
                maskClosable={false}
                open={operationState.visible}
                footer={
                    <div>
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

                    </div>
                }
            >
                <Form
                    {...formItemSingleRankLayout}
                    form={formData}
                    layout="horizontal"
                    validateMessages={validateMessages}
                >
                    <Row>
                        <Col span={24} style={{textAlign:"right"}}>
                            <Form.Item
                                name={"name"}
                                label="名称:"
                            >
                                {props.buildImageName}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{textAlign:"right"}}>
                            <Form.Item
                                name={"version"}
                                label="版本号:"
                                rules={[{ required: true}]}
                            >
                                <Input style={{ borderRadius:6 }} placeholder="请输入版本号"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
export default BulidImageVersion;