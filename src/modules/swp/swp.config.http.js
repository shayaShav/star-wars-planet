angular.module('Swp')
.config(($httpProvider) => {
    $httpProvider.interceptors.push(
        ($q, $injector) => {
            return {
                request: config => {
                     // Direct '/api' requests to the global SWP_CONFIG "api" value
                    config.url = config.url.replace(/^\/api/, SWP_CONFIG.api.path);

                    return config;
                }
            }
        }
    );
});
