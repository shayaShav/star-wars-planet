'use strict';

angular.module('CategorySelectedItem')
    .component('categorySelectedItem', {
        templateUrl: 'static/swp/app-main/category/category-selected-item/category-selected-item.template.html',
        controller: CategorySelectedItem,
        bindings: {
            selectedItem: '<'
        }
    });

function CategorySelectedItem(categories) {
    let CategorySelectedItem = this;

    CategorySelectedItem.$onInit = () => {
        CategorySelectedItem.categoriesService = categories;
    };

    // ng-repeat filter
    CategorySelectedItem.filterArrayValues = (value) => !Array.isArray(value);

}
