module.exports = {
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
        // comment this line to test worker:webpack migrations
        'require-context-hook',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
    ],
};