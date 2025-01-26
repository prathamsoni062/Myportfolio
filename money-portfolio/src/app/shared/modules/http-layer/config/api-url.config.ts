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
    getDashboardData: new ApiConfigModel({
        module: 'base',
        pathTemplate: 'dashboard/getDashboardData',
        method: "GET",
        shouldUseStub: false,
        stubPath: './api/dashboard.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    }),
    getExpenses: new ApiConfigModel({
        module: 'base',
        pathTemplate: 'expenses/getExpenses',
        method: "GET",
        shouldUseStub: false,
        stubPath: './api/expenses.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    }),
    getInvestments: new ApiConfigModel({
        module: 'base',
        pathTemplate: 'investments/getInvestments',
        method: "GET",
        shouldUseStub: false,
        stubPath: './api/investments.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    })
};

export default apiUrlConfigs;