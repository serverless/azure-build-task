export enum AuthenticationTypeConst {
    AWS = 1,
    Azure
}

export class AuthenticationTypeUtil {
    public static FromCredentials(credentials:string) : AuthenticationTypeConst {
        const creds = JSON.parse(credentials);

        if(creds.appId && creds.password && creds.tenant && creds.subscriptionId){
            return AuthenticationTypeConst.Azure;
        }

        if(creds.accessKeyId && creds.secretAccessKey){
            return AuthenticationTypeConst.AWS;
        }
        
        throw new Error('Invalid credentials provided');
    }
}