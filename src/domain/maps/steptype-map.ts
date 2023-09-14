import { StepTypeEnum } from "../applicationpipelines/applicationpipeline-enum";

/**
 * 状态列表下来选择数组
 */
export const StepTypeMap = [
    {
        key: StepTypeEnum.pullCode,
        value: "拉取代码"
    },
    {
        key: StepTypeEnum.compilePublish,
        value: "编译发布"
    },
    {
        key: StepTypeEnum.DockerFilePublishAndBuildImage,
        value: "构建镜像"
    },
    {
        key: StepTypeEnum.executeCommand,
        value: "执行命令"
    }
]