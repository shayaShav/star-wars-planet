'use strict';

angular.module('Swp')
    .config(function($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.when('/', '/people');

        var states = [{
                name: 'swp',
                component: 'swp'
            },
            {
                name: 'swp.main',
                url: '/',
                component: 'appMain'
            },
            {
                name: 'swp.main.category',
                url: ':category',
                component: 'category'
            }
        ];

        // Loop over the states and register them
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
    });
