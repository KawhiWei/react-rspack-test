import { IApplicationInputDto, IApplicationOutputDto } from "./application-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import { ApplicationStateEnum } from "./applicationstate-enum";

export interface IApplicationService {
    /**
    * 获取表格数据
    */
    getPage(_param: any): Promise<IServerReturn<IServerPageReturn<IApplicationOutputDto>>>;

    /**
     * 删除一行数据
     * @param _id 
     */
    delete(_id: string): Promise<IServerReturn<any>>;

    /**
    * 添加应用
    * @param  
    */
    createApplication(_param: IApplicationInputDto): Promise<IServerReturn<any>>;

    /**
     * 获取详情
     * @param _id 
     */
    getDetail(_id: string): Promise<IServerReturn<any>>;

    /**
    * 获取详情
    * @param _id 
    */
    updateApplication(_id: string, _param: IApplicationInputDto): Promise<IServerReturn<any>>;

    /**
     * 应用仪表盘明细
     * @param _appId 
     */
    getApplicationDashboardDetail(_appId: string): Promise<IServerReturn<any>>;

    getLanguageList(): Promise<IServerReturn<any>>;
    
    /**
     * 获取应用添加或者修改时所需要获取下拉框的数据
     */
    getApplicationSelectedData(): Promise<IServerReturn<any>>;
}