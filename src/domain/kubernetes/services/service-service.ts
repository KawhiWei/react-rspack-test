import { IServerPageReturn, IServerReturn } from "@/shared/entity";
import { IServiceInputDto, IServiceOutputDto } from "./service-dto";

import BaseService from "@/shared/service/BaseService/BaseService";
import { IServiceService } from "./iservice-service";
import { ServiceApi } from "@/constans/api";

/**
 * 
 */
export default class ServiceService extends BaseService implements IServiceService {
    createService(_params: IServiceInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${ServiceApi.services}`, _params);
    }

    updateService(_id: string, _params: IServiceInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ServiceApi.services}/${_id}`, _params);
    }

    deleteService(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${ServiceApi.services}/${_id}`);
    }

    getServicePageList(_params: any): Promise<IServerReturn<IServerPageReturn<IServiceOutputDto>>> {
        return this.dataRequest.getRequest(`${ServiceApi.services}/page/list`, _params);
    }

    publishService(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ServiceApi.services}/${_id}/publish`, {});
    }

    getServiceDetail(_id: string): Promise<IServerReturn<IServiceOutputDto>> {
        return this.dataRequest.getRequest(`${ServiceApi.services}/${_id}`);
    }
}