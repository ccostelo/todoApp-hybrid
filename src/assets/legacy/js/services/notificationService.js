// Notification Service
angular.module('todoApp').service("NotificationService", function ($timeout) {
  var notification = {
    show: false,
    message: "",
    type: "success",
  };

  this.getNotification = function () {
    return notification;
  };

  this.showSuccess = function (message) {
    this.show(message, "success");
  };

  this.showError = function (message) {
    this.show(message, "error");
  };

  this.show = function (message, type) {
    notification.message = message;
    notification.type = type || "success";
    notification.show = true;

    $timeout(function () {
      notification.show = false;
    }, 3000);
  };
});
