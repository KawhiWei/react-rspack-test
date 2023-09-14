import { ComponentCategoryEnum, ComponentLinkTypeEnum } from "../componentintegration/componentintegration-enum";

export const ComponentTypeMap = [
    {
        key: ComponentLinkTypeEnum.gitlab,
        value: "Gitlab",
    },
    {
        key: ComponentLinkTypeEnum.goGs,
        value: "Gogs"
    },
    {
        key: ComponentLinkTypeEnum.harBor,
        value: "Harbor"
    },
    {
        key: ComponentLinkTypeEnum.jenkins,
        value: "Jenkins"
    },

]

export const ComponentCategoryMap = [
    {
        key: ComponentCategoryEnum.codeWarehouse,
        value: "代码仓库"
    },
    {
        key: ComponentCategoryEnum.pipeLine,
        value: "流水线"
    },
    {
        key: ComponentCategoryEnum.imageWarehouse,
        value: "镜像仓库"
    },

]