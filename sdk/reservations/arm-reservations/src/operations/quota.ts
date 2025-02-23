/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Quota } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { AzureReservationAPI } from "../azureReservationAPI";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  CurrentQuotaLimitBase,
  QuotaListNextOptionalParams,
  QuotaListOptionalParams,
  QuotaGetOptionalParams,
  QuotaGetResponse,
  QuotaCreateOrUpdateOptionalParams,
  QuotaCreateOrUpdateResponse,
  QuotaUpdateOptionalParams,
  QuotaUpdateResponse,
  QuotaListResponse,
  QuotaListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing Quota operations. */
export class QuotaImpl implements Quota {
  private readonly client: AzureReservationAPI;

  /**
   * Initialize a new instance of the class Quota class.
   * @param client Reference to the service client
   */
  constructor(client: AzureReservationAPI) {
    this.client = client;
  }

  /**
   * Gets a list of current quotas (service limits) and usage for all resources. The response from the
   * list quota operation can be leveraged to request quota updates.
   * @param subscriptionId Azure subscription ID.
   * @param providerId Azure resource provider ID.
   * @param location Azure region.
   * @param options The options parameters.
   */
  public list(
    subscriptionId: string,
    providerId: string,
    location: string,
    options?: QuotaListOptionalParams
  ): PagedAsyncIterableIterator<CurrentQuotaLimitBase> {
    const iter = this.listPagingAll(
      subscriptionId,
      providerId,
      location,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(
          subscriptionId,
          providerId,
          location,
          options
        );
      }
    };
  }

  private async *listPagingPage(
    subscriptionId: string,
    providerId: string,
    location: string,
    options?: QuotaListOptionalParams
  ): AsyncIterableIterator<CurrentQuotaLimitBase[]> {
    let result = await this._list(
      subscriptionId,
      providerId,
      location,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        subscriptionId,
        providerId,
        location,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    subscriptionId: string,
    providerId: string,
    location: string,
    options?: QuotaListOptionalParams
  ): AsyncIterableIterator<CurrentQuotaLimitBase> {
    for await (const page of this.listPagingPage(
      subscriptionId,
      providerId,
      location,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Get the current quota (service limit) and usage of a resource. You can use the response from the GET
   * operation to submit quota update request.
   * @param subscriptionId Azure subscription ID.
   * @param providerId Azure resource provider ID.
   * @param location Azure region.
   * @param resourceName The resource name for a resource provider, such as SKU name for
   *                     Microsoft.Compute, Sku or TotalLowPriorityCores for Microsoft.MachineLearningServices
   * @param options The options parameters.
   */
  get(
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    options?: QuotaGetOptionalParams
  ): Promise<QuotaGetResponse> {
    return this.client.sendOperationRequest(
      { subscriptionId, providerId, location, resourceName, options },
      getOperationSpec
    );
  }

  /**
   * Create or update the quota (service limits) of a resource to the requested value.
   *  Steps:
   * 
  1. Make the Get request to get the quota information for specific resource.
   * 
  2. To increase the quota, update the limit field in the response from Get request to new value.
   * 
  3. Submit the JSON to the quota request API to update the quota.
   *   The Create quota request may be constructed as follows. The PUT operation can be used to update
   * the quota.
   * @param subscriptionId Azure subscription ID.
   * @param providerId Azure resource provider ID.
   * @param location Azure region.
   * @param resourceName The resource name for a resource provider, such as SKU name for
   *                     Microsoft.Compute, Sku or TotalLowPriorityCores for Microsoft.MachineLearningServices
   * @param createQuotaRequest Quota requests payload.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<QuotaCreateOrUpdateResponse>,
      QuotaCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<QuotaCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options
      },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "original-uri"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create or update the quota (service limits) of a resource to the requested value.
   *  Steps:
   * 
  1. Make the Get request to get the quota information for specific resource.
   * 
  2. To increase the quota, update the limit field in the response from Get request to new value.
   * 
  3. Submit the JSON to the quota request API to update the quota.
   *   The Create quota request may be constructed as follows. The PUT operation can be used to update
   * the quota.
   * @param subscriptionId Azure subscription ID.
   * @param providerId Azure resource provider ID.
   * @param location Azure region.
   * @param resourceName The resource name for a resource provider, such as SKU name for
   *                     Microsoft.Compute, Sku or TotalLowPriorityCores for Microsoft.MachineLearningServices
   * @param createQuotaRequest Quota requests payload.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaCreateOrUpdateOptionalParams
  ): Promise<QuotaCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      subscriptionId,
      providerId,
      location,
      resourceName,
      createQuotaRequest,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Update the quota (service limits) of this resource to the requested value.
   * 
  • To get the quota information for specific resource, send a GET request.
   * 
  • To increase the quota, update the limit field from the GET response to a new value.
   * 
  • To update the quota value, submit the JSON response to the quota request API to update the
   * quota.
   *   • To update the quota. use the PATCH operation.
   * @param subscriptionId Azure subscription ID.
   * @param providerId Azure resource provider ID.
   * @param location Azure region.
   * @param resourceName The resource name for a resource provider, such as SKU name for
   *                     Microsoft.Compute, Sku or TotalLowPriorityCores for Microsoft.MachineLearningServices
   * @param createQuotaRequest Payload for the quota request.
   * @param options The options parameters.
   */
  async beginUpdate(
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaUpdateOptionalParams
  ): Promise<
    PollerLike<PollOperationState<QuotaUpdateResponse>, QuotaUpdateResponse>
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<QuotaUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options
      },
      updateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "original-uri"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Update the quota (service limits) of this resource to the requested value.
   * 
  • To get the quota information for specific resource, send a GET request.
   * 
  • To increase the quota, update the limit field from the GET response to a new value.
   * 
  • To update the quota value, submit the JSON response to the quota request API to update the
   * quota.
   *   • To update the quota. use the PATCH operation.
   * @param subscriptionId Azure subscription ID.
   * @param providerId Azure resource provider ID.
   * @param location Azure region.
   * @param resourceName The resource name for a resource provider, such as SKU name for
   *                     Microsoft.Compute, Sku or TotalLowPriorityCores for Microsoft.MachineLearningServices
   * @param createQuotaRequest Payload for the quota request.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    subscriptionId: string,
    providerId: string,
    location: string,
    resourceName: string,
    createQuotaRequest: CurrentQuotaLimitBase,
    options?: QuotaUpdateOptionalParams
  ): Promise<QuotaUpdateResponse> {
    const poller = await this.beginUpdate(
      subscriptionId,
      providerId,
      location,
      resourceName,
      createQuotaRequest,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets a list of current quotas (service limits) and usage for all resources. The response from the
   * list quota operation can be leveraged to request quota updates.
   * @param subscriptionId Azure subscription ID.
   * @param providerId Azure resource provider ID.
   * @param location Azure region.
   * @param options The options parameters.
   */
  private _list(
    subscriptionId: string,
    providerId: string,
    location: string,
    options?: QuotaListOptionalParams
  ): Promise<QuotaListResponse> {
    return this.client.sendOperationRequest(
      { subscriptionId, providerId, location, options },
      listOperationSpec
    );
  }

  /**
   * ListNext
   * @param subscriptionId Azure subscription ID.
   * @param providerId Azure resource provider ID.
   * @param location Azure region.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    subscriptionId: string,
    providerId: string,
    location: string,
    nextLink: string,
    options?: QuotaListNextOptionalParams
  ): Promise<QuotaListNextResponse> {
    return this.client.sendOperationRequest(
      { subscriptionId, providerId, location, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimits/{resourceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CurrentQuotaLimitBase,
      headersMapper: Mappers.QuotaGetHeaders
    },
    default: {
      bodyMapper: Mappers.ExceptionResponse
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.providerId,
    Parameters.location1,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimits/{resourceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.CurrentQuotaLimitBase
    },
    201: {
      bodyMapper: Mappers.CurrentQuotaLimitBase
    },
    202: {
      bodyMapper: Mappers.CurrentQuotaLimitBase
    },
    204: {
      bodyMapper: Mappers.CurrentQuotaLimitBase
    },
    default: {
      bodyMapper: Mappers.ExceptionResponse
    }
  },
  requestBody: Parameters.createQuotaRequest,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.providerId,
    Parameters.location1,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimits/{resourceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.CurrentQuotaLimitBase
    },
    201: {
      bodyMapper: Mappers.CurrentQuotaLimitBase
    },
    202: {
      bodyMapper: Mappers.CurrentQuotaLimitBase
    },
    204: {
      bodyMapper: Mappers.CurrentQuotaLimitBase
    },
    default: {
      bodyMapper: Mappers.ExceptionResponse
    }
  },
  requestBody: Parameters.createQuotaRequest,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.providerId,
    Parameters.location1,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimits",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaLimits,
      headersMapper: Mappers.QuotaListHeaders
    },
    default: {
      bodyMapper: Mappers.ExceptionResponse
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.providerId,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaLimits,
      headersMapper: Mappers.QuotaListNextHeaders
    },
    default: {
      bodyMapper: Mappers.ExceptionResponse
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.providerId,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
