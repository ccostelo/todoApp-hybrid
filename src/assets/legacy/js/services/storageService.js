// Storage Service (simulated localStorage)
angular.module('todoApp').service('StorageService', function() {
    var storage = {};

    this.get = function(key) {
        console.log('[StorageService] get called with:', key);
        return storage[key];
    };

    this.set = function(key, value) {
        console.log('[StorageService] set called with:', key);
        storage[key] = value;
    };

    this.remove = function(key) {
        console.log('[StorageService] remove called with:', key);
        delete storage[key];
    };
});