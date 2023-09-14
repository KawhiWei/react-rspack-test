import { IEntity } from "@/shared/entity";

export interface IApplicationBaseDto {
  /***
   * 应用名称
   */
  name: string;
  
  /***
   * 唯一标识
   */
  appId: string;

  /**
   * git地址
   */
  gitUrl: string;

  /**
   * 应用描述
   */
  describe: string,
}

export interface IApplicationDto extends IApplicationBaseDto {

  /**
   * 
   */
  buildImageName: string;


  /**
   * 
   */
  compileScript: string;
}

export interface IApplicationOutputDto extends IApplicationBaseDto, IEntity<string>  {

}

export interface IApplicationInputDto extends IApplicationBaseDto {
}