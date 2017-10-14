'use strict';

angular.module('Category')
    .component('category', {
        templateUrl: 'static/swp/app-main/category/category.template.html',
        controller: Category
    });

function Category(categories) {
    let Category = this;

    Category.$onInit = () => {
        Category.categoriesService = categories;
    }
}
