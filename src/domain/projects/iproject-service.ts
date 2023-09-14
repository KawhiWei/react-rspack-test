import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";

export interface IProjectService {
    /**
     * 获取分页列表
     */
    getPage(_param: any): Promise<IServerReturn<IServerPageReturn<any>>>;


    /**
     * 获取枚举列表
     */
    getEnumList(): Promise<IServerReturn<any>>;
    
    /**
     * 
     * @param _param 
     */
    create(_param: any): Promise<IServerReturn<any>>;

    /**
     * 修改项目
     * @param _id 
     * @param _param 
     */
    update(_id: string, _param: any): Promise<IServerReturn<any>>;

    /**
     * 删除项目
     * @param _id 
     */
    delete(_id: string): Promise<IServerReturn<any>>;
}
