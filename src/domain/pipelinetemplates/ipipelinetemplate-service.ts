import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IPipelineTemplateService {

    /**
     * 创建一个流水线模板
     * @param _param 
     */
    createPipelineTemplate(_param: any): Promise<IServerReturn<any>>;

    /**
     * 删除一个流水线模板
     */
    delete(_id: string): Promise<IServerReturn<any>>;

    /**
     * 修改一个流水线模板
     * @param _id 
     * @param _param 
     */
    updatePipelineTemplate(_id: string, _param: any): Promise<IServerReturn<any>>;

    
    /**
     * 获取流水线模板分页列表
     */
    getPipelineTemplatePage(_param: any): Promise<IServerReturn<IServerPageReturn<any>>>;
}