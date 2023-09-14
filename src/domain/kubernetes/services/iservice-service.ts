import { IServerPageReturn, IServerReturn } from "@/shared/entity";
import { IServiceInputDto, IServiceOutputDto } from "./service-dto";

/**
 * 
 */
export interface IServiceService {
    /**
     * 创建服务
     * @param _params 
     */
    createService(_params: IServiceInputDto): Promise<IServerReturn<any>>;

    /**
    * 修改服务 
    * @param _params 
    */
    updateService(_id: string, _params: IServiceInputDto): Promise<IServerReturn<any>>;

    /**
    * 删除服务
    * @param _params 
    */
    deleteService(_id: string): Promise<IServerReturn<any>>;

    /**
     * 分页获取服务列表
     * @param _params 
     */
    getServicePageList(_params: any): Promise<IServerReturn<IServerPageReturn<IServiceOutputDto>>>;

    /**
    * 发布服务
    * @param _params 
    */
    publishService(_id: string): Promise<IServerReturn<any>>;

    /**
     * 查询一个详情
     * @param _id 
     */
    getServiceDetail(_id: string): Promise<IServerReturn<IServiceOutputDto>>;
}