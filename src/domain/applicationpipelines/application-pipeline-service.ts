import { IApplicationPipelineFlowUpdateInputDto, IApplicationPipelineInputDto, IApplicationPipelineOutputDto } from "./applicationpipeline-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import { ApplicationPipelineApi } from "@/constans/api";
import BaseService from "@/shared/service/BaseService/BaseService";
import { IApplicationPipelineService } from "./iapplication-pipeline-service";

export class ApplicationPipelineService extends BaseService implements IApplicationPipelineService {
    getBuildLog(_appId: string,_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationPipeline}/${_appId}/${_id}/build/log`)
    }

    update(_id: string, _param: IApplicationPipelineInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ApplicationPipelineApi.applicationPipeline}/${_id}`, _param)
    }

    updatePipelineFlow(_id: string, _param: IApplicationPipelineFlowUpdateInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ApplicationPipelineApi.applicationPipeline}/${_id}/pipeline/flow`, _param)
    }
    

    getDetail(_id: string): Promise<IServerReturn<IApplicationPipelineOutputDto>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationPipeline}/${_id}`)
    }

    create(_param: IApplicationPipelineInputDto): Promise<IServerReturn<string>> {
        return this.dataRequest.postRequest(`${ApplicationPipelineApi.applicationPipeline}`, _param)
    }

    getPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationPipeline}/${_appId}/page/list`, _param)
    }

    delete(_id: string): Promise<IServerReturn<any>> {

        return this.dataRequest.deleteRequest(`${ApplicationPipelineApi.applicationPipeline}/${_id}`)
    }

    publish(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ApplicationPipelineApi.applicationPipeline}/${_id}/publish`, {})
    }

    executeJob(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${ApplicationPipelineApi.applicationPipeline}/${_id}/execute/job`, {})
    }


    executed(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${ApplicationPipelineApi.applicationPipeline}/${_id}/execute/job`, {})
    }

    getPipeLineHistoryForPipeLineIdPageList(_id: string,_param:any): Promise<IServerReturn<IServerPageReturn<IApplicationPipelineOutputDto>>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationPipeline}/${_id}/pipelineId/page/list`, _param)
    }

    getPipeLineHistoryForAppIdPageList(_id: string,_param:any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${ApplicationPipelineApi.applicationPipeline}/${_id}/appId/page/list`, _param)
    }
    

}