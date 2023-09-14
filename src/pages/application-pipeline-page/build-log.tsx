import { useEffect, useState } from "react";

import { Drawer } from "antd";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplication-pipeline-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 阶段信息
   */
  id: string;

  /**
   * jenkins Build Id
   */
  applicationPipelineId:string;

  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;
}

const BuildLogs = (props: IProp) => {
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });

  const [logs, setLogs] = useState<string>("");
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
    _applicationPipelineService
      .getBuildLog(props.applicationPipelineId,props.id)
      .then((rep) => {
        if (rep.success) {
          setLogs(rep.result);
        }
      })
      .finally(() => {
        editOperationState(true, "执行日志");
      });
  };

  /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });

    if (!_visible) {
      props.onCallbackEvent && props.onCallbackEvent();
    }
  };
  return (
    <div>
      <Drawer
        title="执行日志"
        width={"80%"}
        placement="right"
        maskClosable={false}
        onClose={() => editOperationState(false)}
        open={operationState.visible}
      >
        <p style={{ whiteSpace: "pre" }}>{logs}</p>
      </Drawer>
    </div>
  );
};

export default BuildLogs;
