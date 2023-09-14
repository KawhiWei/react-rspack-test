import { IServerPageReturn, IServerReturn } from "@/shared/entity";
import { IWorkLoadCreateInputDto, IWorkLoadOutputDto, IWorkLoadUpdateInputDto } from "./workload-dto";

export interface IWorkLoadService {
    /**
     * 获取部署分页列表
     * @param _appId 
     * @param _param 
     */
    getWorkLoadPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<IWorkLoadOutputDto>>>;

    /**
     * 删除一个部署
     * @param _id 
     */
    deleteWorkLoad(_id: string): Promise<IServerReturn<any>>;

    /**
     * 创建一个部署
     * @param _params 
     */
    createWorkLoad(_params: IWorkLoadCreateInputDto): Promise<IServerReturn<string>>;


    /**
     * 根据Id获取一个部署
     * @param _id 
     */
    getWorkLoadDetail(_id: string): Promise<IServerReturn<IWorkLoadOutputDto>>;

    /**
     * 
     * @param _id 
     * @param _masterContainerId 
     * @param _params 
     */
    updateWorkLoad(_id: string, _params: IWorkLoadUpdateInputDto): Promise<IServerReturn<any>>;

    /**
         * 根据应用Id获取部署列表
         * @param _appId 
         * @param _param 
         * @returns 
         */
    getWorkLoadByAppIdList(_appId: string): Promise<IServerReturn<Array<IWorkLoadOutputDto>>>;

}