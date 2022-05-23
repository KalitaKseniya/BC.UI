import { DeliveryOrderStage } from './../models/deliveryOrderStage';
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
 *//* tslint:disable:no-unused-variable member-ordering */

 import { Inject, Injectable, Optional }                      from '@angular/core';
 import { HttpClient, HttpHeaders, HttpParams,
          HttpResponse, HttpEvent }                           from '@angular/common/http';

 import { Observable }                                        from 'rxjs';
import { DeliveryOrderForCreateModel, DeliveryOrderForReadModel, DeliveryOrderForStageUpdateModel, Operation } from '../models/models';
import { environment } from 'src/environments/environment';
import { Configuration } from '../configuration';



 @Injectable({providedIn: 'root'})
 export class DeliveryOrdersService {

     protected basePath = '/';
     public defaultHeaders = new HttpHeaders();
     public configuration;
     constructor(protected httpClient: HttpClient, @Optional() configuration: Configuration) {

      this.basePath = environment.serverDeliveryOrdersUrl;
      if (configuration) {
          this.configuration = configuration;
      }
  }

     /**
      * @param consumes string[] mime-types
      * @return true: consumes contains 'multipart/form-data', false: otherwise
      */
     private canConsumeForm(consumes: string[]): boolean {
         const form = 'multipart/form-data';
         for (const consume of consumes) {
             if (form === consume) {
                 return true;
             }
         }
         return false;
     }


     /**
      * Create new DeliveryOrder.
      *
      * @param body The DeliveryOrder object for creation
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public createDeliveryOrder(body?: DeliveryOrderForCreateModel, observe?: 'body', reportProgress?: boolean): Observable<DeliveryOrderForReadModel>;
     public createDeliveryOrder(body?: DeliveryOrderForCreateModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DeliveryOrderForReadModel>>;
     public createDeliveryOrder(body?: DeliveryOrderForCreateModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DeliveryOrderForReadModel>>;
     public createDeliveryOrder(body?: DeliveryOrderForCreateModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


         let headers = this.defaultHeaders;

         return this.httpClient.request<DeliveryOrderForReadModel>('post',`${this.basePath}/api/admin/delivery-orders`,
             {
                 body: body,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

     /**
      * Delete DeliveryOrder.
      *
      * @param id The value that is used to find DeliveryOrder
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public deleteDeliveryOrder(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
     public deleteDeliveryOrder(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
     public deleteDeliveryOrder(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
     public deleteDeliveryOrder(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling deleteDeliveryOrder.');
         }

         let headers = this.defaultHeaders;

         return this.httpClient.request<any>('delete',`${this.basePath}/api/admin/delivery-orders/${encodeURIComponent(String(id))}`,
             {
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

     /**
      * Return DeliveryOrder.
      *
      * @param id The value that is used to find DeliveryOrder
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public getDeliveryOrder(id: string, observe?: 'body', reportProgress?: boolean): Observable<DeliveryOrderForReadModel>;
     public getDeliveryOrder(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DeliveryOrderForReadModel>>;
     public getDeliveryOrder(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DeliveryOrderForReadModel>>;
     public getDeliveryOrder(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling getDeliveryOrder.');
         }

         let headers = this.defaultHeaders;

         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'text/plain',
             'application/json',
             'text/json'
         ];

         return this.httpClient.request<DeliveryOrderForReadModel>('get',`${this.basePath}/api/admin/delivery-orders/${encodeURIComponent(String(id))}`,
             {
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

     /**
      * Return a list of all DeliveryOrders.
      *
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public getDeliveryOrdersList(observe?: 'body', reportProgress?: boolean): Observable<Array<DeliveryOrderForReadModel>>;
     public getDeliveryOrdersList(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DeliveryOrderForReadModel>>>;
     public getDeliveryOrdersList(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DeliveryOrderForReadModel>>>;
     public getDeliveryOrdersList(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

         let headers = this.defaultHeaders;

         return this.httpClient.request<Array<DeliveryOrderForReadModel>>('get',`${this.basePath}/api/admin/delivery-orders`,
             {
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * Update of DeliveryOrder stage.
     * 
     * @param id The value that is used to find DeliveryOrder
     * @param body Stage to update
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public updateStageDeliveryOrder(id: string, body?: DeliveryOrderForStageUpdateModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
     public updateStageDeliveryOrder(id: string, body?: DeliveryOrderForStageUpdateModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
     public updateStageDeliveryOrder(id: string, body?: DeliveryOrderForStageUpdateModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
     public updateStageDeliveryOrder(id: string, body?: DeliveryOrderForStageUpdateModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
 
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling updateStageDeliveryOrder.');
         }
 
 
         let headers = this.defaultHeaders;
 
         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             'text/plain',
             'application/json',
             'text/json'
         ];
         const httpHeaderAcceptSelected: string | undefined = undefined;
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json-patch+json',
             'application/json',
             'text/json',
             'application/_*+json'
         ];
         const httpContentTypeSelected: string | undefined = undefined;
         if (httpContentTypeSelected != undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         return this.httpClient.request<any>('put',`${this.basePath}/api/admin/delivery-orders/${encodeURIComponent(String(id))}`,
             {
                 body: body,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

 }
