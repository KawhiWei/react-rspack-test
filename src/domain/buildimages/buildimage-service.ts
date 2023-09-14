import { IServerPageReturn, IServerReturn } from "@/shared/entity";

import BaseService from "@/shared/service/BaseService/BaseService";
import { BuildImageApi } from "@/constans/api";
import { IBuildImageService } from "./ibuildimage-service";
import { IBuildImageVersionBaseDto, IBuildImageOutputDto } from "./buildimage-dto";

export class BuildImageService extends BaseService implements IBuildImageService {
    getVersionList(_imageId: string): Promise<IServerReturn<IBuildImageVersionBaseDto>> {
        return this.dataRequest.getRequest(`${BuildImageApi.buildImage}/${_imageId}/version/list`,)
    }

    /**
     * 分页查询
     * @param _param 
     * @returns 
     */
    getPage(_param:any): Promise<IServerReturn<IServerPageReturn<IBuildImageOutputDto>>>{
        return this.dataRequest.getRequest(`${BuildImageApi.buildImage}/Page`, _param)
    }

    delete(_id:string): Promise<IServerReturn<any>>{
        return this.dataRequest.deleteRequest(`${BuildImageApi.buildImage}/${_id}`)
    }

    addBuildImage(_param:any) : Promise<IServerReturn<any>>{
        return this.dataRequest.postRequest(`${BuildImageApi.buildImage}`, _param)
    }

    update(_id: string, _param: any): Promise<IServerReturn<any>> {
        return this.dataRequest.putRequest(`${BuildImageApi.buildImage}/${_id}`, _param)
    }

    getDetail(_id:string): Promise<IServerReturn<any>> {
        return this.dataRequest.getRequest(`${BuildImageApi.buildImage}/${_id}`)
    }

    getImageList(): Promise<IServerReturn<Array<IBuildImageOutputDto>>>{
        return this.dataRequest.getRequest(`${BuildImageApi.buildImage}`);
    }

    /**
     * 
     * @param _param 添加镜像版本
     * @returns 
     */
    addBulidImageVersion(_param:any): Promise<IServerReturn<any>>{
        return this.dataRequest.postRequest(`${BuildImageApi.buildImage}/CareatBuildImageVersion`, _param);
    }
}