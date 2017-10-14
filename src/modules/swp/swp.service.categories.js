'use strict';

angular.module('Swp').factory('categories', ($state, $stateParams, $http, $timeout, $mdMedia, swpConfig) => {

    let categories = {
        categories_keys: [],
        categories_data: {},
        categories_bookmarks_map: {},

        selected_category_index: null, // required to display the active "md-tab" in the navigation-bar
        selected_category_name: null,
        selected_category_item: null,
        selected_category_is_loading: false, // loading animation flag

        select_category_item: (item) => categories.selected_category_item = item,
        deselect_category_item: () => categories.selected_category_item = null,

        get_categories_keys: () => {

            $http({
                method: 'GET',
                url: '/api/'
            })

            .then(response => {
                // save the categories keys
                categories.categories_keys = Object.keys(response.data);
                // track the selected category index to select the active md-tab in the navigation-bar
                categories.selected_category_index = categories.categories_keys.indexOf($stateParams.category).toString(); // Material quirk - after a reload, when index is 0 it needs to be stringified to be "active"
            })

            .catch(error => console.log('error loading categories list: ', error.statusText))
        },

        get_category: (categoryName) => {

            categories.selected_category_name  = categoryName;
            categories.selected_category_index = categories.categories_keys.indexOf(categoryName);

            // category already loaded
            if (categories.categories_data[categories.selected_category_name]) {

                // auto select first item
                categories.selected_category_item = categories.categories_data[categories.selected_category_name][0];
                $state.go('swp.main.category', {category: categoryName});

            // get category data from the API
            } else {

                // activate loading animation
                categories.selected_category_is_loading = true;

                return $http({
                    method: 'GET',
                    url: `/api/${categories.selected_category_name}/`
                })

                .then(category => {
                    // merge the local bookmarks with the api data
                    categories.categories_data[categories.selected_category_name] = categories.merge_local_bookmarks(category.data.results);
                    // select the first item in the category (desktop only)
                    if (!$mdMedia('xs')) categories.selected_category_item = categories.categories_data[categories.selected_category_name][0];

                    $state.go('swp.main.category', {category: categoryName});
                })

                .catch(error => console.log('error loading category: ', error.statusText))

                // deactivate loading animation
                .finally(() => categories.selected_category_is_loading = false);
            }
        },

        toggle_category_item_bookmark: (item) => {

            item.bookmarked = !item.bookmarked;

            // some category items only have a "title" property
            let itemId = item.name || item.title;

            // update the category-bookmarks-map
            categories.categories_bookmarks_map[categories.selected_category_name][itemId] = item.bookmarked;
            // save the category-bookmarks-map to localStorage
            localStorage.setItem(categories.selected_category_name, JSON.stringify(categories.categories_bookmarks_map[categories.selected_category_name]))
        },


        merge_local_bookmarks: (category) => {

            // get category data from localStorage
            if (localStorage[categories.selected_category_name]) {
                // save the parsed localStorage category data to the categories-bookmarks-map
                categories.categories_bookmarks_map[categories.selected_category_name] = JSON.parse(localStorage[categories.selected_category_name]);

                // merge local bookmarks to the current category
                category.map(item => {
                    let itemIdentifier = item.name || item.title;
                    item.bookmarked = categories.categories_bookmarks_map[categories.selected_category_name][itemIdentifier];
                    return item;
                })

            // no localStorage data, set category map to empty object
            } else {
                categories.categories_bookmarks_map[categories.selected_category_name] = {};
            }

            return category;
        }
    };

    return categories;

});
