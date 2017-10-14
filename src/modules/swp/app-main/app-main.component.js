'use strict';

angular.module('AppMain')
    .component('appMain', {
        templateUrl: 'static/swp/app-main/app-main.template.html',
        controller: AppMain
    });

function AppMain(categories) {
    let AppMain = this;

    AppMain.$onInit = () => {
        AppMain.categoriesService = categories;
    }
}
