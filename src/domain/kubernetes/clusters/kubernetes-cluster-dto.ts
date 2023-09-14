
export interface KubernetesClusterDashboardDto {
    clusterTotalCpuCapacity: number;
    clusterTotalCpuUsage: number;
    clusterTotalMemoryCapacity: number;
    clusterTotalMemoryUsage: number;
    clusterTotalPodCapacity: number;
    clusterTotalPodUsage: number;
    daemonSetTotal: number;
    deploymentTotal: number;
    jobTotal: number;
    namespaceTotal: number;
    replicaSetTotal: number;
    statefulSetTotal: number;
    nodes: Node[];
}

export interface Node {
    name: string;
    kubernetesVersion: string;
    osImage: string;
    operatingSystem: string;
    containerRuntimeVersion: string;
    capacityResource: Resource;
    allocatableResource: Resource;
    usageResource: Resource;
    ipAddresses: IPAddress[];
}

export interface Resource {
    cpu: number;
    memory: number;
    pod: number;
}

export interface IPAddress {
    name: string;
    address: string;
}


/**
 * 雷达图D听哦
 */
export interface AntDesignChartsRadarDto {
    name: string;
    count: number;
}
