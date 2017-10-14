'use strict';

angular.module('Swp')
.constant('swpConfig', (
    () => {
        let swpConfig = angular.copy(window.SWP_CONFIG);
    
        swpConfig.update_config_data = (newConfigData) => {
            Object.assign(swpConfig, newConfigData);
        }

        return swpConfig;
    })()
);
