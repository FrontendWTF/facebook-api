angular.module('facebook.api', [
  'facebook'
]).provider('FacebookApi', function () {
  var provider = {
    $get: function (
      $q,
      Facebook
    ) {
      var deferred = $q.defer();

      return function (config) {
        Facebook.promise.then(function (FB) {
          FB.api(config.path, config.method, config.params, function (
            response
          ) {
            if (!response || response.error) {
              deferred.reject(response);
            } else {
              deferred.resolve(response);
            }
          });

          return FB;
        });

        return deferred.promise;
      };
    }
  };

  return provider;
});
