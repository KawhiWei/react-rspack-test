import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { IMatterService } from "./imatter-service";
import { MatterApi } from "@/constans/api";

export class MatterService extends BaseService implements IMatterService {
    addMatter(_param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${MatterApi.matter}`,_param)
    }
    deleteEnvironment(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${MatterApi.matter}/${_id}`)
    }
    updateAppConfiguration(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${MatterApi.matter}`,_param)
    }
    getDetail(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${MatterApi.matter}/${_id}`)
    }
    getPage(_param: any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${MatterApi.matter}/pagelist`)
    }
}