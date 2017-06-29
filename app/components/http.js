(function(angular) {

  'use strict';

  var http = angular.module('moviecat.services.http', []);

  http.service('HttpService', ['$window', '$document', function($window, $document) {
    // url:http://api.douban.com/v2/movie/in_theaters

    this.jsonp = function(url, data, callback) {
      //1.挂载回调函数，把callback函数挂载到window中，作为全局函数
      var cbfunName = 'my_jsonp_cb_' + Math.random().toString().replace('.', '');
      $window[cbfunName] = callback;
      //2.将data转换为url字符串的形式
      var querystring = url.indexOf('?') == -1 ? '?' : '&';
      for (var key in data) {
        querystring += (key + '=' + data[key] + '&');
      }
      //3.处理url地址中的回调参数
      querystring += ('callback=' + cbfunName);
      //4.创建一个script标签
      var oScript = $document[0].createElement('script');
      oScript.src = url + querystring;
      //5.将script标签添加到页面中
      $document[0].body.appendChild(oScript);
    };

  }]);

})(angular);