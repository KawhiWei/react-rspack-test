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
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IBuildImageService } from "@/domain/build-images/ibuild-image-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
  /**
   * 操作成功回调事件
   */
  onCallbackEvent?: any;
  /**
   * Id
   */
  id?: string;
  /**
   * 操作类型
   */
  operationType: OperationTypeEnum;
  /**
   * 项目列表
   */
  projectArray: Array<any>;

  /**
   * 
   */
  componentIntegrationArray: Array<any>;

}

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

const Operation = (props: IProp) => {
  const _applicationService: IApplicationService = useHookProvider(
    IocTypes.ApplicationService
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [operationState, setOperationState] = useState<IOperationConfig>({
    visible: false,
  });
  const [formData] = Form.useForm();
  const projectArray = props.projectArray;
  const [languageArray, setLanguageArray] = useState<Array<any>>([]);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('top');

  const _buildImageService: IBuildImageService = useHookProvider(IocTypes.BuildImageService);
  const [imageList, setImageList] = useState<Array<any>>([]);
  /**
   * 页面初始化事件
   */
  useEffect(() => {
    onLoad();
    getLanguageList();
    getImageList();
  }, [formData]);

  /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
  const editOperationState = (_visible: boolean, _title?: string) => {
    setOperationState({ visible: _visible, title: _title });
  };
  const getLanguageList = () => {
    _applicationService.getLanguageList().then((rep) => {
      if (rep.success) {
        setLanguageArray(rep.result);
      }
    });
  };

  /**
   * 获取镜像下拉
   */
  const getImageList = () => {
    _buildImageService.getImageList().then((rep) => {
      if (rep.success) {
        setImageList(rep.result);
        console.log(rep)
      }
    })
  }

  /**
   * 编辑获取一个表单
   * @param _id
   */
  const onLoad = () => {
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
          _applicationService.getDetail(props.id).then((rep) => {
            if (rep.success) {
              formData.setFieldsValue(rep.result.application);
              editOperationState(true, "修改");
            } else {
              message.error(rep.errorMessage, 3);
            }
          });
        break;
    }
  };

  /**
   * 弹框取消事件
   */
  const onCancel = () => {
    editOperationState(false);
    props.onCallbackEvent && props.onCallbackEvent();
  };

  /**
   * 底部栏OK事件
   */
  const onFinish = () => {
    formData.validateFields().then((values) => {

      let param = formData.getFieldsValue();
      switch (props.operationType) {
        case OperationTypeEnum.add:
          onCreate(param);
          break;
        case OperationTypeEnum.edit:
          onUpdate(param);
          break;
      }
    })
      .catch((error) => {
      });


  };
  const onCreate = (_param: any) => {
    setLoading(true);
    _applicationService
      .createApplication(_param)
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
    props.id &&
      _applicationService
        .updateApplication(props.id, _param)
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

  return (
    <div>
      <Drawer
        width="30%"
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
          </Space>}
      >
        <Form
          form={formData}
          name="nest-messages"
          layout="vertical"
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
            label="应用名称："
            rules={[{ required: true }]}
          >
            <Input
              disabled={props.operationType === OperationTypeEnum.edit}
            />
          </Form.Item>
          <Form.Item
            name="appId"
            label="应用标识："
            rules={[{ required: true }]}
          >
            <Input
              disabled={props.operationType === OperationTypeEnum.edit}
            />
          </Form.Item>

          <Form.Item
            name="gitUrl"
            label="git地址："
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
export default Operation;
