import { IApplicationPipelineFlowUpdateInputDto, IApplicationPipelineOutputDto } from "./applicationpipeline-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IApplicationPipelineService {
    /**
    * 获取表格数据
    */
    getPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<any>>>;

    /**
     * 删除一行数据
     * @param _id 
     */
    delete(_id: string): Promise<IServerReturn<any>>;

    /**
    * 添加应用
    * @param  
    */
    create(_param: any): Promise<IServerReturn<string>>;

    /**
     * 获取详情
     * @param _id 
     */
    getDetail(_id: string): Promise<IServerReturn<IApplicationPipelineOutputDto>>;

    /**
     * 获取详情
     * @param _id 
     */
    update(_id: string, _param: any): Promise<IServerReturn<any>>;

    /**
     * 修改流水线信息
     * @param _id 
     * @param _param 
     */
    updatePipelineFlow(_id: string, _param: IApplicationPipelineFlowUpdateInputDto): Promise<IServerReturn<any>>;

    /**
     * 发布任务到Jenkins
     * @param _id 
     */
    publish(_id: string): Promise<IServerReturn<any>>;

    /**
     * 执行一次任务
     * @param _id 
     */
    executeJob(_id: string): Promise<IServerReturn<any>>;

    /**
     * 获取一个任务执行日志
     * @param _id
     * @param _applicationPipelineId
     */
    getBuildLog(_applicationPipelineId: string,_id: string): Promise<IServerReturn<any>>;

    /**
     * 根据流水线Id分页获取历史执行记录
     * @param _id 
     * @param _param 
     */
    getPipeLineHistoryForPipeLineIdPageList(_id: string,_param:any): Promise<IServerReturn<IServerPageReturn<any>>>


    getPipeLineHistoryForAppIdPageList(_id: string,_param:any): Promise<IServerReturn<IServerPageReturn<any>>>;

}