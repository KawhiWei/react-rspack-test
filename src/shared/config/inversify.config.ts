import { ApplicationPipelineService } from "@/domain/applicationpipelines/application-pipeline-service";
import { ApplicationService } from "@/domain/applications/application-service";
import { BuildImageService } from "@/domain/buildimages/buildimage-service";
import { ClusterService } from "@/domain/kubernetes/clusters/cluster-service";
import { ComponentIntegrationService } from "@/domain/componentintegration/componentintegration-service";
import { Container } from "inversify";
import { DoveLogService } from "@/domain/logs/dovelog-service";
import { EnvironmentService } from "@/domain/environment/environment-service";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplication-pipeline-service";
import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IBuildImageService } from "@/domain/buildimages/ibuildimage-service";
import { IClusterService } from "@/domain/kubernetes/clusters/icluster-service";
import { IComponentIntegrationService } from "@/domain/componentintegration/icomponentintegration-service";
import { IDoveLogService } from "@/domain/logs/idovelog-service";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IInitContainerService } from "@/domain/init-container-configurations/iinit-container-service";
import { IMatterService } from "@/domain/matters/imatter-service";
import { INameSpaceService } from "@/domain/kubernetes/namespaces/inamespace-service";
import { IPipelineTemplateService } from "@/domain/pipelinetemplates/ipipelinetemplate-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IServiceService } from "@/domain/kubernetes/services/iservice-service";
import { IWorkLoadService } from "@/domain/kubernetes/workloads/iworkload-service";
import InitContainerService from "@/domain/init-container-configurations/init-container-service";
import { IocTypes } from "./ioc-types"
import { MatterService } from "@/domain/matters/matter-service";
import NameSpaceService from "@/domain/kubernetes/namespaces/namespace-service";
import { PipelineTemplateService } from "@/domain/pipelinetemplates/pipelinetemplate-service";
import { ProjectService } from "@/domain/projects/project-service";
import ServiceService from "@/domain/kubernetes/services/service-service";
import WorkLoadService from "@/domain/kubernetes/workloads/workload-service";

const container = new Container();
container.bind<IApplicationService>(IocTypes.ApplicationService).to(ApplicationService);
container.bind<IEnvironmentService>(IocTypes.EnvironmentService).to(EnvironmentService);
container.bind<IDoveLogService>(IocTypes.DoveLogService).to(DoveLogService);
container.bind<IMatterService>(IocTypes.MatterService).to(MatterService);
container.bind<IProjectService>(IocTypes.ProjectService).to(ProjectService);
container.bind<IComponentIntegrationService>(IocTypes.ComponentIntegrationService).to(ComponentIntegrationService);
container.bind<IApplicationPipelineService>(IocTypes.ApplicationPipelineService).to(ApplicationPipelineService);
container.bind<IBuildImageService>(IocTypes.BuildImageService).to(BuildImageService);
container.bind<IClusterService>(IocTypes.ClusterService).to(ClusterService);
container.bind<IWorkLoadService>(IocTypes.WorkLoadService).to(WorkLoadService);
container.bind<IInitContainerService>(IocTypes.InitContainerService).to(InitContainerService);
container.bind<INameSpaceService>(IocTypes.NameSpaceService).to(NameSpaceService);
container.bind<IServiceService>(IocTypes.ServiceService).to(ServiceService);
container.bind<IPipelineTemplateService>(IocTypes.PipelineTemplateService).to(PipelineTemplateService);






export default container;