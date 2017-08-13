/**
 * Created by Kaveh T a h e r i a n on 12/08/2017.
 */
(function () {
    'use strict';
    var moduleId = 'app.core';
    var core = angular.module(moduleId);
    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr){
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }
    var config = {
        appErrorPrefix: '[Offline Error] ',
        appTitle: 'offlineApplication'
    };

    core.value('config',config);
    configure.$inject = ['$logProvider', 'routerHelperProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        //exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({ docTitle: config.appTitle + ': '});
    }

})();