/***
 * 应用运行时类型
 */
export enum ApplicationRuntimeTypeEnum {
    /**
     * Kubernetes
     */
    kubernetes = 0,
}

/***
 * 部署类型
 */
export enum DeploymentTypeEnum {
    /**
     * Pod
     */
    pod = 0,
    /**
     * Deployment
     */
    deployment = 1,
    /**
    * DaemonSet
    */
    daemonSet = 2,
    /**
     * StatefulSet
     */
    statefulSet = 3,
    /**
    * ReplicaSet
    */
    replicaSet = 4,
    /**
     * Job
     */
    job = 5,
    /**
    * CronJob
    */
    cronJob = 6,
}   