import "../../drawer.less";

import {
  Form,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IStageDto } from "@/domain/application-pipelines/application-pipeline-dto";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineFlow from "@/pages/pipeline-operation-component-page/pipeline-flow"
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const Operation = (props: any) => {

  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [formData] = Form.useForm();
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onLoad();
  }, [formData]);

  /**
   * 编辑获取一个表单
   * @param _id
   */
  const onLoad = () => {
    switch (props.operationType) {
      case OperationTypeEnum.add:
        // formData.setFieldsValue(initformData);
        break;
      case OperationTypeEnum.view:
        break;
      case OperationTypeEnum.edit:
        props.id &&
          _applicationService.getDetail(props.id).then((rep) => {
            if (rep.success) {
              formData.setFieldsValue(rep.result.application);
            } else {
              message.error(rep.errorMessage, 3);
            }
          });
        break;
    }
  };



  const onSetStageArray = (_stageArray: Array<IStageDto>) => {
    // console.log(_stageArray)
  };


  return (
    <div style={{ height: "100%" }}>
      <PipelineFlow stageArray={[]} onCallbackEvent={onSetStageArray} />
    </div>
  );
};
export default Operation;
