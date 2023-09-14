/***
 * 应用状态枚举
 */
export enum ApplicationStateEnum {
    /**
     * 未开始
     */
    notStart = 0,
    /**
     * 开发中
     */
    underDevelopment = 5,
    /**
     * 未上线
     */
    notOnline = 10,

    /**
     * 线上运行中
     */
    onlineRunning = 15,

    /**
     * 已下线
     */
    offline = 20
}


/***
 * 应用级别
 */
export enum ApplicationLevelEnum {
    /**
     * P0
     */
    levelZero = 0,
    /**
     * P1
     */
    levelOne = 1,
    /**
     * P2
     */
    levelTwo = 2,
    /**
     * P3
     */
    levelThree = 3,
    /**
     * P4
     */
    levelFour = 4,

    /**
     * P5
     */
    levelFive = 5,
    /**
    * P6
    */
    levelSix = 6
}