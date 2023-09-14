import { Button, Card, Col, Drawer, Row } from "antd";
import {
  CheckCircleFilled,
  CloseOutlined,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";
import {
  IApplicationBaseDto,
  IApplicationDto,
} from "@/domain/applications/application-dto";
import {
  IApplicationPipelineOutputDto,
  IStageDto,
  IStepDto,
} from "@/domain/applicationpipelines/applicationpipeline-dto";
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IBuildImageService } from "@/domain/buildimages/ibuildimage-service";
import { IBuildImageVersionBaseDto } from "@/domain/buildimages/buildimage-dto";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { StepTypeEnum } from "@/domain/applicationpipelines/applicationpipeline-enum";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

/***
 * 应用流水线设计
 */
const JenkinsConfigPage = (props: any) => {
  return (
    <div>
      <Row style={{ height: "100%" }} gutter={[12, 12]}>

      </Row>
    </div>
  );
};

export default JenkinsConfigPage;
