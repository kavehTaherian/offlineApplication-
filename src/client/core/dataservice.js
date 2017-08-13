/**
 * Created by Kaveh T a h e r i a n on 12/08/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q', 'logger'];
    /* @ngInject */
    function dataService($http, $q, logger) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getActors : getActors,
            getActorsCount : getActorsCount,
            getActorMovies : getMovieById,
            getMovies : getMovies,
            getMoviesCount : getMoviesCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            return $http.get('/api/users')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for people failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function getActors(){
            return $http.get('/api/actors').then(success).catch(fail);

            function success(response){
                return response.data;
            }

            function fail(error){
                var msg = 'query for people failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        function getActorsCount(){
            return $http.get('/api/actors/count').then(success).catch(fail);
            function success(response){
                return response.data;
            }
            function fail(){
                var msg = 'query for people failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        function getMovieById(actorId){
            return $http(
                {
                    method : 'get',
                    url : '/api/actors/'+actorId
                }).then(success).catch(fail);
            function success(response){
                return response.data;
            }
            function fail(){
                var msg = 'query for people failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        function getMovies(){
            return $http({
                method : 'GET',
                url : '/api/movies'
            }).then(success).catch(fail);
            function success(response){
                return response.data;
            }
            function fail(){
                var msg = 'query for Movie failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
        function getMoviesCount(){
            return $http.get('/api/movies/count').then(success).catch(fail);
            function success(response){
                return response.data;
            }
            function fail(){
                var msg = 'query for movies Count failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
    }
})();