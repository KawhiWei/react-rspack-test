import { IInitContainerConfigurationInputDto, IInitContainerConfigurationOutputDto } from "./iinit-container-service-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { IInitContainerService } from "./iinit-container-service";
import { InitContainerApi } from "@/constans/api";

export default class InitContainerService extends BaseService implements IInitContainerService {
    createInitContainerConfiguration(_params: IInitContainerConfigurationInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${InitContainerApi.initContainers}`, _params);
    }
    /**
     * 
     * @param _id 
     * @param _params 
     * @returns 
     */
    updateInitContainerConfiguration(_id: string, _params: IInitContainerConfigurationInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${InitContainerApi.initContainers}/${_id}`, _params);
    }
    /**
     * 
     * @param _id 
     * @returns 
     */
    deleteInitContainerConfiguration(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${InitContainerApi.initContainers}/${_id}`);
    }
    /**
     * 
     * @param _id 
     * @returns 
     */
    getInitContainerConfigurationDetail(_id: string): Promise<IServerReturn<IInitContainerConfigurationOutputDto>> {
        return this.dataRequest.getRequest(`${InitContainerApi.initContainers}/${_id}`);
    }
    /**
     * 
     * @returns 
     */
    getInitContainerConfigurationList(): Promise<IServerReturn<Array<IInitContainerConfigurationOutputDto>>> {
        return this.dataRequest.getRequest(`${InitContainerApi.initContainers}/list`);
    }

    /**
     * 
     * @param _param 
     * @returns 
     */
    getInitContainerConfigurationPageList(_param: any): Promise<IServerReturn<IServerPageReturn<IInitContainerConfigurationOutputDto>>> {
        return this.dataRequest.getRequest(`${InitContainerApi.initContainers}/page/list`, _param);
    }

}