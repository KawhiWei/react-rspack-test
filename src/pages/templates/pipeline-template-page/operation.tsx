import "../../drawer.less";

import {
  ApplicationLevelMap,
  ApplicationStateMap,
} from "@/domain/maps/application-map";
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import {
  formItemDoubleRankLayout,
  formItemSingleRankLayout,
  tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useRef, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IBuildImageService } from "@/domain/buildimages/ibuildimage-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineFlow from "@/pages/pipeline-operation-component-page/pipeline-flow"
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

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

const Operation = (props: any) => {
  const pipelineStageRef = useRef(null);

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

  const onFinish = () => {


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
