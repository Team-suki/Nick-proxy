const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const rewardsServiceRoute =
  'http://ec2-18-225-33-61.us-east-2.compute.amazonaws.com:3001';

const campaignServiceRoute =
  'http://ec2-54-219-19-207.us-west-1.compute.amazonaws.com/';

const updateServiceRoute =
  'https://ec2-3-15-166-80.us-east-2.compute.amazonaws.com:3001';

const videoServiceRoute =
  'http://sdc-lb-679578692.us-west-1.elb.amazonaws.com/';

const proxyRouter = {
  '/api/banner': 'http://localhost:3002',
  'api/video': videoServiceRoute,
  'api/update': updateServiceRoute,
  'api/comment': updateServiceRoute,
  'api/story': campaignServiceRoute,
  'api/RisksAndChallenges': campaignServiceRoute,
  'api/EnvironmentalCommitments': campaignServiceRoute,
  'api/projects': rewardsServiceRoute,
  'api/rewards': rewardsServiceRoute,
};

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.use(
  createProxyMiddleware({
    target: '/:id',
    router: proxyRouter,
    changeOrigin: true,
    prependPath: false,
  })
);

app.listen(4000, () => {
  console.log('Proxy Server is listening on port 4000');
});
