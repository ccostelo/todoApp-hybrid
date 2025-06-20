// Notification Service
angular.module('todoApp').service("NotificationService", function ($timeout) {
  var notification = {
    show: false,
    message: "",
    type: "success",
  };

  this.getNotification = function () {
    console.log('[NotificationService] getNotification called.', );
    return notification;
  };

  this.showSuccess = function (message) {
    console.log('[NotificationService] showSuccess called with:', message);
    this.show(message, "success");
  };

  this.showError = function (message) {
    console.log('[NotificationService] showError called with:', message);
    this.show(message, "error");
  };

  this.show = function (message, type) {
    console.log(`[NotificationService] show called with: ${message} & ${type}`);
    notification.message = message;
    notification.type = type || "success";
    notification.show = true;

    $timeout(function () {
      notification.show = false;
    }, 3000);
  };
});
