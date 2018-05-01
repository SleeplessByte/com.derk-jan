import path from 'path';

export default (config, env) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias.assets = path.resolve(__dirname, './src/assets');
    config.resolve.alias.components = path.resolve(__dirname, './src/components');
    config.resolve.alias.routes = path.resolve(__dirname, './src/routes');
};
