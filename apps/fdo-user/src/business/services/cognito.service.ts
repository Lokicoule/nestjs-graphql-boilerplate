import {
  AdminAddUserToGroupCommandInput,
  AdminAddUserToGroupCommandOutput,
  CognitoIdentityProvider,
} from '@aws-sdk/client-cognito-identity-provider';
import { InjectCognitoIdentityProvider } from '@nestjs-cognito/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CognitoService {
  constructor(
    @InjectCognitoIdentityProvider()
    private readonly cognitoClient: CognitoIdentityProvider,
  ) {}

  public addUserToGroup(
    groupName: string,
    username: string,
    userPoolId: string,
  ): Promise<AdminAddUserToGroupCommandOutput> {
    const params: AdminAddUserToGroupCommandInput = {
      GroupName: groupName,
      UserPoolId: userPoolId,
      Username: username,
    };

    return new Promise((resolve, reject) => {
      this.cognitoClient.adminAddUserToGroup(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
