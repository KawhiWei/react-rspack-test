import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { ComponentCategoryMap, ComponentTypeMap } from "@/domain/maps/componentintegration-map";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SettingTwoTone,
  WarningOutlined,
} from "@ant-design/icons";
import {
  formItemSingleRankLayout,
  searchFormItemDoubleRankLayout,
  tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IComponentIntegrationService } from "@/domain/componentintegration/icomponentintegration-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * Id
   */
  id?: string;

  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;

  /**
   * 操作类型
   */
  operationType: OperationTypeEnum;
}

const Operation = (props: IProp) => {
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });
  const _componentIntegrationService: IComponentIntegrationService =
    useHookProvider(IocTypes.ComponentIntegrationService);

  const [formData] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);

  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onGetLoad();
  }, [formData]);

  /**
   *
   */
  const onGetLoad = () => {
    switch (props.operationType) {
      case OperationTypeEnum.add:
        editOperationState(true, "添加");
        // formData.setFieldsValue(initformData);
        break;
      case OperationTypeEnum.view:
        editOperationState(true, "查看");
        break;
      case OperationTypeEnum.edit:
        props.id &&
          _componentIntegrationService.getDetail(props.id).then((rep) => {
            if (rep.success) {
              formData.setFieldsValue(rep.result);
              editOperationState(true, "修改");
            }
          });
        break;
    }
  };
  /**
   * 底部栏OK事件
   */
  const onFinish = () => {
    formData.validateFields().then((values) => {
      let param = formData.getFieldsValue();
      switch (props.operationType) {
        case OperationTypeEnum.add:
          onAdd(param);
          break;
        case OperationTypeEnum.edit:
          onUpdate(param);
          break;
      }

    })
      .catch((error) => {
      });


  };

  const onAdd = (_param: any) => {
    setLoading(true);
    _componentIntegrationService
      .add(_param)
      .then((rep) => {
        if (!rep.success) {
          message.error(rep.errorMessage, 3);
        } else {
          message.success("保存成功", 3);
          props.onCallbackEvent && props.onCallbackEvent();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onUpdate = (_param: any) => {
    setLoading(true);
    props.id &&
      _componentIntegrationService
        .update(props.id, _param)
        .then((rep) => {
          if (!rep.success) {
            message.error(rep.errorMessage, 3);
          } else {
            message.success("保存成功", 3);
            props.onCallbackEvent && props.onCallbackEvent();
          }
        })
        .finally(() => {
          setLoading(false);
        });
  };

  /**
   * 弹框取消事件
   */
  const onCancel = () => {
    editOperationState(false);
    props.onCallbackEvent && props.onCallbackEvent();
  };

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

  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  };

  return (
    <div>
      <Drawer
        style={{ borderRadius: 6 }}
        width="600"
        title={
          <div
            style={{
              borderRadius: 10,
            }}
          >
            {operationState.title}
          </div>
        }
        onClose={() => onCancel()}
        closable={true}
        open={operationState.visible}
        footer={
          <Space style={{ float: "right" }}>
            <Button
              shape="round"
              disabled={loading}
              onClick={() => onCancel()}
            >
              取消
            </Button>
            <Button
              shape="round"
              style={{ margin: "0 8px" }}
              type="primary"
              loading={loading}
              onClick={() => onFinish()}
            >
              保存
            </Button>
          </Space>
        }>
        <Form
          form={formData}
          name="nest-messages"
          layout="vertical"
          validateMessages={validateMessages}
        >
          <Row>
            <Col span="24">
              <Form.Item
                name="name"
                label="集成名称"
                rules={[{ required: true }]}
              >
                <Input
                  style={{ borderRadius: 6 }}
                  disabled={props.operationType === OperationTypeEnum.edit}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form.Item
                name="componentType"
                label="组件类型"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  {ComponentTypeMap.map((item: any) => {
                    return <Radio value={item.key}>{item.value}</Radio>;
                  })}
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form.Item
                name="componentCategory"
                label="组件分类"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  {ComponentCategoryMap.map((item: any) => {
                    return <Radio value={item.key}>{item.value}</Radio>;
                  })}
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form.Item
                name="componentLinkUrl"
                label="链接地址"
                rules={[{ required: true }]}
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span="24">
              <Form.Item
                name="userName"
                label="用户名"
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form.Item
                name="passWord"
                label="密码/Token"
              >
                <Input style={{ borderRadius: 6 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};
export default Operation;
