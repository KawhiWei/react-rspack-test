import { IStepDto } from "../applicationpipelines/applicationpipeline-dto";
import { StepTypeEnum } from "../applicationpipelines/applicationpipeline-enum";
import { publicDecrypt } from "crypto";

export interface IPipelinetemplatedto {

}


export interface ITaskCategoryDto {
    /***
     * 分类名称
     */
    name: string;

    /**
     * 阶段集合
     */
    tasks: Array<ITaskTypeDto>;
}

export interface ITaskTypeDto extends IStepDto {
    icon: string;
}

