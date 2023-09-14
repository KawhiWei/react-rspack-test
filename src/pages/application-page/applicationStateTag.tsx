import { ApplicationStateEnum } from "@/domain/applications/applicationstate-enum";
import { Tag } from "antd";

interface IProp {
  /**
   * 枚举值
   */
  applicationState: ApplicationStateEnum;
  /**
   * 枚举描述
   */
  applicationStateName: string;
}

/**
 * 应用看板
 * @returns
 */
const ApplicationStateTag = (props: IProp) => {
  /**
   * 处理标签
   * @param _projectStatus
   * @returns
   */
  const applicationStateTag = (
    _applicationState: ApplicationStateEnum
  ): string => {
    switch (_applicationState) {
      case ApplicationStateEnum.notStart:
        return "orange";
      case ApplicationStateEnum.underDevelopment:
        return "processing";
      case ApplicationStateEnum.notOnline:
        return "magenta";
      case ApplicationStateEnum.onlineRunning:
        return "success";
      case ApplicationStateEnum.offline:
        return "error";
      default:
        return "";
    }
  };

  return (
    <div>
      <Tag color={applicationStateTag(props.applicationState)}>
        {props.applicationStateName}
      </Tag>
    </div>
  );
};
export default ApplicationStateTag;
