import { IInitContainerConfigurationInputDto, IInitContainerConfigurationOutputDto } from "./iinit-container-service-dto";
import { IServerPageReturn, IServerReturn } from "@/shared/entity";

export interface IInitContainerService {
    /**
    * 创建一个容器
    * @param _params 
    */
    createInitContainerConfiguration(_params: IInitContainerConfigurationInputDto): Promise<IServerReturn<any>>;

    /**
    * 修改一个容器
    * @param _params 
    */
    updateInitContainerConfiguration(_id: string, _params: IInitContainerConfigurationInputDto): Promise<IServerReturn<any>>;

    /**
    * 删除一个容器
    * @param _params 
    */
    deleteInitContainerConfiguration(_id: string): Promise<IServerReturn<any>>;

    /**
    * 获取一个容器
    * @param _params 
    */
    getInitContainerConfigurationDetail(_id: string): Promise<IServerReturn<IInitContainerConfigurationOutputDto>>;

    /**
    * 获取容器列表
    * @param _params 
    */
    getInitContainerConfigurationList(): Promise<IServerReturn<Array<IInitContainerConfigurationOutputDto>>>;
    /**
    * 分页获取容器列表
    * @param _params 
    */
    getInitContainerConfigurationPageList( _param: any): Promise<IServerReturn<IServerPageReturn<IInitContainerConfigurationOutputDto>>> ;
} 