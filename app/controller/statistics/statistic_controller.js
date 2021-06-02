var express = require('express');
var router = express.Router();
const Statistic = require('./statistic_model');

const statisticOnePath = '/statistic/one';
const statisticTwoPath = '/statistic/two';
const statisticThreePath = '/statistic/three';
const statisticFourPath = '/statistic/four';
const statisticFivePath = '/statistic/five';
const statisticSixPath = '/statistic/six';

router.get(statisticOnePath, (request, response) => {
    console.log(request.query);
    Statistic.statistic1(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

router.get(statisticTwoPath, (request, response) => {
    console.log(request.query);
    Statistic.statistic2(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

router.get(statisticThreePath, (request, response) => {
    console.log(request.query);
    Statistic.statistic3(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});
router.get(statisticFourPath, (request, response) => {
    console.log(request.query);
    Statistic.statistic4(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});
router.get(statisticFivePath, (request, response) => {
    console.log(request.query);
    Statistic.statistic5(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});
router.get(statisticSixPath, (request, response) => {
    console.log(request.query);
    Statistic.statistic6(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

module.exports = {
    router,
};