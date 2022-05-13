/**
 * BicycleCompany Delivery Orders API
 * A simple ASP.NET Core Web API
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { DeliveryOrderPartModelForReadModel } from './deliveryOrderPartModelForReadModel';
import { DeliveryOrderStage } from './deliveryOrderStage';
import { ProviderForReadModel } from './providerForReadModel';

export interface DeliveryOrderForReadModel { 
    id?: string;
    dateCreated?: Date;
    dateFinished?: Date;
    stage?: DeliveryOrderStage;
    provider?: ProviderForReadModel;
    partModels?: Array<DeliveryOrderPartModelForReadModel>;
}