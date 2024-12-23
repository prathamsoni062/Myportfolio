import {ApiConfigModel} from "../models/api-config-model.model";

const apiUrlConfigs ={

    // User API
    login: new ApiConfigModel({
        module: 'base',
        pathTemplate: 'users/login',
        method: "POST",
        shouldUseStub: false,
        stubPath: './api/users.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    }),
    register: new ApiConfigModel({
        module: 'base',
        pathTemplate: 'users/register',
        method: "POST",
        shouldUseStub: false,
        stubPath: './api/users.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    }),

    
};

export default apiUrlConfigs;