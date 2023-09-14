import { IEntity } from "@/shared/entity";

/**
 * 应用部署配置Dto
 */
export interface IWorkLoadBaseDto {
    /**
     * 部署环境
     */
    environmentName: string;
    /**
     * 应用运行时类型
     */
    applicationRuntimeType: number;
    /**
     * 部署类型
     */
    deploymentType: number;
    /**
     * 中文名称
     */
    chineseName: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 应用Id
     */
    appId: string;
    /**
     * 命名空间Id
     */
    nameSpace: string;
    /**
     * 集群Id
     */
    clusterId: string;
    /**
     * 部署副本数量
     */
    replicas: number;

    /**
     * 镜像拉取证书
     */
    imagePullSecretId: string;

    /**
     * 绑定初始容器
     */
    sideCarPlugins: Array<string>;

}

/**
 * 部署扩展插件
 */
export interface IWorkLoadPlugin {
    /**
     * 部署更新策略
     */
    strategy?: IStrategyDto;
}
export interface IStrategyDto {

    /**
     * 镜像拉取证书
     */
    type: string;

    /**
    * 镜像拉取证书
    */
    maxSurge: string;

    /**
     * 镜像拉取证书
     */
    maxUnavailable: string;
}

/**
 * 
 */
export interface IWorkLoadCreateInputDto extends IWorkLoadBaseDto {


}


/**
 * 
 */
export interface IWorkLoadUpdateInputDto extends IWorkLoadBaseDto {


}
/**
 * 配置对象输出Dto
 */
export interface IWorkLoadOutputDto extends IWorkLoadBaseDto, IEntity<string> {
    /**
     * 
     */
    workLoadPlugins?: IWorkLoadPlugin;

    /**
     * 
     */
    workLoadContainers: Array<IWorkLoadContainerBase>;
}




/**
 * 容器配置基础Dto
 */
export interface IWorkLoadContainerBase {
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

    workLoadContainerPlugins: IWorkLoadContainerPlugin
}


export interface IWorkLoadContainerPlugin {
    /**
     * 准备完成探针配置
     */
    readiness?: INessProbe;
    /**
     * 存活探针配置
     */
    liveNess?: INessProbe;

    /**
     * 环境变量
     */
    env?: Map<string, string>;


    /**
    * 容器Cpu资源限制
    */
    request?: IContainerResourceQuantity;

    /**
     * 容器内存资源限制
     */
    limit?: IContainerResourceQuantity;
    /**
     * 容器端口配置
     */
    containerPorts?: Array<IContainerPortConfiguration>;

}

/**
 * 容器资源配置
 */
export interface IContainerResourceQuantity {
    /**
     * 
     */
    memory: string;
    /**
     * 
     */
    cpu: string;
}

/**
 * 端口配置
 */
export interface IContainerPortConfiguration {
    /**
     * 端口名称
     */
    name: string;
    /**
     * 容器端口
     */
    containerPort: number;
    /**
     * 端口协议
     */
    protocol: string;
}


/**
 * 健康检查端口配置
 */
export interface INessProbe {
    /**
     * 
     */
    scheme: string;
    /**
     * 
     */
    path: string;
    /**
     * 端口
     */
    port: number;
    /**
     * 
     * 
     */
    initialDelaySeconds: number;
    /**
     * 
     */
    periodSeconds: number;
}


