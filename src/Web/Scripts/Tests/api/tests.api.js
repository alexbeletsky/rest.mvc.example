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
            this.url = 'api/v1/';
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
            ok(tasks.length == 3, "posts has not been returned");
        });
    });

    test("create new post", function () {
        var me = this;

        var method = 'posts/create';
        var data = { title: 'post from test', body: 'this is new post', createdBy: 'alexander.beletsky', url: 'new-post' };
        var type = 'POST';
        var params = ['alexander.beletsky'];

        var call = createCallUrl(this.url, method, params);

        api_test(call, type, data, function (result) {
            ok(result.success, method + " method call failed");

            var method = 'posts/';
            var data = null;
            var type = 'GET'
            var params = ['alexander.beletsky', 'new-post'];

            var call = createCallUrl(me.url, method, params);

            api_test(call, type, data, function (result) {
                ok(result.success, method + " method call failed");
                same(result.data.url, 'new-post');
            });
        });
    });

    test("delete post test", function () {
        var me = this;

        var method = 'posts/delete';
        var data = null;
        var type = 'DELETE';
        var params = ['alexander.beletsky', 'new-post'];

        var call = createCallUrl(this.url, method, params);

        api_test(call, type, data, function (result) {
            ok(result.success, method + " method call failed");

            var method = 'posts/';
            var data = null;
            var type = 'GET'
            var params = ['alexander.beletsky', 'new-post'];

            var call = createCallUrl(me.url, method, params);

            api_test(call, type, data, function (result) {
                ok(result.success, method + " method call failed");
                same(result.data, null);
            });
        });
    });
});