import { IEntity } from "@/shared/entity";

export interface IClusterBase {
    /**
     * 集群名称
     */
    name: string;

    /**
     * 集群版本
     */
    clusterVersion: string;


    /**
     * 集群配置config
     */
    config: string;
}

export interface IClusterInputDto extends IClusterBase {

}
export interface IClusterOutputDto extends IClusterBase, IEntity<string> {

}


