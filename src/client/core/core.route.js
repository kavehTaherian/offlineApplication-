/**
 * Created by Kaveh T a h e r i a n on 13/08/2017.
 */
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/layout/views/404.html',
                    title: '404'
                }
            }
        ];
    }
})();












