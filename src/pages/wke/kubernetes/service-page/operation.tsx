import "../../../drawer.less";

import { Button, Card, Col, Drawer, Form, Input, InputNumber, Row, Select, Space, message } from "antd";
import { INameSpaceInputDto, INameSpaceOutputDto } from "@/domain/kubernetes/namespaces/namespace-dto";
import { ImagePullPolicyTypeMap, RestartPolicyTypeMap } from "@/domain/maps/container-map";
import {
    MinusCircleOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { IClusterOutputDto } from "@/domain/kubernetes/clusters/cluster-dto";
import { IClusterService } from "@/domain/kubernetes/clusters/icluster-service";
import { INameSpaceService } from "@/domain/kubernetes/namespaces/inamespace-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IServiceInputDto } from "@/domain/kubernetes/services/service-dto";
import { IServiceService } from "@/domain/kubernetes/services/iservice-service";
import { IWorkLoadOutputDto } from "@/domain/kubernetes/workloads/workload-dto";
import { IWorkLoadService } from "@/domain/kubernetes/workloads/iworkload-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { PortTypeMap } from "@/domain/maps/port-type-map";
import { cwd } from "process";
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
    /**
     * 应用Id
     */
    appId: string;

}

const validateMessages = {
    required: "${label} 不可为空",
};
const Operation = (props: IProp) => {
    const _nameSpaceService: INameSpaceService = useHookProvider(IocTypes.NameSpaceService);
    const _serviceService: IServiceService = useHookProvider(IocTypes.ServiceService);
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    const [deploymentConfigurationData, setDeploymentConfigurationData] = useState<Array<IWorkLoadOutputDto>>([]);


    const [clusterData, setClusterData] = useState<Array<IClusterOutputDto>>([]);
    const [nameSpaceArrayData, setNameSpaceArrayData] = useState<Array<INameSpaceOutputDto>>([]);
    const _clusterService: IClusterService = useHookProvider(IocTypes.ClusterService);
    const [loading, setLoading] = useState<boolean>(false);
    const [service, setService] = useState<IServiceInputDto>({
        name: '',
        deploymentId: '',
        nameSpaceId: "",
        clusterId: "",
        appId: props.appId,
        servicePorts: []
    });
    const [serviceFormData] = Form.useForm();
    const [servicePortsFormData] = Form.useForm();
    const _deploymentConfigurationService: IWorkLoadService = useHookProvider(IocTypes.WorkLoadService);
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
        onGetDeploymentConfigurationData();
        switch (props.operationType) {
            case OperationTypeEnum.add:
                serviceFormData.setFieldsValue(service)
                servicePortsFormData.setFieldsValue({
                    servicePorts: []
                })
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

    const onClusterList = () => {
        _clusterService.getClusterList().then(rep => {
            if (rep.success) {
                setClusterData(rep.result)

            } else {
                message.error(rep.errorMessage, 3);
            }
        })

    }

    const onGetNameSpaceDetail = (_id: string) => {
        _serviceService.getServiceDetail(_id).then(rep => {
            if (rep.success) {
                serviceFormData.setFieldsValue(rep.result);
                servicePortsFormData.setFieldsValue(rep.result)
                editOperationState(true, "编辑");
            } else {
                message.error(rep.errorMessage, 3);
            }
        })

    }
    /**
       * 选择部署时触发
       */
    const onChangeDeployment = (_deploymentId: string) => {
        let deployment = deploymentConfigurationData.find(x => x.id === _deploymentId)
        if (deployment) {
            serviceFormData.setFieldValue("clusterId", deployment.clusterId)
        }
    };

    const onGetDeploymentConfigurationData = () => {
        _deploymentConfigurationService.getWorkLoadByAppIdList(props.appId).then(rep => {
            if (rep.success) {
                setDeploymentConfigurationData(rep.result)

            } else {
                message.error(rep.errorMessage, 3);
            }
        })
    }

    /**
     * 弹框取消事件
     */
    const onCreate = (_params: IServiceInputDto) => {
        setLoading(true);
        _serviceService.createService(_params).then(rep => {
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
    const onUpdate = (_id: string, _params: IServiceInputDto) => {
        setLoading(true);
        _serviceService.updateService(_id, _params).then(rep => {
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
   * 底部栏OK事件
   */
    const onFinish = () => {
        serviceFormData.validateFields().then((_params: IServiceInputDto) => {
            _params.servicePorts = servicePortsFormData.getFieldsValue().servicePorts;
            _params.appId = props.appId;
            console.log(_params)
            switch (props.operationType) {
                case OperationTypeEnum.add:
                    onCreate(_params);
                    break;
                case OperationTypeEnum.edit:
                    props.id && onUpdate(props.id, _params);
                    break;
            }
        })
            .catch((error) => {
                console.log(error)
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
                width="80%"
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
                    {...formItemDoubleRankLayout}
                    form={serviceFormData}
                    name="nest-messages"
                    layout="horizontal"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Card title="基础配置" size="default" bordered={false} >
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="name"
                                    label="ServiceName："
                                    rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>


                            <Col span="12">
                                <Form.Item
                                    name="deploymentId"
                                    label="选择部署："
                                    rules={[{ required: true }]}>
                                    <Select
                                        allowClear={true}
                                        onChange={onChangeDeployment}
                                    >
                                        {deploymentConfigurationData.map((item: IWorkLoadOutputDto) => {
                                            return (
                                                <Select.Option value={item.id}>
                                                    {item.name}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="clusterId"
                                    label="绑定集群："
                                    rules={[{ required: true }]}>
                                    <Select
                                        allowClear={true}
                                        placeholder="绑定集群"
                                        disabled
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
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="nameSpaceId"
                                    label="命名空间："
                                    rules={[{ required: true }]}>
                                    <Select
                                        allowClear={true}
                                        disabled
                                    >
                                        {nameSpaceArrayData.map((item: INameSpaceOutputDto) => {
                                            return (
                                                <Select.Option value={item.id}>
                                                    {item.name}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                    </Card>
                </Form>
                <Card title="端口配置" size="default" bordered={false} >
                    <Form
                        form={servicePortsFormData}
                        name="nest-messages"
                        layout="horizontal"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        <Row>
                            <Col span="24">
                                <Form.List name="servicePorts">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'portType']}
                                                        label="PortType："
                                                    ><Select
                                                        allowClear={true}
                                                        style={{ width: 250 }}
                                                    >
                                                            {PortTypeMap.map((item: any) => {
                                                                return (
                                                                    <Select.Option value={item.key}>
                                                                        {item.value}
                                                                    </Select.Option>
                                                                );
                                                            })}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'portName']}
                                                        label="PortName："
                                                    >
                                                        <Input style={{ width: 250 }} placeholder="请输入PortName" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'sourcePort']}
                                                        label="SourcePort："
                                                    >
                                                        <InputNumber style={{ width: 250 }} placeholder="请输入SourcePort" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'targetPort']}
                                                        label="TargetPort："
                                                    >
                                                        <InputNumber style={{ width: 250 }} placeholder="请输入TargetPort" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    添加端口配置
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Drawer>
        </div>
    )
}
export default Operation;