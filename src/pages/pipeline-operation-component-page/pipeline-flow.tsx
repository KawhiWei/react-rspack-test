import "./pipeline-flow.less"

import {
  DeleteOutlined,
  EditFilled,
  FormOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import {
  IStageDto,
  IStepDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import { useEffect, useState } from "react";

import StepOperation from "./step-operation";
import TaskList from "./task-list";
import _ from "lodash";

interface IProp {
  /**
     * 回调事件
     */
  onCallbackEvent: any;

  /**
   * 
   */
  stageArray: Array<IStageDto>;

  /**
   * 流水线信息编辑回调事件，用于编辑基础信息弹框使用
   */
  onEditPipeLineInformationCallbackEvent?: any;
}

/***
 * 应用流水线设计
 */
const PipelineFlow = (props: IProp) => {
  const [stepOperationElement, setStepOperationElement] = useState<any>(null);
  const [taskListElement, setTaskListElement] = useState<any>(null);

  useEffect(() => {
  }, [props.stageArray]);

  /**
   * 清空任务列表组件
   */
  const clearTaskListElement = () => {
    setTaskListElement(null)
  }

  /**
   * 清空任务步骤编辑抽屉
   */
  const clearStepOperationElement = () => {
    setStepOperationElement(null)
  }


  /**
   * 显示任务列表抽屉
   */
  const onShowTaskList = (_stageIndex: number) => {
    setTaskListElement(<TaskList
      stageIndex={_stageIndex}
      onConfirmCallbackEvent={onAddStep}
      onCancelCallbackEvent={clearTaskListElement}
    />)
  };


  /**
   * 删除Stage
   */
  const onRemoveStage = (_stageIndex: number) => {
    let { stageArray } = props;
    stageArray.splice(_stageIndex, 1);
    props.onCallbackEvent(stageArray)
  };



  /**
   * 添加阶段
   */
  const onAddStep = (_stageIndex: number, _categoryName: string, step: IStepDto) => {
    let { stageArray } = props;
    if (_stageIndex < 0) {
      let stage: IStageDto = {
        name: _categoryName,
        steps: [step],
      }
      stageArray.push(stage);
    }
    else {
      stageArray.filter((item, index) => {
        if (index === _stageIndex) {
          item.steps.push(step);
        }
        return item;
      });
    }
    clearTaskListElement();
    props.onCallbackEvent(stageArray)
  };

  /**
   * 编辑阶段
   */
  const onEditStep = (_stageIndex: number, _stepIndex: number, _step: IStepDto) => {
    let { stageArray } = props;
    let stage = stageArray[_stageIndex];
    if (stage) {
      stage.steps.filter((step, index) => {
        if (index === _stepIndex) {
          step = _step
        }
        return step;

      })
    }
    clearStepOperationElement();
    props.onCallbackEvent(stageArray)
  };

  /**
   * 显示任务编辑抽屉
   */
  const onShowStepOperation = (_stageIndex: number, _stepIndex: number, _step: IStepDto) => {
    setStepOperationElement(
      <StepOperation
        onConfirmCallbackEvent={onEditStep}
        onCancelCallbackEvent={clearStepOperationElement}
        step={_step}
        stageIndex={_stageIndex}
        stepIndex={_stepIndex}
      ></StepOperation>
    )
  };

  /**
   * 删除步骤
   */
  const onRemoveStep = (_stageIndex: number, _stepIndex: number) => {
    let { stageArray } = props;
    stageArray.filter((item, index) => {
      if (index === _stageIndex) {
        item.steps.splice(_stepIndex, 1);
      }
      return item;
    });
    let currentStage = stageArray[_stageIndex];
    if (currentStage && currentStage.steps.length <= 0) {
      stageArray.splice(_stageIndex, 1);
    }
    props.onCallbackEvent(stageArray)
  };

  /**
   * 删除步骤
   */
  const onPipeLineInformationCallbackEvent = () => {
    props.onEditPipeLineInformationCallbackEvent && props.onEditPipeLineInformationCallbackEvent();
  }


  return (
    <div className="pipeline-flow">
      <div className="pipeline-flow-content">
        <div className="pipeline-flow-groups-container">
          <div className="pipeline-flow-groups">
            <div className="flow-group-content flow-group-create">
              <div className="flow-group-split-line">
                <div className="flow-group-split-line-button">
                </div>
              </div>
              <div className="flow-group">
                <div className="group-head">
                  <div className="editable-label">
                    <span className="group-head-title">流水线信息</span>
                  </div>
                </div>
                <div className="steps">
                  <div className="flow-job-content flow-basic-edit-information" onClick={() => onPipeLineInformationCallbackEvent()}>
                    <EditFilled /><span className="flow-job-create-title">编辑流水线信息</span>
                  </div>
                </div>
              </div>
            </div>

            {props.stageArray.map(
              (stage: IStageDto, stageIndex) => {
                return (
                  <div className="flow-group-content">
                    <div className="flow-group-split-line">
                      <div className="flow-group-split-line-button">
                      </div>
                    </div>
                    <div className="flow-group">
                      <div className="group-head">
                        <div className="editable-label">
                          <span className="group-head-title">{stage.name}</span>
                          <span className="group-head-title"><FormOutlined /></span>
                          <span className="group-head-title"><DeleteOutlined onClick={() => onRemoveStage(stageIndex)} style={{ color: "red" }} /></span>
                        </div>
                      </div>

                      {
                        stage.steps.map((step: IStepDto, stepIndex) => {
                          return (<div className="flow-job-step-container">
                            <div className="flow-job-content">
                              <span className="flow-job-content-title">{step.name}</span>
                              <span className="flow-job-content-title"><FormOutlined onClick={() => onShowStepOperation(stageIndex, stepIndex, step)} /></span>
                              <span className="flow-job-content-title"><DeleteOutlined onClick={() => onRemoveStep(stageIndex, stepIndex)} style={{ color: "red" }} /></span>
                            </div>
                          </div>)
                        })
                      }

                      <div className="flow-job-step-container">
                        <div className="flow-job-step-container-create" onClick={() => onShowTaskList(stageIndex)}>
                          <span className="flow-job-container-create-title">新的步驟</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}

            <div className="flow-group-content flow-group-create">
              <div className="flow-group-split-line">
                <div className="flow-group-split-line-button">
                </div>
              </div>
              <div className="flow-group">
                <div className="group-head">
                  <div className="editable-label">
                    <span className="group-head-title">新阶段</span>
                  </div>
                </div>
                <div className="steps">
                  <div className="flow-job-content flow-job-content-create" onClick={() => onShowTaskList(-1)}>
                    <span className="flow-job-create-title"><PlusCircleOutlined /></span>
                    <span className="flow-job-create-title">新的任务</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {stepOperationElement}
      {taskListElement}
    </div>
  );
};

export default PipelineFlow;
