import { useEffect, useState } from 'react';

import { Table } from 'antd';

interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
    /**
     * Id
     */
    id?: string;

    tableData:Array<any>;
}
const NodeIndex = (props: IProp) => {
    const columns = [
        {
          title: "节点名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Kubenetes版本",
          dataIndex: "kubernetesVersion",
          key: "kubernetesVersion",
        },
        {
          title: "Kubenetes运行时类型",
          dataIndex: "containerRuntimeVersion",
          key: "containerRuntimeVersion",
        },
        {
          title: "操作系统",
          dataIndex: "osImage",
          key: "osImage",
        },
        {
          title: "操作系统类型",
          dataIndex: "operatingSystem",
          key: "operatingSystem",
        },
    
        {
          dataIndex: 'name',
          title: '节点资源(总量/已用)',
          key: "name",
          render: (text: any, record: any) => {
            return (<div>
              {
                <div>
                  <div>CPU：{record.capacityResource.cpu.toFixed(2) + "/" + record.usageResource.cpu.toFixed(2)}(核)</div>
                  <div>CPU：{record.capacityResource.memory.toFixed(2) + "/" + record.usageResource.memory.toFixed(2)}(GB)</div>
                </div>
              }
            </div>)
          }
        },
        {
          dataIndex: 'name',
          title: 'IP地址',
          key: "name",
          render: (text: any, record: any) => {
            return (<div>
              {
                record.ipAddresses.map((item: any) => (
                  <div>{item.name + "：" + item.address}<br /></div>
                ))}
            </div>)
          }
        },
        {
          title: "联系人",
          dataIndex: "linkMan",
          key: "linkMan",
        },
      ];
  useEffect(() => {
  }, [])
  return (
    <>
    <Table bordered columns={columns} dataSource={props.tableData} scroll={{ y: 700 }} />
    </>
  )
}
export default NodeIndex;