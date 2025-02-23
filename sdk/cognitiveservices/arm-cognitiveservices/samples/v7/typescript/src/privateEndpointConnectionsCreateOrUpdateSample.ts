/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  PrivateEndpointConnection,
  CognitiveServicesManagementClient
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Update the state of specified private endpoint connection associated with the Cognitive Services account.
 *
 * @summary Update the state of specified private endpoint connection associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2022-03-01/examples/PutPrivateEndpointConnection.json
 */
async function putPrivateEndpointConnection() {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "res7687";
  const accountName = "sto9699";
  const privateEndpointConnectionName = "{privateEndpointConnectionName}";
  const properties: PrivateEndpointConnection = {
    properties: {
      privateLinkServiceConnectionState: {
        description: "Auto-Approved",
        status: "Approved"
      }
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.privateEndpointConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    accountName,
    privateEndpointConnectionName,
    properties
  );
  console.log(result);
}

putPrivateEndpointConnection().catch(console.error);
