import * as core from '@actions/core';
import { AuthenticationTypeConst, AuthenticationTypeUtil } from './constants/authenticationType';
import { FormatType, SecretParser } from 'actions-secret-parser';

export class CredentialParser {
    authType: AuthenticationTypeConst;
    credentials: string;

    constructor(credentials: string) {
        this.credentials = credentials;
        this.authType = AuthenticationTypeUtil.FromCredentials(credentials);
    }

    setLoginVariables() {
        let secrets = new SecretParser(this.credentials, FormatType.JSON);
        switch (this.authType) {
            case AuthenticationTypeConst.AWS : {
                this.setAWSSecrets(secrets);
                break;
            }
            case AuthenticationTypeConst.Azure : {
                this.setAzureServicePrincipal(secrets);
                break;
            }
            default : {
                throw new Error('Invalid Authentication Type')
            }
        }
    }

    setAWSSecrets(secrets:SecretParser) {   
        process.env.AWS_ACCESS_KEY_ID = secrets.getSecret('$.accessKeyId', false);
        process.env.AWS_SECRET_ACCESS_KEY = secrets.getSecret('$.secretAccessKey', true);
        
        core.info('AWS Login settings configured.');    
    }

    setAzureServicePrincipal(secrets:SecretParser) {   
        process.env.AZURE_SUBSCRIPTION_ID = secrets.getSecret('$.subscriptionId', false);
        process.env.AZURE_TENANT_ID = secrets.getSecret('$.tenant', false);
        process.env.AZURE_CLIENT_ID = secrets.getSecret('$.appId', false);
        process.env.AZURE_CLIENT_SECRET = secrets.getSecret('$.password', true);
        
        core.info('Azure Login settings configured.');    
    }
}
