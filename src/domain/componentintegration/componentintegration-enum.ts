/***
 * 应用状态枚举
 */
 export enum ComponentLinkTypeEnum {
    /**
     * Gitlab
     */
    gitlab = 1,
    /**
     * Gogs代码仓库
     */
    goGs = 2,
    /**
     * Harbor镜像仓库
     */
    harBor = 3,

    /**
     * Jenkins流水线引擎
     */
    jenkins = 4,
}


/***
 * 应用状态枚举
 */
export enum ComponentCategoryEnum {
    /**
     * 代码仓库
     */
    codeWarehouse = 1,
    /**
     * 流水线
     */
    pipeLine = 2,
    /**
     * 镜像仓库
     */
    imageWarehouse = 3,
}
