'use strict';

angular.module('CategoryItemsList')
    .component('categoryItemsList', {
        templateUrl: 'static/swp/app-main/category/category-items-list/category-items-list.template.html',
        controller: CategoryItemsList,
        bindings: {
            categoryItems: '<'
        }
    });

function CategoryItemsList(categories) {
    let CategoryItemsList = this;

    CategoryItemsList.$onInit = () => {
        CategoryItemsList.categoriesService = categories;
    };

}
