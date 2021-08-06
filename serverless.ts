import type { AWS } from '@serverless/typescript';

import corsProxy from '@functions/corsProxy';

const serverlessConfiguration: AWS = {
    service: 'corsapi',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    plugins: ['serverless-webpack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
            binaryMediaTypes: ['*/*'],
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
        lambdaHashingVersion: '20201221',
    },
    // import the function via paths
    functions: { corsProxy },
};

module.exports = serverlessConfiguration;
