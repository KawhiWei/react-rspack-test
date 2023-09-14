import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Steps,
} from "antd";
import {
  formItemSingleRankLayout,
  tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IStepDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import { StepTypeMap } from "@/domain/maps/steptype-map";
import TextArea from "antd/lib/input/TextArea";

interface IProp {
  /**
   * 编辑数据
   */
  step: IStepDto;

  /**
   * 确认事件回调
   */
  onConfirmCallbackEvent: any;

  /**
   * 取消事件回调
   */
  onCancelCallbackEvent: any;

  /**
   * 下标
   */
  stageIndex: number;

  /**
   * 当前编辑步骤的下标
   */
  stepIndex: number;

}

const items = [
  {
    title: "步骤类型",
    description: "",
  },
  {
    title: "步骤信息设置",
    description: "",
  },
];
/***
 * 步骤添加和编辑弹框
 */
const StepOperation = (props: IProp) => {
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
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });

  const [pullCodeFormData] = Form.useForm();
  const [buildImageFormData] = Form.useForm();
  const [compilePublishFormData] = Form.useForm();

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetLoad();
  }, []);

  /**
   * 弹框取消事件
   */
  const onCancel = () => {
    editOperationState(false);
    props.onCancelCallbackEvent();
  };

  /**
   * 编辑获取一个表单
   * @param _id
   */
  const onGetLoad = () => {
    switch (props.step.stepType) {
      case StepTypeEnum.pullCode:
        if (props.step.content !== "") {
          pullCodeFormData.setFieldsValue(JSON.parse(props.step.content));
        }
        break;
      case StepTypeEnum.DockerFilePublishAndBuildImage:
        if (props.step.content !== "") {
          buildImageFormData.setFieldsValue(JSON.parse(props.step.content));
        }
        break;
      case StepTypeEnum.compilePublish:
        if (props.step.content !== "") {
          compilePublishFormData.setFieldsValue(JSON.parse(props.step.content));
        }
        break;
    }
    editOperationState(true, "编辑任务");
  };

  /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  };

  /**
   * 底部栏OK事件
   */
  const onFinish = () => {
    let { step } = props;
    let name = "";
    switch (props.step.stepType) {
      case StepTypeEnum.pullCode:
        step.name = pullCodeFormData.getFieldValue("name");
        step.content = JSON.stringify(pullCodeFormData.getFieldsValue());
        break;
      case StepTypeEnum.DockerFilePublishAndBuildImage:
        step.name = buildImageFormData.getFieldValue("name");
        step.content = JSON.stringify(buildImageFormData.getFieldsValue());
        break;
      case StepTypeEnum.compilePublish:
        step.name = compilePublishFormData.getFieldValue("name");
        step.content = JSON.stringify(compilePublishFormData.getFieldsValue());
        break;
    }
    props.onConfirmCallbackEvent(props.stageIndex, props.stepIndex, step)

  };


  return (
    <div>
      <Drawer
        width="600"
        style={{ borderRadius: 6 }}
        onClose={onCancel}
        title={
          <div
            style={{
              borderRadius: 10,
            }}
          >
            {operationState.title}
          </div>
        }
        closable={false}
        open={operationState.visible}
        footer={
          <Space style={{ float: "right" }}>
            <Button
              shape="round"
              onClick={() => onCancel()}
            >
              取消
            </Button>
            <Button
              shape="round"
              style={{ margin: "0 8px" }}
              type="primary"
              onClick={() => onFinish()}
            >
              保存
            </Button>
          </Space>}
      >
        {props.step.stepType === StepTypeEnum.pullCode ? (
          <Form
            form={pullCodeFormData}
            name="nest-messages"
            layout="vertical"
            validateMessages={validateMessages}
          >
            <Row>
              <Col span="24">
                <Form.Item
                  name="name"
                  label="任务名称"
                  rules={[{ required: true }]}
                >
                  <Input style={{ borderRadius: 6 }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Form.Item
                  name="branch"
                  label="分支"
                  rules={[{ required: true }]}
                >
                  <Input style={{ borderRadius: 6 }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : null}
        {
          props.step.stepType === StepTypeEnum.compilePublish ? (
            <Form
              form={compilePublishFormData}
              {...formItemSingleRankLayout}
              name="nest-messages"
              layout="vertical"
              validateMessages={validateMessages}
              initialValues={compilePublishFormData}
            >
              <Row>
                <Col span="24">
                  <Form.Item
                    name="buildImageName"
                    label="依赖镜像："
                    rules={[{ required: true }]}
                  >
                    <Input style={{ borderRadius: 6 }} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <Form.Item
                    name="version"
                    label="镜像版本："
                    rules={[{ required: true }]}
                  >
                    <Select
                      style={{ width: 180 }}
                      allowClear={true}
                      placeholder="请选择镜像版本"
                    >

                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <Form.Item
                    name="compileScript"
                    label="编译命令："
                    rules={[{ required: true }]}
                  >
                    <TextArea autoSize={{ minRows: 6, maxRows: 16 }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span="24" style={{ textAlign: "right" }}>
                  <Form.Item {...tailLayout}>
                    <Button shape="round" onClick={() => onCancel()}>
                      取消
                    </Button>
                    <Button
                      shape="round"
                      style={{ margin: "0 8px" }}
                      type="primary"
                      onClick={() => onFinish()}
                    >
                      保存
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          ) : null}
        {
          props.step.stepType === StepTypeEnum.DockerFilePublishAndBuildImage ? (
            <Form
              form={buildImageFormData}
              name="nest-messages"
              layout="vertical"
              validateMessages={validateMessages}
              initialValues={buildImageFormData}
            >
              <Row>
                <Col span="24">
                  <Form.Item
                    name="name"
                    label="名称："
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <Form.Item
                    name="dockerFileSrc"
                    label="DockerFile路径"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          ) : null}
      </Drawer>
    </div>
  );
};

export default StepOperation;
