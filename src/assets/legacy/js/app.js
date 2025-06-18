// Main App Module
(function() {
    'use strict';
    angular.module('todoApp', [])
    .config(function() {
        console.log('todoApp initialized');
    })
    .run(function() {
        console.log('todoApp running');
    });
})();