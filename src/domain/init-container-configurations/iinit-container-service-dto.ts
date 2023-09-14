import { IContainerPortConfiguration, IContainerResourceQuantity, INessProbe } from "../kubernetes/workloads/workload-dto";

import { IEntity } from "@/shared/entity";

/**
 * 容器配置基础Dto
 */
export interface IInitContainerConfigurationBase {
    /**
     * 容器名称
     */
    containerName: string;
    /**
     * 重启策略
     */
    restartPolicy: string;
    /**
     * 是否初始容器
     */
    isInitContainer: boolean;
    /**
     * 镜像拉取策略
     */
    imagePullPolicy: string;
    /**
     * 镜像名称
     */
    image?: string;
    /**
     * 准备完成探针配置
     */
    readinessProbe?: INessProbe;
    /**
     * 存活探针配置
     */
    liveNessProbe?: INessProbe;
    /**
     * 容器Cpu资源限制
     */
    requests?: IContainerResourceQuantity;

    /**
     * 容器内存资源限制
     */
    limits?: IContainerResourceQuantity;
    /**
     * 环境变量
     */
    environments?: Object;
    /**
     * 容器端口配置
     */
    containerPortConfigurations?: IContainerPortConfiguration[];
}

/**
 * 容器输入Dto
 */
export interface IInitContainerConfigurationInputDto extends IInitContainerConfigurationBase {

}

/**
 * 容器输出Dto
 */
export interface IInitContainerConfigurationOutputDto extends IInitContainerConfigurationBase, IEntity<string> {

}