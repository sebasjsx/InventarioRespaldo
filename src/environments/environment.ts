export const environment = {
    urlMain: 'http://3.140.207.230:8000/api',
    authUrl: 'http://3.140.207.230:8000/api/auth',
    recover: 'http://3.140.207.230:8000/api/user/recover-password',
    restore: 'http://3.140.207.230:8000/api/user/update-password',
    production: false,
    apiUrls: {
        getUsers: 'http://3.140.207.230:8000/api/user/getUsers', 
        getProfiles: 'http://3.140.207.230:8000/api/profile/list',
        deleteUsers: 'http://3.140.207.230:8000/api/user/delete',
        postUser: 'http://3.140.207.230:8000/api/auth/signup',
        searchUser: 'http://3.140.207.230:8000/api/user/search',
        updateUsers: 'http://3.140.207.230:8000/api/user'
    },
    profileUrl: {
        getProfiles: 'http://3.140.207.230:8000/api/profile/list',
        createProfile: 'http://3.140.207.230:8000/api/profile/create',
        deleteProfile: 'http://3.140.207.230:8000/api/profile/delete',
        updateProfile: 'http://3.140.207.230:8000/api/profile/update',
        searchProfile: 'http://3.140.207.230:8000/api/profile/search'
    },
    changePassword: {
        patchChangePass: 'http://3.140.207.230:8000/api/user/change-password',
    },
    categoryUrl: {
        getCategories: 'http://3.140.207.230:8000/api/category/list',
        createCategory: 'http://3.140.207.230:8000/api/category/create',
        deleteCategory: 'http://3.140.207.230:8000/api/category/delete',
        updateCategory: 'http://3.140.207.230:8000/api/category/update',
        searchCategory: 'http://3.140.207.230:8000/api/category/search'
    },
    companyUrl:{
        getCompany: 'http://3.140.207.230:8000/api/company/list',
        createCompany: 'http://3.140.207.230:8000/api/company/create',
        deleteCompany: 'http://3.140.207.230:8000/api/company/delete',
        updateCompany: 'http://3.140.207.230:8000/api/company/update',
        searchCompany: 'http://3.140.207.230:8000/api/company/search'
    },
    wineryUrl:{
        getWinery: 'http://3.140.207.230:8000/api/winery/list',
        createWinery: 'http://3.140.207.230:8000/api/winery/create',
        deleteWinery: 'http://3.140.207.230:8000/api/winery/delete',
        updateWinery: 'http://3.140.207.230:8000/api/winery/update',
        searchWinery: 'http://3.140.207.230:8000/api/winery/search'
    },
    productUrl:{
        getProduct: 'http://3.140.207.230:8000/api/product/list',
        createProduct: 'http://3.140.207.230:8000/api/product/create',
        deleteProduct: 'http://3.140.207.230:8000/api/product/delete',
        updateProduct: 'http://3.140.207.230:8000/api/product/update',
        searchProduct: 'http://3.140.207.230:8000/api/product/search'
    },
    auditUrl:{
        getAudit: 'http://3.140.207.230:8000/api/audit/list',
        searchAudit: 'http://3.140.207.230:8000/api/audit/search'
    },
    purchaseUrl:{
        getPurchase: 'http://3.140.207.230:8000/api/purchase/list',
        createPurchase: 'http://3.140.207.230:8000/api/purchase/create',
        deletePurchase: 'http://3.140.207.230:8000/api/purchase/delete',
        updatePurchase: 'http://3.140.207.230:8000/api/purchase/update',
        searchPurchase: 'http://3.140.207.230:8000/api/purchase/search'
    }
};