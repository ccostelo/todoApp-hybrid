// Storage Service (simulated localStorage)
angular.module('todoApp').service('StorageService', function() {
    var storage = {};

    this.get = function(key) {
        return storage[key];
    };

    this.set = function(key, value) {
        storage[key] = value;
    };

    this.remove = function(key) {
        delete storage[key];
    };
});