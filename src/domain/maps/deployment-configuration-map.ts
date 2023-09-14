import { ApplicationRuntimeTypeEnum, DeploymentTypeEnum } from "../kubernetes/workloads/workload-enum";

export const ApplicationRuntimeTypeMap = [
    {
        key: ApplicationRuntimeTypeEnum.kubernetes,
        value: "Kubernetes",
    }
]

export const WorkLoadTypeMap = [
    {
        key: DeploymentTypeEnum.pod,
        value: "Pod",
    },
    {
        key: DeploymentTypeEnum.deployment,
        value: "Deployment",
    },
    {
        key: DeploymentTypeEnum.daemonSet,
        value: "DaemonSet",
    },
    {
        key: DeploymentTypeEnum.statefulSet,
        value: "StatefulSet",
    },
    {
        key: DeploymentTypeEnum.replicaSet,
        value: "ReplicaSet",
    },
    {
        key: DeploymentTypeEnum.job,
        value: "Job",
    },
    {
        key: DeploymentTypeEnum.cronJob,
        value: "CronJob",
    },
]