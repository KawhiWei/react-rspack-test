import { IBuildImageOutputDto, IBuildImageVersionBaseDto } from "./build-image-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IBuildImageService {

    getVersionList(_imageId: string): Promise<IServerReturn<IBuildImageVersionBaseDto>>;
    getPage(_param:any): Promise<IServerReturn<IServerPageReturn<IBuildImageOutputDto>>>;
    delete(_id:string): Promise<IServerReturn<any>>;
    addBuildImage(_param:any) : Promise<IServerReturn<any>>;
    update(_id: string, _param: any): Promise<IServerReturn<any>>;
    getDetail(_id:string): Promise<IServerReturn<any>>;
    getImageList(): Promise<IServerReturn<Array<IBuildImageOutputDto>>>;
    addBuildImageVersion(_param:any): Promise<IServerReturn<any>>;
}