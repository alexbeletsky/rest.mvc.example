$(function () {
    // helper
    function createCallUrl(url, method, params) {
        var callUrl = url + "/" + method;
        for (var p in params) {
            callUrl += "/" + params[p];
        }

        return callUrl;
    }

    module("rest api example tests", {
        setup: function () {
            this.url = 'api/v1';
        }
    });

    test("get all posts", function () {
        var method = 'posts/all';
        var data = null;
        var type = 'GET';
        var params = ['alexander.beletsky'];

        var call = createCallUrl(this.url, method, params);

        api_test(call, type, data, function (result) {
            ok(result.success, method + " method call failed");

            var tasks = result.data.posts;
            ok(tasks.length >= 3, "posts has not been returned");
        });
    });

    test("create new post", function () {
        var me = this;

        var method = 'posts/post';
        var data = { title: 'post from test' + new Date(), body: 'this is new post' };
        var type = 'POST';
        var params = ['alexander.beletsky'];

        var call = createCallUrl(this.url, method, params);

        api_test(call, type, data, function (result) {
            ok(result.success, method + " method call failed");

            var url = result.url;
            var method = 'posts/get';
            var data = null;
            var type = 'GET'
            var params = ['alexander.beletsky', url];

            var call = createCallUrl(me.url, method, params);

            api_test(call, type, data, function (result) {
                ok(result.success, method + " method call failed");
                same(result.data.Url, url);
            });
        });
    });

    test("delete post test", function () {
        var me = this;

        var method = 'posts/post';
        var data = { title: 'post from test' + new Date(), body: 'this is new post' };
        var type = 'POST';
        var params = ['alexander.beletsky'];

        var call = createCallUrl(this.url, method, params);

        api_test(call, type, data, function (result) {
            ok(result.success, method + " method call failed");

            var url = result.url;
            var method = 'posts/delete';
            var data = null;
            var type = 'DELETE'
            var params = ['alexander.beletsky', url];

            var call = createCallUrl(me.url, method, params);

            api_test(call, type, data, function (result) {
                ok(result.success, method + " method call failed");
            });
        });
    });

    test("fail method test", function () {

        var method = 'posts/fail';
        var data = null;
        var type = 'GET';
        var params = ['alexander.beletsky'];

        var call = createCallUrl(this.url, method, params);

        api_test(call, type, data, function (result) {
            ok(result.success == false, method + " expected to be failed");
            same(result.message, "The method or operation is not implemented.");
        });
    });
});