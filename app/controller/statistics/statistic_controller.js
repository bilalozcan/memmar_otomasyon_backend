var express = require('express');
var router = express.Router();
const Statistic = require('./statistic_model');

const statisticOnePath = '/statistic/one';
const statisticSecondPath = '/statistic/second';
const statisticThirdPath = '/statistic/third';

router.get(statisticOnePath, (request, response) => {
    console.log(request.query);
    Statistic.statistic1(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

router.get(statisticSecondPath, (request, response) => {
    console.log(request.query);
    Statistic.statistic2(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

router.get(statisticThirdPath, (request, response) => {
    console.log(request.query);
    Statistic.statistic3(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

module.exports = {
    router,
};