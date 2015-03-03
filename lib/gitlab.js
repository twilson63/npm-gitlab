var request = require('request');

var uri = process.env.GITLAB_URL || 'https://gitlab.com/api/v3';

module.exports.tags = function tags(user, repo, opt, cb) {
// TODO: Change this to gitlab url
// http://gitlab.eirenerx.com/projects?private_token=<auth>
// get project id
// then get tags /projects/:id/repository/tags

    var options = {
        url: uri + '/repos/' + user + '/' + repo + '/tags',
        json: true,
        headers: {
            'User-Agent': 'npm-gitlab-proxy',
            'Accepts': 'application/json'
        }
    };

    if (opt.token) {
        options.headers['Authorization'] = 'token ' + opt.token
    }

    request(options, function(err, res, body) {
        if (err) {
            return cb(err);
        }

        if (res.statusCode !== 200) {
            return cb(new Error('unable to get tags for repo ' + user + '/' + repo));
        }

        cb(null, body);
    });
};
