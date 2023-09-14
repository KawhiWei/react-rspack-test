import { IClusterInputDto, IClusterOutputDto } from "./cluster-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import { KubernetesClusterDashboardDto } from "./kubernetes-cluster-dto";

export interface IClusterService {
    /**
     * 集群控制面板信息
     * @param _id 
     */
    getClusterDashboard(_id: string): Promise<IServerReturn<KubernetesClusterDashboardDto>>;

    /**
     * 分页获取集群列表
     * @returns 
     */
    getClusterPageList(_param:any): Promise<IServerReturn<IServerPageReturn<IClusterOutputDto>>>;

    /**
     * 获取集群列表
     */
    getClusterList(): Promise<IServerReturn<any>>;


    /**
     * 创建集群
     * @param _params 
     */
    createCluster(_params: IClusterInputDto): Promise<IServerReturn<any>>;

    /**
     * 修改集群
     * @param _id 
     * @param _params 
     */
    updateCluster(_id: string, _params: IClusterInputDto): Promise<IServerReturn<any>>;

    /**
     * 删除集群
     * @param _id 
     */
    deleteCluster(_id: string): Promise<IServerReturn<any>>;

    /**
     * 获取一个集群信息
     * @param _id 
     */
    getClusterDetail(_id: string): Promise<IServerReturn<any>>;
}