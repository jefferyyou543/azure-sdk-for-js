/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { InviteBody, LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Operation to invite a user to a lab.
 *
 * @summary Operation to invite a user to a lab.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/inviteUser.json
 */
async function inviteUser() {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "testrg123";
  const labName = "testlab";
  const userName = "testuser";
  const body: InviteBody = { text: "Invitation to lab testlab" };
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.users.beginInviteAndWait(
    resourceGroupName,
    labName,
    userName,
    body
  );
  console.log(result);
}

inviteUser().catch(console.error);
