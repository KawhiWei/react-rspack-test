import { ApplicationLevelEnum, ApplicationStateEnum } from "../applications/applicationstate-enum";

/**
 * 状态列表下来选择数组
 */
export const ApplicationStateMap = [
    {
        key: ApplicationStateEnum.notStart,
        value: "未开始"
    },
    {
        key: ApplicationStateEnum.underDevelopment,
        value: "开发中"
    },
    {
        key: ApplicationStateEnum.notOnline,
        value: "未上线"
    },
    {
        key: ApplicationStateEnum.onlineRunning,
        value: "线上运行中"
    },
    {
        key: ApplicationStateEnum.offline,
        value: "已下线"
    },

]


/**
 * 应用级别数组
 */
export const ApplicationLevelMap = [
    {
        key: ApplicationLevelEnum.levelZero,
        value: "P0"
    },
    {
        key: ApplicationLevelEnum.levelOne,
        value: "P1"
    },
    {
        key: ApplicationLevelEnum.levelTwo,
        value: "P2"
    },
    {
        key: ApplicationLevelEnum.levelThree,
        value: "P3"
    },
    {
        key: ApplicationLevelEnum.levelFour,
        value: "P4"
    },
    {
        key: ApplicationLevelEnum.levelFive,
        value: "P5"
    },
    {
        key: ApplicationLevelEnum.levelSix,
        value: "P6"
    },

]