import { PipelineBuildStateEnum, StepTypeEnum } from "./applicationpipeline-enum";

import { IEntity } from "@/shared/entity";

/**
 * 流水线Dto模型接口
 */
export interface IApplicationPipelineBaseDto {


    /**
     * 应用标识
     */
    appId: string;

    /**
    * 流水线名称
    */
    name: string;

    /**
     * 构建组件
     */
    buildComponentId: string;

    /**
     * 构建运行镜像
     */
    continuousIntegrationImage: string;

    /**
     * 镜像仓库配置
     */
    imageWareHouseComponentId: string;
    

}
/**
 * 流水线编辑输入Dto
 */
export interface IApplicationPipelineInputDto extends IApplicationPipelineBaseDto, IEntity<string> {

}

/**
 * 流水线编辑输入Dto
 */
export interface IApplicationPipelineFlowUpdateInputDto  {
    /**
     * 流水线Dsl
     */
    pipelineScript: Array<IStageDto>;
}
/**
 * 流水线Dto模型接口
 */
export interface IApplicationPipelineOutputDto extends IApplicationPipelineBaseDto, IEntity<string> {
    /**
     * 
     */
    nextPipelineId: string;
    /**
     * 流水线状态
     */
    pipelineBuildStateName: string;

    /**
     * 流水线Dsl
     */
    pipelineScript: Array<IStageDto>;

    /**
     * JenkinsBuild的Id
     */
    jenkinsBuildNumber: number;

    /**
     * 流水线状态
     */
    pipelineBuildState: PipelineBuildStateEnum;

    /**
     * 是否发布
     */
    published: boolean;

    /**
     * 最后一次执行任务的Id
     */
    lastApplicationPipelineExecutedRecordId: string,

}




/**
 * 步骤Dto
 */
export interface IStageDto {
    /***
     * 步骤名称
     */
    name: string;

    /**
     * 阶段集合
     */
    steps: Array<IStepDto>;

}

/**
 * 阶段Dto
 */
export interface IStepDto {
    /***
     * 阶段名称
     */
    name: string;

    /**
     * 步骤类型
     */
    stepType: StepTypeEnum;

    /**
     * 执行内容
     */
    content: string;
}


/**
 * 拉取代码Dto
 */
export interface IStepContentBaseDto {
    /***
     * 阶段名称
     */
    name: string;
}

/**
 * 拉取代码Dto
 */
export interface IPipelinePullCodeStepDto extends IStepContentBaseDto {

    /**
     * 分支
     */
    branch: string;
}


/**
 * 拉取代码Dto
 */
export interface IPipelineDockerPublishAndBuildImageStepDto extends IStepContentBaseDto {

    /**
     * DockerFile路径
     */
    dockerFileSrc: string;
}