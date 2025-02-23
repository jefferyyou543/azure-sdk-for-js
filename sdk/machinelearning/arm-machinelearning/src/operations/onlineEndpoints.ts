/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { OnlineEndpoints } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { AzureMachineLearningWorkspaces } from "../azureMachineLearningWorkspaces";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  OnlineEndpointData,
  OnlineEndpointsListNextOptionalParams,
  OnlineEndpointsListOptionalParams,
  OnlineEndpointsListResponse,
  OnlineEndpointsDeleteOptionalParams,
  OnlineEndpointsGetOptionalParams,
  OnlineEndpointsGetResponse,
  PartialOnlineEndpointPartialTrackedResource,
  OnlineEndpointsUpdateOptionalParams,
  OnlineEndpointsUpdateResponse,
  OnlineEndpointsCreateOrUpdateOptionalParams,
  OnlineEndpointsCreateOrUpdateResponse,
  OnlineEndpointsListKeysOptionalParams,
  OnlineEndpointsListKeysResponse,
  RegenerateEndpointKeysRequest,
  OnlineEndpointsRegenerateKeysOptionalParams,
  OnlineEndpointsGetTokenOptionalParams,
  OnlineEndpointsGetTokenResponse,
  OnlineEndpointsListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing OnlineEndpoints operations. */
export class OnlineEndpointsImpl implements OnlineEndpoints {
  private readonly client: AzureMachineLearningWorkspaces;

  /**
   * Initialize a new instance of the class OnlineEndpoints class.
   * @param client Reference to the service client
   */
  constructor(client: AzureMachineLearningWorkspaces) {
    this.client = client;
  }

  /**
   * List Online Endpoints.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    workspaceName: string,
    options?: OnlineEndpointsListOptionalParams
  ): PagedAsyncIterableIterator<OnlineEndpointData> {
    const iter = this.listPagingAll(resourceGroupName, workspaceName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(resourceGroupName, workspaceName, options);
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    workspaceName: string,
    options?: OnlineEndpointsListOptionalParams
  ): AsyncIterableIterator<OnlineEndpointData[]> {
    let result = await this._list(resourceGroupName, workspaceName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        workspaceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    workspaceName: string,
    options?: OnlineEndpointsListOptionalParams
  ): AsyncIterableIterator<OnlineEndpointData> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      workspaceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List Online Endpoints.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    workspaceName: string,
    options?: OnlineEndpointsListOptionalParams
  ): Promise<OnlineEndpointsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, options },
      listOperationSpec
    );
  }

  /**
   * Delete Online Endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
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
      { resourceGroupName, workspaceName, endpointName, options },
      deleteOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete Online Endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      workspaceName,
      endpointName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Get Online Endpoint.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsGetOptionalParams
  ): Promise<OnlineEndpointsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, endpointName, options },
      getOperationSpec
    );
  }

  /**
   * Update Online Endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param body Online Endpoint entity to apply during operation.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialOnlineEndpointPartialTrackedResource,
    options?: OnlineEndpointsUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<OnlineEndpointsUpdateResponse>,
      OnlineEndpointsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<OnlineEndpointsUpdateResponse> => {
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
      { resourceGroupName, workspaceName, endpointName, body, options },
      updateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Update Online Endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param body Online Endpoint entity to apply during operation.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialOnlineEndpointPartialTrackedResource,
    options?: OnlineEndpointsUpdateOptionalParams
  ): Promise<OnlineEndpointsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      workspaceName,
      endpointName,
      body,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Create or update Online Endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param body Online Endpoint entity to apply during operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: OnlineEndpointData,
    options?: OnlineEndpointsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<OnlineEndpointsCreateOrUpdateResponse>,
      OnlineEndpointsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<OnlineEndpointsCreateOrUpdateResponse> => {
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
      { resourceGroupName, workspaceName, endpointName, body, options },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create or update Online Endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param body Online Endpoint entity to apply during operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: OnlineEndpointData,
    options?: OnlineEndpointsCreateOrUpdateOptionalParams
  ): Promise<OnlineEndpointsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      workspaceName,
      endpointName,
      body,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * List EndpointAuthKeys for an Endpoint using Key-based authentication.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param options The options parameters.
   */
  listKeys(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsListKeysOptionalParams
  ): Promise<OnlineEndpointsListKeysResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, endpointName, options },
      listKeysOperationSpec
    );
  }

  /**
   * Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param body RegenerateKeys request .
   * @param options The options parameters.
   */
  async beginRegenerateKeys(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: RegenerateEndpointKeysRequest,
    options?: OnlineEndpointsRegenerateKeysOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
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
      { resourceGroupName, workspaceName, endpointName, body, options },
      regenerateKeysOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param body RegenerateKeys request .
   * @param options The options parameters.
   */
  async beginRegenerateKeysAndWait(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: RegenerateEndpointKeysRequest,
    options?: OnlineEndpointsRegenerateKeysOptionalParams
  ): Promise<void> {
    const poller = await this.beginRegenerateKeys(
      resourceGroupName,
      workspaceName,
      endpointName,
      body,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Retrieve a valid AAD token for an Endpoint using AMLToken-based authentication.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Online Endpoint name.
   * @param options The options parameters.
   */
  getToken(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsGetTokenOptionalParams
  ): Promise<OnlineEndpointsGetTokenResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, endpointName, options },
      getTokenOperationSpec
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    workspaceName: string,
    nextLink: string,
    options?: OnlineEndpointsListNextOptionalParams
  ): Promise<OnlineEndpointsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OnlineEndpointTrackedResourceArmPaginatedResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skip,
    Parameters.count,
    Parameters.tags1,
    Parameters.properties1,
    Parameters.name2,
    Parameters.computeType,
    Parameters.orderBy2
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.endpointName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OnlineEndpointData
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.endpointName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.OnlineEndpointData
    },
    201: {
      bodyMapper: Mappers.OnlineEndpointData
    },
    202: {
      bodyMapper: Mappers.OnlineEndpointData
    },
    204: {
      bodyMapper: Mappers.OnlineEndpointData
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.body16,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.endpointName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.OnlineEndpointData
    },
    201: {
      bodyMapper: Mappers.OnlineEndpointData
    },
    202: {
      bodyMapper: Mappers.OnlineEndpointData
    },
    204: {
      bodyMapper: Mappers.OnlineEndpointData
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.body17,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.endpointName1
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listKeysOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/listKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.EndpointAuthKeys
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.endpointName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const regenerateKeysOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/regenerateKeys",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.body18,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.endpointName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getTokenOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/token",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.EndpointAuthToken
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.endpointName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OnlineEndpointTrackedResourceArmPaginatedResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skip,
    Parameters.count,
    Parameters.tags1,
    Parameters.properties1,
    Parameters.name2,
    Parameters.computeType,
    Parameters.orderBy2
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
