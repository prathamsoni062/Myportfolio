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

    // Expenses API endpoint
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

    createExpenses: new ApiConfigModel({
        module: 'base',
        pathTemplate: 'expenses/createExpenses',
        method: "POST",
        shouldUseStub: false,
        stubPath: './api/expenses.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    }),

    updateExpenses: new ApiConfigModel({
        module: 'base',
        pathTemplate: 'expenses/updateExpenses/:id',
        method: "PUT",
        shouldUseStub: false,
        stubPath: './api/expenses.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    }),

    deleteExpenses: new ApiConfigModel({
        module: 'base',
        pathTemplate: 'expenses/deleteExpenses/:id',
        method: "DELETE",
        shouldUseStub: false,
        stubPath: './api/expenses.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    }),

    // Investments API endpoint
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
    }),
    addInvestment:new ApiConfigModel({
        module: 'base',
        pathTemplate: 'investments/addInvestment',
        method: "POST",
        shouldUseStub: false,
        stubPath: './api/investments.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    }),
    updateInvestment:new ApiConfigModel({
        module: 'base',
        pathTemplate: 'investments/updateInvestment/:id',
        method: "PUT",
        shouldUseStub: false,
        stubPath: './api/investments.json',
        handleSuccessInComponent: true,
        handleErrorInComponent: true,
        isBlocking: false,
        isSilent: false,
        isRetryAllowed: false,
        useHttpCookies: false
    }),
    deleteInvestment:new ApiConfigModel({
        module: 'base',
        pathTemplate: 'investments/deleteInvestment/:id',
        method: "DELETE",
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