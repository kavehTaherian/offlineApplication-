/**
 * Created by Kaveh T a h e r i a n on 13/08/2017.
 */
(function () {
    'use strict';

    var moduleId = 'blocks.router',
        factoryId = 'routerHelper';
    angular
        .module(moduleId)
        .provider(factoryId, routerHelperProvider);

    routerHelperProvider.$inject = ['$stateProvider','$locationProvider','$urlRouterProvider'];

    /* @ngInject */
    function routerHelperProvider($stateProvider,$locationProvider,$urlRouterProvider) {
        var config = {
            docTitle : undefined,
            resolveAlways : {}
        };

        $locationProvider.html5Mode({ enabled : true , requireBase : false });

        this.configure = function (cfg) {
            angular.extend(config,cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location','$rootScope','$state','logger'];
        function RouterHelper($location,$rootScope,$state,logger){
            var handlingStateChangeError = false;
            var hasOtherWise = false;
            var stateCounts = {
                errors : 0,
                changes : 0
            };

            var service  = {
                configureStates : configureStates,
                getStates : getStates
            };
            init();
            return service;
            function configureStates(states,otherwisePath){
                states.forEach(function (state) {
                    state.config.resolve = angular.extend(state.config.resolve || {},config.resolveAlways);
                    $stateProvider.state(state.state,state.config);
                });
                if(otherwisePath && !hasOtherWise){
                    hasOtherWise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }
            function handleRoutingErrors(){
                $rootScope.$on('$stateChangeError',
                    function (event, toState, toParams, fromState, fromParams, error) {
                        if(handlingStateChangeError){ return; }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState && (toState.title || toState.name || toState.loadedTemplateUrl)) || 'unknown target';
                        var msg = 'Error routing to '+ destination +'. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/');
                    }
                );
            }
            function init(){
                handleRoutingErrors();
                updateDocTitle();
            }
            function getStates(){
                return $state.get();
            }
            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>
                    }
                );
            }
        }
    }
})();