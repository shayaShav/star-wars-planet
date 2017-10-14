'use strict';

angular.module('Swp')
    .component('swp', {
        templateUrl: 'static/swp/swp.template.html',
        controller: Swp
    });

    function Swp(categories) {
        let Swp = this;

        Swp.$onInit = () => {
            categories.get_categories_keys();
        };
    }
