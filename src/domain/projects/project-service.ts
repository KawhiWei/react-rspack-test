import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { IProjectService } from "./iproject-service";
import { ProjectApi } from "@/constans/api";

export class ProjectService extends BaseService implements IProjectService {
    /**
     * 获取分页列表
     */
    getPage(_param: any): Promise<IServerReturn<IServerPageReturn<any>>> {
        return this.dataRequest.getRequest(`${ProjectApi.project}/page/list`, _param)
    }

    /**
     * 获取枚举列表
     */
    getEnumList(): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${ProjectApi.project}/enum/list`)
    }

    /**
     * 创建项目
     */
    create(_param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${ProjectApi.project}`, _param)
    }

    /**
    * 修改项目
    */
    update(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ProjectApi.project}/${_id}`, _param)
    }

    /**
    * 修改项目
    */
    delete(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${ProjectApi.project}/${_id}`)
    }
}
