import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IEnvironmentService{
    /**
     * 获取环境列表
     */
    getPage(_params:any): Promise<IServerReturn<IServerPageReturn<any>>>;


    /**
     * 删除一行数据
     * @param _id 
     */
    delete(_id: string): Promise<IServerReturn<any>>;

    // /**
    //  * 查询明细
    //  * @_id 
    //  */
    getDetail(_id: string): Promise<IServerReturn<any>>;

    /**
     * 添加环境
     * @param _param 
     */
    addEnvironment(_param: any): Promise<IServerReturn<any>>;


    /**
     * 
     * @param _id 
     * @param _param 
     */
    updateEnvironment(_id: string,_param: any): Promise<IServerReturn<any>>;


    /**
     * 根据环境获取配置
     * @param _id 
     */
    getConfigListForEnvironmentId(_id: string, _param:any):Promise<IServerReturn<any>>;

    /**
     * 环境添加配置
     * @param _id 
     * @param _param 
     */
    addAppConfiguration(_id: string, _param: any):Promise<IServerReturn<any>>;

    /**
     * 环境添加配置
     * @param _id 
     * @param _param 
     */
     updateAppConfiguration(_environmentId: string,_id: string, _param: any):Promise<IServerReturn<any>>;
    
    /**
     * 删除配置项
     * @param _id 
     */
    deleteAppConfiguration(_id:string,_config:any):Promise<IServerReturn<any>>;

    /**
     * 获取配置项明细
     * @param _id 
     */
    getConfigDetail(_id:string):Promise<IServerReturn<any>>;

    /**
     * 获取待发布配置
     * @param _id 
     * @param _param 
     */
    getConfigRelease(_id: string, _param:any):Promise<IServerReturn<IServerPageReturn<any>>>;

    /**
     * 发布接口
     * @param _param 
     */
    releasePublish(_id:string,_param:any):Promise<IServerReturn<any>>;
}