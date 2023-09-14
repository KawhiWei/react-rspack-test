import { INameSpaceInputDto, INameSpaceOutputDto } from "./namespace-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { INameSpaceService } from "./inamespace-service";
import { NameSpaceApi } from "@/constans/api";

export default class NameSpaceService extends BaseService implements INameSpaceService {
    getNameSpaceList(): Promise<IServerReturn<Array<INameSpaceOutputDto>>> {
        return this.dataRequest.getRequest(`${NameSpaceApi.nameSpaces}/list`);
    }

    createNameSpace(_params: INameSpaceInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.postRequest(`${NameSpaceApi.nameSpaces}`, _params);
    }
    updateNameSpace(_id: string, _params: INameSpaceInputDto): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${NameSpaceApi.nameSpaces}/${_id}`, _params);
    }
    getNameSpacePageList(_params: any): Promise<IServerReturn<IServerPageReturn<INameSpaceOutputDto>>> {
        return this.dataRequest.getRequest(`${NameSpaceApi.nameSpaces}/page/list`, _params);
    }
    getNameSpaceDetail(_id: string): Promise<IServerReturn<INameSpaceOutputDto>> {
        return this.dataRequest.getRequest(`${NameSpaceApi.nameSpaces}/${_id}`);
    }
    onlineNameSpace(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${NameSpaceApi.nameSpaces}/${_id}/online`, {});
    }

    offlineNameSpace(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${NameSpaceApi.nameSpaces}/${_id}/offline`, {});
    }
    deleteNameSpace(_id: string): Promise<IServerReturn<any>> {
        return this.dataRequest.deleteRequest(`${NameSpaceApi.nameSpaces}/${_id}`);
    }

}