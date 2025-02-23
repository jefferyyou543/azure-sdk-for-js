/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ResourcePatch, Scvmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates the VirtualMachineTemplate resource.
 *
 * @summary Updates the VirtualMachineTemplate resource.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/preview/2020-06-05-preview/examples/UpdateVirtualMachineTemplate.json
 */
async function updateVirtualMachineTemplate() {
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = "testrg";
  const virtualMachineTemplateName = "HRVirtualMachineTemplate";
  const body: ResourcePatch = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new Scvmm(credential, subscriptionId);
  const result = await client.virtualMachineTemplates.beginUpdateAndWait(
    resourceGroupName,
    virtualMachineTemplateName,
    body
  );
  console.log(result);
}

updateVirtualMachineTemplate().catch(console.error);
