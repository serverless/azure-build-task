import { CredentialParser } from './CredentialParser';
import { AuthenticationTypeConst } from './constants/authenticationType'

test('aws credentials can be parsed', async () => {
    const credentials = {
        accessKeyId: 'I am an access id',
        secretAccessKey: 'I am super secret',
    }

    const credentialParser = new CredentialParser(JSON.stringify(credentials));

    credentialParser.setLoginVariables();

    expect(process.env.AWS_ACCESS_KEY_ID).toEqual(credentials.accessKeyId);
    expect(process.env.AWS_SECRET_ACCESS_KEY).toEqual(credentials.secretAccessKey);
});

test('azure credentials can be parsed', async () => {
    const credentials = {
        appId: 'I am an application id',
        password: 'I am super secret',
        tenant: 'What tenant id',
        subscriptionId: 'The sub has been identified',
    }

    const credentialParser = new CredentialParser(JSON.stringify(credentials));

    credentialParser.setLoginVariables();

    expect(process.env.AZURE_CLIENT_ID).toEqual(credentials.appId);
    expect(process.env.AZURE_CLIENT_SECRET).toEqual(credentials.password);
    expect(process.env.AZURE_TENANT_ID).toEqual(credentials.tenant);
    expect(process.env.AZURE_SUBSCRIPTION_ID).toEqual(credentials.subscriptionId);
});
