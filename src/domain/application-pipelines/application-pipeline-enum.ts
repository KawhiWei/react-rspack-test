/***
 * 步骤枚举类型
 */
export enum StepTypeEnum {
    /**
     * 拉取代码
     */
    pullCode = 1,

    /**
     * 编译发布
     */
    compilePublish=2,
    /**
     * 构建Docker镜像
     */
    DockerFilePublishAndBuildImage = 3,
    /**
     * 执行命令
     */
    executeCommand = 4,
}

/**
 * 流水线状态枚举
 */
export enum PipelineBuildStateEnum {
    /**
     * 准备完成
     */
    ready = 0,
    /**
     * 执行中
     */
    running = 1,
    /**
     * 成功
     */
    success = 2,
    /**
    * 失败
    */
    fail = 3,
}


