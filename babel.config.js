const { workspaces = [] } = require('./package.json');

module.exports = {
    babelrcRoots: ['.', ...(workspaces.packages || workspaces)],
    presets: [
        '@babel/preset-flow',
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
    ],
    env: {
        test: {
            plugins: ['require-context-hook'],
        },
    },
};
