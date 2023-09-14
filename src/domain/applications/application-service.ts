import { IApplicationInputDto, IApplicationOutputDto } from "./application-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import { ApplicationApi } from "@/constans/api";
import { ApplicationStateEnum } from "./applicationstate-enum";
import BaseService from "@/shared/service/BaseService/BaseService";
import { IApplicationService } from "./iapplication-service";

export const testList:Map<ApplicationStateEnum,string>[]=[

]


export class ApplicationService extends BaseService implements IApplicationService {
    getPage(_param: any): Promise<IServerReturn<IServerPageReturn<IApplicationOutputDto>>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/Page`, _param)
    }
    getApplicationDashboardDetail(_appId: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/${_appId}/dashboard`)
    }
    updateApplication(_id: string, _param: IApplicationInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${ApplicationApi.application}/${_id}`, _param)
    }
    getDetail(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/${_id}`)
    }
    createApplication(_param: IApplicationInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${ApplicationApi.application}`, _param)
    }

    delete(_id: string): Promise<IServerReturn<any>> {

        return this.dataRequest.deleteRequest(`${ApplicationApi.application}/${_id}`)
    }

    getLanguageList(): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/language/list`,)
    }

    getApplicationSelectedData(): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${ApplicationApi.application}/selected/data`,)
    }
}