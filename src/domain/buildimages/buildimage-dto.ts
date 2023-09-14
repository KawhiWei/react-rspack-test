export interface IBuildImageVersionBaseDto {
    /***
     * 镜像Id
     */
    buildImageId: string;

    /***
     * 版本
     */
    version: string;

}

export interface IBuildImageBaseDto {
    /**
     * 名称
     */
    name: string;
    /**
     * 镜像名称
     */
    buildImageName: string;
    /**
     * 构建脚本
     */
    compileScript:string;
}

export interface IBuildImageOutputDto extends IBuildImageBaseDto{
    /**
     * id
     */
    id:string;
}

export interface IBuildImageVersionInputDto {
    /**
     * 镜像ID
     */
    buildImageId:string;
    /**
     * 版本
     */
    version:string;
}
