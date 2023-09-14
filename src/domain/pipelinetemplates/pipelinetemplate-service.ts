import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { IPipelineTemplateService } from "./ipipelinetemplate-service";
import { PipelineTemplateApi } from "@/constans/api";

export class PipelineTemplateService extends BaseService implements IPipelineTemplateService {

    /**
     * 
     * @param _param 
     * @returns 
     */
    createPipelineTemplate(_param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${PipelineTemplateApi.pipelineTemplate}`, _param)
    }

    /**
     * 
     * @param _id 
     * @returns 
     */
    delete(_id: string): Promise<IServerReturn<any>> {

        return this.dataRequest.deleteRequest(`${PipelineTemplateApi.pipelineTemplate}/${_id}`)
    }

    /**
     * 
     */
    updatePipelineTemplate(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${PipelineTemplateApi.pipelineTemplate}/${_id}`, _param)
    }


    /**
     * 获取流水线模板分页列表
     */
    getPipelineTemplatePage(_param: any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${PipelineTemplateApi.pipelineTemplate}/page`, _param)
    }


}