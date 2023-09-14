import { IServerPageReturn, IServerReturn } from "@/shared/entity";
import { IWorkLoadCreateInputDto, IWorkLoadOutputDto, IWorkLoadUpdateInputDto } from "./workload-dto";

import BaseService from "@/shared/service/BaseService/BaseService";
import { IWorkLoadService } from "./iworkload-service";
import { DeploymentApi as WorkLoad } from "@/constans/api";

export default class WorkLoadService extends BaseService implements IWorkLoadService {

    /**
     * 获取部署分页列表
     * @param _appId 
     * @param _param 
     * @returns 
     */
    getWorkLoadPage(_appId: string, _param: any): Promise<IServerReturn<IServerPageReturn<IWorkLoadOutputDto>>> {
        return this.dataRequest.getRequest(`${WorkLoad.workloads}/${_appId}/page/list`, _param);
    }

    /**
     * 删除一个部署
     * @param _id 
     * @returns 
     */
    deleteWorkLoad(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${WorkLoad.workloads}/${_id}`)
    }
    /**
     * 创建部署
     * @param _params 
     * @returns 
     */
    createWorkLoad(_params: IWorkLoadCreateInputDto): Promise<IServerReturn<string>> {
        return this.dataRequest.postRequest(`${WorkLoad.workloads}`, _params)
    }

    /**
     * 修改部署
     * @param _params 
     * @returns 
     */
    updateWorkLoad(_id: string, _params: IWorkLoadUpdateInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${WorkLoad.workloads}/${_id}`, _params)
    }


    /**
     * 根据Id获取一个部署
     * @param _params 
     * @returns 
     */
    getWorkLoadDetail(_id: string): Promise<IServerReturn<IWorkLoadOutputDto>> {
        return this.dataRequest.getRequest(`${WorkLoad.workloads}/${_id}/`)
    }
    /**
     * 根据应用Id获取部署列表
     * @param _appId 
     * @param _param 
     * @returns 
     */
    getWorkLoadByAppIdList(_appId: string): Promise<IServerReturn<Array<IWorkLoadOutputDto>>> {
        return this.dataRequest.getRequest(`${WorkLoad.workloads}/${_appId}/list`);
    }

}

