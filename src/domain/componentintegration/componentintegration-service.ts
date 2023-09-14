import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { ComponentIntegrationApi } from "@/constans/api";
import { IComponentIntegrationService } from "./icomponentintegration-service";

export class ComponentIntegrationService extends BaseService implements IComponentIntegrationService {
    getDetail(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${ComponentIntegrationApi.componentIntegration}/${_id}`)
    }

    /**
     * 获取分页数据
     * @param _param 
     * @returns 
     */
    getPage(_param: any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${ComponentIntegrationApi.componentIntegration}/page`, _param)
    }

    /**
     * 添加组件集成
     * @param _param 
     * @returns 
     */
    add(_param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${ComponentIntegrationApi.componentIntegration}`, _param)
    }

    /**
     * 修改组件集成配置
     * @param _param 
     * @returns 
     */
    update(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ComponentIntegrationApi.componentIntegration}/${_id}`, _param)
    }

    /**
     * 删除组件集成
     * @param _id 
     * @returns 
     */
    delete(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${ComponentIntegrationApi.componentIntegration}/${_id}`)
    }

}