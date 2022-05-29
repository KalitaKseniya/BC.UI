/**
 * BC.Bicycles
 * Microservice to manage bicycles
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


import { Configuration }                                     from '../configuration';
import { AddedResponse, BicycleForCreateOrUpdateModel, BicycleForReadModel, Operation } from '../models/models';
import { environment } from 'src/environments/environment';
import { CustomHttpUrlEncodingCodec } from './encoder';


@Injectable({providedIn: 'root'})
export class BicyclesService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() configuration: Configuration) {
        this.basePath = environment.serverBicycleUrl;
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
     *
     *
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createBicycle(body?: BicycleForCreateOrUpdateModel, observe?: 'body', reportProgress?: boolean): Observable<AddedResponse>;
    public createBicycle(body?: BicycleForCreateOrUpdateModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AddedResponse>>;
    public createBicycle(body?: BicycleForCreateOrUpdateModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AddedResponse>>;
    public createBicycle(body?: BicycleForCreateOrUpdateModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<AddedResponse>('post',`${this.basePath}/api/bicycles`,
            {
                body: body,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteBicycle(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteBicycle(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteBicycle(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteBicycle(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteBicycle.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/api/bicycles/${encodeURIComponent(String(id))}`,
            {
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBicycle(id: string, observe?: 'body', reportProgress?: boolean): Observable<BicycleForReadModel>;
    public getBicycle(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BicycleForReadModel>>;
    public getBicycle(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BicycleForReadModel>>;
    public getBicycle(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getBicycle.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<BicycleForReadModel>('get',`${this.basePath}/api/bicycles/${encodeURIComponent(String(id))}`,
            {
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param searchTerm
     * @param pageNumber
     * @param pageSize
     * @param orderBy
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBicycleList(searchTerm?: string, pageNumber?: number, pageSize?: number, orderBy?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<BicycleForReadModel>>;
    public getBicycleList(searchTerm?: string, pageNumber?: number, pageSize?: number, orderBy?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<BicycleForReadModel>>>;
    public getBicycleList(searchTerm?: string, pageNumber?: number, pageSize?: number, orderBy?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<BicycleForReadModel>>>;
    public getBicycleList(searchTerm?: string, pageNumber?: number, pageSize?: number, orderBy?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (searchTerm !== undefined && searchTerm !== null) {
            queryParameters = queryParameters.set('SearchTerm', <any>searchTerm);
        }
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('PageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('PageSize', <any>pageSize);
        }
        if (orderBy !== undefined && orderBy !== null) {
            queryParameters = queryParameters.set('OrderBy', <any>orderBy);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<BicycleForReadModel>>('get',`${this.basePath}/api/bicycles`,
            {
                params: queryParameters,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param userId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBicyclesForUser(userId: string, observe?: 'body', reportProgress?: boolean): Observable<Array<BicycleForReadModel>>;
    public getBicyclesForUser(userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<BicycleForReadModel>>>;
    public getBicyclesForUser(userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<BicycleForReadModel>>>;
    public getBicyclesForUser(userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getBicyclesForUser.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<BicycleForReadModel>>('get',`${this.basePath}/api/users/${encodeURIComponent(String(userId))}/bicycles`,
            {
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param searchTerm
     * @param pageNumber
     * @param pageSize
     * @param orderBy
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public headBicycleList(searchTerm?: string, pageNumber?: number, pageSize?: number, orderBy?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<BicycleForReadModel>>;
    public headBicycleList(searchTerm?: string, pageNumber?: number, pageSize?: number, orderBy?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<BicycleForReadModel>>>;
    public headBicycleList(searchTerm?: string, pageNumber?: number, pageSize?: number, orderBy?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<BicycleForReadModel>>>;
    public headBicycleList(searchTerm?: string, pageNumber?: number, pageSize?: number, orderBy?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (searchTerm !== undefined && searchTerm !== null) {
            queryParameters = queryParameters.set('SearchTerm', <any>searchTerm);
        }
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('PageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('PageSize', <any>pageSize);
        }
        if (orderBy !== undefined && orderBy !== null) {
            queryParameters = queryParameters.set('OrderBy', <any>orderBy);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<BicycleForReadModel>>('head',`${this.basePath}/api/bicycles`,
            {
                params: queryParameters,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public partiallyUpdateBicycle(id: string, body?: Array<Operation>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public partiallyUpdateBicycle(id: string, body?: Array<Operation>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public partiallyUpdateBicycle(id: string, body?: Array<Operation>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public partiallyUpdateBicycle(id: string, body?: Array<Operation>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling partiallyUpdateBicycle.');
        }


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('patch',`${this.basePath}/api/bicycles/${encodeURIComponent(String(id))}`,
            {
                body: body,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateBicycle(id: string, body?: BicycleForCreateOrUpdateModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateBicycle(id: string, body?: BicycleForCreateOrUpdateModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateBicycle(id: string, body?: BicycleForCreateOrUpdateModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateBicycle(id: string, body?: BicycleForCreateOrUpdateModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateBicycle.');
        }


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/api/bicycles/${encodeURIComponent(String(id))}`,
            {
                body: body,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
