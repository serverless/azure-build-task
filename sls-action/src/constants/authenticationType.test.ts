import { AuthenticationTypeConst, AuthenticationTypeUtil } from './authenticationType'

test('parses as aws auth type', async() => {
    const authType = AuthenticationTypeUtil.FromCredentials(JSON.stringify(
        {
            secretAccessKey: 'I am super secret',
            accessKeyId: 'I am an access id',
        }
    ));

    expect(authType).toEqual(AuthenticationTypeConst.AWS);
});

test('parses as azure auth type', async() => {
    const authType = AuthenticationTypeUtil.FromCredentials(JSON.stringify(
        {
            appId: 'I am an application id',
            password: 'I am super secret',
            tenant: 'What tenant id',
            subscriptionId: 'The sub has been identified',
        }
    ));

    expect(authType).toEqual(AuthenticationTypeConst.Azure);
});

test.each([
    [JSON.stringify({
        appId: 'I am an application id',
        tenant: 'What tenant id',
        subscriptionId: 'The sub has been identified',
    })],
    [JSON.stringify({
        password: 'I am super secret',
        tenant: 'What tenant id',
        subscriptionId: 'The sub has been identified',
    })],
    [JSON.stringify({
        appId: 'I am an application id',
        password: 'I am super secret',
        subscriptionId: 'The sub has been identified',
    })],
    [JSON.stringify({
        appId: 'I am an application id',
        password: 'I am super secret',
        tenant: 'What tenant id',
    })],
    [JSON.stringify({
        secretAccessKey: 'I am super secret',
    })],
    [JSON.stringify({
        accessKeyId: 'I am an access id',
    })],
])(
'missing property throws an error', (credentials) => {
    expect(() => {
        AuthenticationTypeUtil.FromCredentials(credentials)
    }).toThrowError();
});
