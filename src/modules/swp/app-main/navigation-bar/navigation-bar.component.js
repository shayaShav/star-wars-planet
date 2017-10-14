'use strict';

angular.module('NavigationBar')
    .component('navigationBar', {
        templateUrl: 'static/swp/app-main/navigation-bar/navigation-bar.template.html',
        controller: NavigationBar
    });

function NavigationBar(categories) {
    let NavigationBar = this;

    NavigationBar.$onInit = () => {
        NavigationBar.categoriesService = categories;
    };

    NavigationBar.linkClick = (category) => {
        categories.get_category(category);
    }
}
