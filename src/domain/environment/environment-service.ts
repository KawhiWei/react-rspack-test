import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { EnvironmentApi } from "@/constans/api";
import { IEnvironmentService } from "./ienvironment-service";

export class EnvironmentService extends BaseService implements IEnvironmentService {

    getPage(_params: any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.environments}/page/list`)
    }

    addEnvironment(_param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${EnvironmentApi.environments}`, _param);
    }


    getDetail(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.environments}/${_id}`)
    }



    delete(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${EnvironmentApi.environments}/${_id}`)
    }

    updateEnvironment(_id: string,_param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${EnvironmentApi.environments}`, _param);
    }





    updateAppConfiguration(_environmentId: string, _id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${EnvironmentApi.environments}/${_environmentId}/${_id}/config`, _param)
    }
    getConfigListForEnvironmentId(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.environments}/${_id}/config/list`, _param);
    }

    addAppConfiguration(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${EnvironmentApi.environments}/${_id}/config`, _param)
    }

    deleteAppConfiguration(_id: string, _config: any): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${EnvironmentApi.environments}/${_id}/${_config}/config`)
    }

    getConfigDetail(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.environments}/${_id}/config`)
    }
    getConfigRelease(_id: string, _param: any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${EnvironmentApi.environments}/${_id}/not/publish/config/list`, _param);
    }
    releasePublish(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${EnvironmentApi.environments}/${_id}/publish`, _param)
    }
}
