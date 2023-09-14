import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IComponentIntegrationService {

    /**
     * 获取分页数据
     * @param _param 
     * @returns 
     */
    getPage(_param: any): Promise<IServerReturn<IServerPageReturn<any>>>;


    /**
     * 添加组件集成
     * @param _param 
     * @returns 
     */
    add(_param: any): Promise<IServerReturn<any>>;

    /**
     * 修改组件集成配置
     * @param _param 
     * @returns 
     */
    update(_id: string, _param: any): Promise<IServerReturn<any>>;


    /**
     * 删除组件集成
     * @param _id 
     * @returns 
     */
    delete(_id: string): Promise<IServerReturn<any>>;

    /**
     * 获取详细信息
     * @param _id 
     * @returns 
     */
    getDetail(_id: string): Promise<IServerReturn<any>>;

}