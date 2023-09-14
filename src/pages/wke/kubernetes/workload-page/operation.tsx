import "@/pages/drawer.less";

import { ApplicationRuntimeTypeMap, WorkLoadTypeMap } from "@/domain/maps/deployment-configuration-map";
import { Button, Checkbox, Drawer, Form, Input, InputNumber, Select, Space, message } from "antd";
import { useEffect, useState } from "react";

import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { IClusterOutputDto } from "@/domain/kubernetes/clusters/cluster-dto";
import { IClusterService } from "@/domain/kubernetes/clusters/icluster-service";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { INameSpaceOutputDto } from "@/domain/kubernetes/namespaces/namespace-dto";
import { INameSpaceService } from "@/domain/kubernetes/namespaces/inamespace-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IWorkLoadCreateInputDto } from "@/domain/kubernetes/workloads/workload-dto";
import { IWorkLoadService } from "@/domain/kubernetes/workloads/iworkload-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import _ from "lodash";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 操作确认回调事件
     */
    onConfirmCallbackEvent?: any;

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
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};
const Operation = (props: IProp) => {
    const _nameSpaceService: INameSpaceService = useHookProvider(IocTypes.NameSpaceService);
    const _clusterService: IClusterService = useHookProvider(IocTypes.ClusterService);
    const _environmentService: IEnvironmentService =
        useHookProvider(IocTypes.EnvironmentService);
    const _workLoadService: IWorkLoadService = useHookProvider(IocTypes.WorkLoadService);


    const [clusterData, setClusterData] = useState<Array<IClusterOutputDto>>([]);
    const [nameSpaceArrayData, setNameSpaceArrayData] = useState<Array<INameSpaceOutputDto>>([]);

    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });

    const [loading, setLoading] = useState<boolean>(false);

    const [clusterId, setClusterId] = useState<string>('');
    const [environmentData, setEnvironmentData] = useState<Array<any>>([]);

    const [workLoadData, setWorkLoadData] = useState<IWorkLoadCreateInputDto>();
    const [checked, setChecked] = useState(props.operationType === OperationTypeEnum.add);
    const [workLoadFormData] = Form.useForm();


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
        onGetNameSpaceList();
        onGetEnvironmentList();
        switch (props.operationType) {
            case OperationTypeEnum.add:
                workLoadFormData.setFieldsValue(workLoadData)
                editOperationState(true, "添加");
                break;
            case OperationTypeEnum.edit:
                onGetWorkLoadDetail()
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看");
                break;

        }
    };

    /**
     * 获取集群
     */
    const onClusterList = () => {
        _clusterService.getClusterList().then(rep => {
            if (rep.success) {
                setClusterData(rep.result)

            } else {
                message.error(rep.errorMessage, 3);
            }
        })
    }

    const onChangeClusterId = (_clusterId: string) => {
        setClusterId(_clusterId)
    };

    /**
      * 查询命名空间根据集群Id
      */
    const onGetEnvironmentList = () => {
        let _param = {
            pageSize: 100,
            pageIndex: 1,
        };
        _environmentService.getPage(_param).then(rep => {
            if (rep.success) {
                setEnvironmentData(rep.result.data)

            } else {
                message.error(rep.errorMessage, 3);
            }
        })

    };


    /**
      * 查询命名空间根据集群Id
      */
    const onGetNameSpaceList = () => {
        _nameSpaceService.getNameSpaceList().then(rep => {
            if (rep.success) {
                setNameSpaceArrayData(rep.result)

            } else {
                message.error(rep.errorMessage, 3);
            }
        })

    };

    /**
     * 查询配置详情
     */
    const onGetWorkLoadDetail = () => {
        props.id && _workLoadService.getWorkLoadDetail(props.id).then(rep => {
            if (rep.success) {
                workLoadFormData.setFieldsValue(rep.result);
                editOperationState(true, "编辑");
            } else {
                message.error(rep.errorMessage, 3);
            }
        })
    }

    /**
     * 底部栏OK事件
     */
    const onFinish = () => {
        workLoadFormData.validateFields().then((_workLoad: IWorkLoadCreateInputDto) => {
            _workLoad.appId = props.appId;
            switch (props.operationType) {
                case OperationTypeEnum.add:
                    onCreate(_workLoad);
                    break;
            }

        }).catch((error) => { });
    };
    /**
     * 
     * @param e 
     */
    const onChange = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked);
    };

    /**
     * 弹框取消事件
     */
    const onCreate = (_param: IWorkLoadCreateInputDto) => {
        setLoading(true);
        _workLoadService.createWorkLoad(_param).then(resp => {
            if (!resp.success) {
                message.error(resp.errorMessage, 3);
            } else {
                message.success("创建成功", 3);


                props.onConfirmCallbackEvent && props.onConfirmCallbackEvent(checked, resp.result)


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
        setOperationState({ visible: _visible, title: _title + '部署配置' });
    };

    return (
        <div>
            <Drawer
                width="600px"
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
                    </Space>
                }>

                <Form
                    form={workLoadFormData}
                    name="nest-messages"
                    layout="vertical"
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="chineseName"
                        label="中文名称"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="environmentName"
                        label="部署环境"
                        rules={[{ required: true }]}
                    >
                        <Select
                            allowClear={true}
                            placeholder="部署环境"
                            onChange={onChangeClusterId}
                        >
                            {environmentData.map((item: any) => {
                                return (
                                    <Select.Option value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="clusterId"
                        label="部署集群"
                        rules={[{ required: true }]}
                    >
                        <Select
                            allowClear={true}
                            placeholder="绑定集群"
                            onChange={onChangeClusterId}
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
                        name="nameSpace"
                        label="命名空间"
                        rules={[{ required: true }]}>
                        <Select
                            allowClear={true}
                        >
                            {nameSpaceArrayData.filter(x => x.clusterId === clusterId).map((item: INameSpaceOutputDto) => {
                                return (
                                    <Select.Option value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="applicationRuntimeType"
                        label="运行时类型"
                        rules={[{ required: true }]}>
                        <Select allowClear={true}
                            placeholder="请选择运行时类型">
                            {ApplicationRuntimeTypeMap.map((item: any) => {
                                return (
                                    <Select.Option value={item.key}>
                                        {item.value}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="workLoadType"
                        label="部署类型"
                        rules={[{ required: true }]}
                    >
                        <Select allowClear={true}
                            placeholder="请选择部署类型">
                            {WorkLoadTypeMap.map((item: any) => {
                                return (
                                    <Select.Option value={item.key}>
                                        {item.value}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="replicas"
                        label="部署副本数量"
                        rules={[{ required: true }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        name={["workLoadPlugins", "strategy", "type"]}
                        label="更新策略类型"
                    >
                        <Select allowClear={true}
                            placeholder="请选择更新策略类型">
                            <Select.Option value="Recreate">Recreate</Select.Option>
                            <Select.Option value="RollingUpdate">RollingUpdate</Select.Option>

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name={["workLoadPlugins", "strategy", "maxUnavailable"]}
                        label="最大不可用">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["workLoadPlugins", "strategy", "maxSurge"]}
                        label="可调度数量">
                        <Input />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}
export default Operation;