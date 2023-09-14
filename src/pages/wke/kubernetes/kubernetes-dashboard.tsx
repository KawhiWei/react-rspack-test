import { AntDesignChartsRadarDto, KubernetesClusterDashboardDto } from "@/domain/kubernetes/clusters/kubernetes-cluster-dto";
import { Area, G2, Liquid, Pie, Radar, RingProgress } from "@ant-design/charts";
import {
  Card,
  Col,
  Divider,
  List,
  Progress,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { useEffect, useState } from "react";

import { IClusterService } from "@/domain/kubernetes/clusters/icluster-service";
import { IocTypes } from "@/shared/config/ioc-types";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const KubernetesDashboard = (props: any) => {
  const G = G2.getEngine('canvas');

  const _clusterService: IClusterService = useHookProvider(
    IocTypes.ClusterService
  );

  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<Array<any>>([]);
  const [selectValue, setSelectValue] = useState<string>("");
  const [radarData, setRadarData] = useState<Array<AntDesignChartsRadarDto>>(
    []
  );
  const [cpuUsagePercent, setCpuUsagePercent] = useState<number>(0);
  const [memoryUsagePercent, setMemoryUsagePercent] = useState<number>(0);
  const [nodeReadyPercent, setNodeReadyPercent] = useState<number>(0);
  const [podUsagePercent, setPodUsagePercent] = useState<number>(0);
  const [kubernetesClusterDashboardData, setKubernetesClusterDashboardData] = useState<KubernetesClusterDashboardDto>();


  const data = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];
  const overviewConfig = {
    appendPadding: 10,
    data: radarData.map((d) => ({ ...d, star: Math.sqrt(d.count) })),
    angleField: "count",
    colorField: "name",
    radius: 0.5,
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data: any, mappingData: any) => {
        const group = new G.Group({});
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.name}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.count}个 ${(data.percent * 100).toFixed(2)}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const cpuUsagePercentConfig = {
    percent: cpuUsagePercent,
    height: 150,
    shape: 'diamond',
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },
  };

  const memoryUsagePercentConfig = {
    percent: memoryUsagePercent,
    height: 150,
    shape: 'diamond',
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },

  };

  const nodeReadyPercentConfig = {
    percent: nodeReadyPercent,
    height: 150,
    shape: 'diamond',
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },

  };
  const podUsagePercentConfig = {
    percent: podUsagePercent,
    height: 150,
    shape: 'diamond',
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },

  };
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetClusterList();
  }, []);

  /**
   *获取集群列表
   */
  const onGetClusterList = () => {
    _clusterService
      .getClusterList()
      .then((rep) => {
        setSelectData(rep.result);
      })
      .finally(() => {
        setGlobalLoading(false);
      });
  };

  /**
   *
   * @param value
   */
  const selectHandleChange = (value: string) => {
    setSelectValue(value);
    onGetClusterDashboard(value);
  };

  /**
   * 获取K8s集群可视化面板信息
   * @param _id
   */
  const onGetClusterDashboard = (_id: string) => {
    _clusterService
      .getClusterDashboard(_id)
      .then((rep) => {
        const data: AntDesignChartsRadarDto[] = [
          {
            name: "namespace",
            count: rep.result.namespaceTotal,
          },
          {
            name: "replicaSet",
            count: rep.result.replicaSetTotal,
          },
          {
            name: "statefulSet",
            count: rep.result.statefulSetTotal,
          },
          {
            name: "jobTotal",
            count: rep.result.jobTotal,
          },
          {
            name: "daemonSet",
            count: rep.result.daemonSetTotal,
          },
          {
            name: "deployment",
            count: rep.result.deploymentTotal,
          },
          {
            name: "node",
            count: rep.result.nodes.length,
          },
        ];
        setKubernetesClusterDashboardData(rep.result)
        setRadarData(data);
        setCpuUsagePercent(rep.result.clusterTotalCpuUsage / rep.result.clusterTotalCpuCapacity);
        setMemoryUsagePercent(rep.result.clusterTotalMemoryUsage / rep.result.clusterTotalMemoryCapacity);
        setNodeReadyPercent(rep.result.nodes.length / rep.result.nodes.length);
        setPodUsagePercent(rep.result.clusterTotalPodUsage / rep.result.clusterTotalPodCapacity)

      })
      .finally(() => { });
  };

  return (
    <div>
      <Spin spinning={globalLoading}>
        <Row gutter={[10, 10]}>
          <Col span="16">
            <Row gutter={[10, 10]}>
              <Card style={{ width: '100%' }}>
                <Row style={{ fontSize: 20, color: '#bdc3c7' }}>
                  Luck WKE  kubernetes Dashboard
                </Row >
                <Row style={{ color: '#bdc3c7', paddingTop: 10 }}>
                  Luck Walnut is an PaaS Platform, An Cloud-Native Application Platform for Kubernetes.
                </Row>
                <Row style={{ paddingTop: 10 }}>
                  <Col span="12">
                    集群列表：
                    <Select
                      allowClear={true}
                      value={selectValue}
                      style={{ width: 180 }}
                      onChange={selectHandleChange}
                    >
                      {selectData.map((item) => {
                        return (
                          <Select.Option value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Col>
                </Row>
              </Card>
            </Row>
            <Row gutter={[10, 10]} style={{ paddingTop: 10 }}>
              <Col span="4">
                <Card title="Node Information">
                  <Liquid {...nodeReadyPercentConfig} />
                </Card>
              </Col>
              <Col span="4">
                <Card title="Cpu Usage">
                  <Liquid {...cpuUsagePercentConfig} />
                </Card>
              </Col>
              <Col span="4">
                <Card title="Memory Usage">
                  <Liquid {...memoryUsagePercentConfig} />
                </Card>
              </Col>
              <Col span="4">

                <Card title="Pod Usage">
                  <Liquid {...podUsagePercentConfig} />
                </Card>

              </Col>
              <Col span="4">
                <Card title="Cpu Usage">
                  <RingProgress {...cpuUsagePercentConfig} />
                </Card>
              </Col>
              <Col span="4">
                <Card title="Cpu Usage">
                  <RingProgress {...cpuUsagePercentConfig} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span="8">
            <Card title="Overview">
              <Pie {...overviewConfig} />
            </Card>
          </Col>
        </Row>
        {/* <Row gutter={[10, 10]} style={{ paddingTop: 10 }}>
          <Col span="4">
            <Card title="Cpu Usage">
              <RingProgress {...cpuUsagePercentConfig} />
            </Card>
          </Col>
          <Col span="4">
            <Card title="Memory Usage">
              <RingProgress {...memoryUsagePercentConfig} />
            </Card>
          </Col>
          <Col span="4">
            <Card title="Pod Usage">
              <Pie {...overviewConfig} />
            </Card>
          </Col>
        </Row> */}
      </Spin>
    </div>
  );
};

export default KubernetesDashboard;
