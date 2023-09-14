import { INameSpaceInputDto, INameSpaceOutputDto } from "./namespace-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface INameSpaceService {

    /**
     * 
     * @param _params 
     */
    createNameSpace(_params: INameSpaceInputDto): Promise<IServerReturn<any>>;

    /**
     * 
     * @param _id 
     * @param _params 
     */
    updateNameSpace(_id: string, _params: INameSpaceInputDto): Promise<IServerReturn<any>>;

    /**
     * 
     * @param _param 
     * @returns 
     */
    getNameSpacePageList(_param: any): Promise<IServerReturn<IServerPageReturn<INameSpaceOutputDto>>>;

    /** 
     * @param _id 
     * @returns 
     */
    getNameSpaceDetail(_id: string): Promise<IServerReturn<INameSpaceOutputDto>>;

    /**
     * 
     * @param _id 
     * @param _params 
     */
    onlineNameSpace(_id: string): Promise<IServerReturn<any>>;

    /**
     * 
     * @param _id 
     * @param _params 
     */
    offlineNameSpace(_id: string): Promise<IServerReturn<any>>;

    /**
     * 
     * @param _id 
     * @param _params 
     */
    deleteNameSpace(_id: string): Promise<IServerReturn<any>>;
    /**
     * 
     * @param _param 
     * @returns 
     */
    getNameSpaceList(): Promise<IServerReturn<Array<INameSpaceOutputDto>>>;

}