import 'antd/dist/antd.css';
import "./task-list.less"

import {
    Anchor,
    Card,
    Col,
    Drawer,
    Row
} from "antd";
import { IPipelineDockerPublishAndBuildImageStepDto, IPipelinePullCodeStepDto, IStepDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { useEffect, useState } from "react";

import { IOperationConfig } from "@/shared/operation/operationConfig";
import { StepTypeEnum } from '@/domain/applicationpipelines/applicationpipeline-enum';
import { taskList } from '@/constans/task';

interface IProp {

    /**
     * 回调事件
     */
    onConfirmCallbackEvent: any;


    /**
     * 取消回调事件
     */
    onCancelCallbackEvent?: any;

    /**
     * 阶段下标
     */
    stageIndex: number;
}

/***
 * 任务列表
 */
const TaskList = (props: IProp) => {
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        editOperationState(true, "选择任务");

    }, []);

    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    /**
     * 弹框取消事件
     */
    const onConfirm = (_categoryName: string, step: IStepDto) => {
        switch (step.stepType) {
            case StepTypeEnum.pullCode:
                let pullCodeContent: IPipelinePullCodeStepDto = {
                    name: step.name,
                    branch: "main"
                }
                step.content = JSON.stringify(pullCodeContent)
                break;
            case StepTypeEnum.DockerFilePublishAndBuildImage:
                let PipelineDockerPublishAndBuildImageContent: IPipelineDockerPublishAndBuildImageStepDto = {
                    name: step.name,
                    dockerFileSrc: "src"
                }
                step.content = JSON.stringify(PipelineDockerPublishAndBuildImageContent)
                break;
        }
        editOperationState(false);
        props.onConfirmCallbackEvent(props.stageIndex, _categoryName, step);
    };


    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false);
        props.onCancelCallbackEvent && props.onCancelCallbackEvent();
    };

    /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    };

    return (
        <div className="task-list">
            <Drawer
                width={600}
                style={{ borderRadius: 6 }}
                onClose={() => onCancel()}
                title={
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        {operationState.title}
                    </div>
                }
                open={operationState.visible}
                footer={null}
            >

                <div className="menu-wrapper">
                    <div className="menu-wrapper-body">
                        <div className="pipeline-stage-template-menu">

                            <div className="pipeline-stage-template-menu-body">

                                {/* <div className="pipeline-stage-template-menu-body-sidebar">
                                    <Anchor affix={true}>
                                        <Anchor.Link href="#components-anchor-demo-basic" title="代码扫描" />
                                        <Anchor.Link href="#components-anchor-demo-static" title="构建" />
                                        <Anchor.Link href="#Anchor-Props" title="测试" />
                                        <Anchor.Link href="#Link-Props" title="镜像构建" />
                                    </Anchor>
                                </div> */}
                                <div className="pipeline-stage-template-menu-body-content">
                                    {taskList.map(category => {
                                        return (
                                            <div>
                                                <div>{category.name}</div>
                                                <Row gutter={[15, 10]} style={{ marginTop: "10px" }} >

                                                    {
                                                        category.tasks.map(step => {
                                                            return (

                                                                <Col span={12}>
                                                                    <Card hoverable onClick={() => onConfirm(category.name, step)}>
                                                                        <div>{step.name}</div>
                                                                    </Card>
                                                                </Col>

                                                            )
                                                        })
                                                    }
                                                </Row>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default TaskList;

