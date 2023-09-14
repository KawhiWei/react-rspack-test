import { IEntity } from "@/shared/entity";

/**
 * 
 */
export interface INameSpaceBase {
    /**
     * 命名空间中文名称
     */
    chineseName: string;
    /**
     * 命名空间名称
     */
    name: string;
    /**
     * 集群id
     */
    clusterId: string;

}

/**
 * 输入Dto
 */
export interface INameSpaceInputDto extends INameSpaceBase {
}

/**
 * 输入Dto
 */
export interface INameSpaceOutputDto extends INameSpaceBase, IEntity<string> {
    /**
     * 集群id
     */
    clusterName: string;
    /**
     * 
     */
    onlineStatus: number;
}