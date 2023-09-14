import "../drawer.less";
import "../search-panel.less"

import { Button, Row, Spin, message } from "antd";
import { IApplicationPipelineFlowUpdateInputDto, IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import {
  PlusOutlined,
  SaveOutlined
} from "@ant-design/icons";
import { useEffect, useReducer, useState } from "react";

import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplication-pipeline-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import PipelineFlow from "../pipeline-operation-component-page/pipeline-flow";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const initialize: IApplicationPipelineFlowUpdateInputDto = {
  pipelineScript: []
};

/**
 * 应用流水线设计
 */
const PipeFlowConfig = (props: any) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [applicationPipelineBasicElement, setApplicationPipelineBasicElement] = useState<any>(null);
  const [applicationPipelineId, setApplicationPipelineId] = useState<string>("");
  const [applicationPipeline, setApplicationPipelineStageArray] = useReducer((state: IApplicationPipelineFlowUpdateInputDto, payload: IApplicationPipelineFlowUpdateInputDto) => ({ ...state, ...payload }), initialize);
  const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetLoad();
  }, []);
  /**
   *
   */
  const onGetLoad = () => {
    if (props.location.state && props.location.state.id) {
      setLoading(true)
      setApplicationPipelineId(props.location.state.id)
      _applicationPipelineService.getDetail(props.location.state.id).then(resp => {
        if (resp.success) {
          setApplicationPipelineStageArray({ pipelineScript: resp.result.pipelineScript })
        }
      }).finally(() => {
        setLoading(false)
      })
    } else {

      history.push({
        pathname: "/home",
      });

    }
  };

  /***
   * 
   */
  const onSetStageArray = (_stageArray: Array<IStageDto>) => {
    setApplicationPipelineStageArray({
      pipelineScript: _stageArray
    });
  };

  /**
  * 清空流水线基础配置抽屉组件
  */
  const clearApplicationPipelineBasicOperation = () => {
    setApplicationPipelineBasicElement(null);
    setLoading(false);
  };

  /**
   * 抽屉确认回调事件，判断是否需要前往流水线配置界面
  * @param _isGotoPipelineConfig 
  * @param _id 
  */
  const ConfirmCallbackEvent = (_isGotoPipelineConfig: boolean, _id: string) => {
    clearApplicationPipelineBasicOperation();
    setLoading(false);
  }

  /**
   * 抽屉确认回调事件，判断是否需要前往流水线配置界面
    */
  const onSave = () => {
    setLoading(true)
    props.location.state.id && _applicationPipelineService.updatePipelineFlow(props.location.state.id, applicationPipeline)
      .then(resp => {
        if (!resp.success) {
          message.error(resp.errorMessage, 3);
        }
        else {
          message.success("保存成功", 3);
          setLoading(false)
        }
      }
      ).finally(() => {
        setLoading(false)
      })
  }

  /**
   * 
   */
  const showApplicationPipelineBasicOperation = () => {
    setLoading(true);
    setApplicationPipelineBasicElement(
      <Operation
        appId=""
        id={applicationPipelineId}
        onConfirmCallbackEvent={ConfirmCallbackEvent}
        onCancelCallbackEvent={clearApplicationPipelineBasicOperation}
        operationType={OperationTypeEnum.edit}
      />
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <Spin spinning={loading}>
        <Row className="search-panel">
          <Row className="search-button">
            <Button
              style={{ margin: "8px 8px" }}
              icon={<SaveOutlined />}
              onClick={() => {
                onSave();
              }}>
              保存构建计划
            </Button>
          </Row>
        </Row>
        <PipelineFlow stageArray={applicationPipeline.pipelineScript} onCallbackEvent={onSetStageArray} onEditPipeLineInformationCallbackEvent={showApplicationPipelineBasicOperation} />
      </Spin>
      {applicationPipelineBasicElement}
    </div>
  );
};

export default PipeFlowConfig;
