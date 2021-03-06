/**
 * BicycleCompany Authentication Microservice
 * A simple ASP.NET Core Web API
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { IOutputFormatter } from './iOutputFormatter';
///import { ModelObject } from './modelObject';
//import { Type } from './type';

export interface ObjectResult {
    //value?: ModelObject;
    formatters?: Array<IOutputFormatter>;
    //contentTypes?: Array<string>;
    //declaredType?: Type;
    statusCode?: number;
}
