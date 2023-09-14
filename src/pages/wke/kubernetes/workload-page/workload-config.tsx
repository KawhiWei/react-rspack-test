import "@/pages/search-panel.less"
import "./workload-config.less"
import { } from "@/domain/kubernetes/workloads/workload-dto";

import { ApplicationRuntimeTypeMap, WorkLoadTypeMap } from "@/domain/maps/deployment-configuration-map";
import { Button, Card, Form, Input, InputNumber, Layout, Row, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";

import { IClusterOutputDto } from "@/domain/kubernetes/clusters/cluster-dto";
import { IClusterService } from "@/domain/kubernetes/clusters/icluster-service";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { INameSpaceOutputDto } from "@/domain/kubernetes/namespaces/namespace-dto";
import { INameSpaceService } from "@/domain/kubernetes/namespaces/inamespace-service";
import { IWorkLoadService } from "@/domain/kubernetes/workloads/iworkload-service";
import { IocTypes } from "@/shared/config/ioc-types";
import {
    SaveOutlined
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

// import "../description.less";



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
const WorkLoadConfigOperation = (props: any) => {
    const _nameSpaceService: INameSpaceService = useHookProvider(IocTypes.NameSpaceService);
    const _clusterService: IClusterService = useHookProvider(IocTypes.ClusterService);
    const _environmentService: IEnvironmentService =
        useHookProvider(IocTypes.EnvironmentService);
    const _workLoadService: IWorkLoadService = useHookProvider(IocTypes.WorkLoadService);
    const [loading, setLoading] = useState<boolean>(false);
    const [clusterId, setClusterId] = useState<string>('');
    const [nameSpaceArrayData, setNameSpaceArrayData] = useState<Array<INameSpaceOutputDto>>([]);
    const [environmentData, setEnvironmentData] = useState<Array<any>>([]);
    const [clusterData, setClusterData] = useState<Array<IClusterOutputDto>>([]);
    const [workLoadFormData] = Form.useForm();
    const history = useHistory();
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
        if (props.location.state && props.location.state.id) {
            onClusterList();
            onGetNameSpaceList();
            onGetEnvironmentList();
            onGetWorkLoadDetail(props.location.state.id)
        }
        else {
            history.push({
                pathname: "/home",
            });
        }

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
    const onGetWorkLoadDetail = (_id: string) => {
        setLoading(true);
        _workLoadService.getWorkLoadDetail(_id).then(rep => {
            if (rep.success) {
                console.log(rep.result);
                workLoadFormData.setFieldsValue(rep.result);
                onChangeClusterId(rep.result.clusterId);
            } else {
                message.error(rep.errorMessage, 3);
            }
        }).finally(() => {
            setLoading(false);
        })

    }
    /**
       * 底部栏OK事件
       */
    const onFinish = () => {


    };



    /**
     * 修改事件
     */
    const onUpdate = (_id: string) => {

    };


    return (
        <div style={{ height: "100%" }}>
            <Spin style={{ height: "100%" }} spinning={loading} >
                <Row className="search-panel">
                    <Row className="search-button">
                        <Button
                            style={{ margin: "8px 8px" }}
                            icon={<SaveOutlined />}
                            onClick={() => {
                            }}>
                            保存部署计划
                        </Button>
                    </Row>
                </Row>
                <Layout className="workload-config-layout">
                    <Layout.Content className="workload-config-content">

                        <Card size="small" title="工作负载" extra={<a href="#">运维插件</a>}>
                            <Form
                                form={workLoadFormData}
                                name="nest-messages"
                                layout="vertical"
                                validateMessages={validateMessages}
                            >

                            </Form>
                        </Card>
                    </Layout.Content>
                    <Layout.Sider theme="light" className="workload-config-sider">
                        <Card size="small" title="基本信息">
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
                        </Card>
                    </Layout.Sider>
                </Layout>
            </Spin>
        </div>
    )
}
export default WorkLoadConfigOperation;