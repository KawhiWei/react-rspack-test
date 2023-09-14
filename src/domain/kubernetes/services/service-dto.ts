import { IEntity } from "@/shared/entity";

/**
 * 基础Dto
 */
export interface IServiceBase {
    /**
     * 
     */
    name: string;
    /**
     * 
     */
    deploymentId: string;
    /**
     * 
     */
    nameSpaceId: string;
    /**
     * 
     */
    clusterId: string,

    /**
     * 应用Id
     */
    appId: string,
    /**
     * 
     */
    servicePorts: IServicePort[];

}

/**
 * 端口配置
 */
export interface IServicePort {
    portType: number;
    portName: string;
    sourcePort: number;
    targetPort: number;
}

/**
 * 服务输入Dto
 */
export interface IServiceInputDto extends IServiceBase {

}

/**
 * 服务输入Dto
 */
export interface IServiceOutputDto extends IServiceBase, IEntity<string> {
    /**
     * 
     */
    clusterName: string,
    /**
     * 
     */
    nameSpaceChineseName: string,
    /**
     * 
     */
    nameSpaceName: string,

    /**
     * 
     */
    isPublish:boolean,
}