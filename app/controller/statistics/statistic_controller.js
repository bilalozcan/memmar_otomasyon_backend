var express = require('express');
var router = express.Router();
const Statistic = require('./statistic_model');

const statisticOnePath = '/statistic/one';

router.get(statisticOnePath, (request, response) => {
    console.log(request.query);
    Statistic.statistic1(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

module.exports = {
    router,
};