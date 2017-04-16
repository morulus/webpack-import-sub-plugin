const resolve = require('import-sub');

function WebpackImportSubPlugin(options) {
  const config = {};
  if (!options) {
    throw new Error('WebpackImportSub plugin requires at least one import rule.');
  }
  if (typeof options !== 'object') {
    throw new Error('WebpackImportSub plugin options must ba an object or an array.');
  }
  if (options instanceof Array) {
    Object.assign(config, {
      rules: options,
    });
  } else {
    Object.assign(config, options);
  }
  if (!(config.rules instanceof Array)) {
    throw new Error('WebpackImportSub plugin requires option `sub`');
  }
  this.resolve = typeof config.resolve === 'function' ? config.resolve : null,
  this.root = config.root || process.cwd();
  this.rules = config.rules;
}

WebpackImportSubPlugin.prototype = {
  constructor: WebpackImportSubPlugin,
  apply: function (compiler) {
		compiler.plugin("normal-module-factory", (nmf) => {
			nmf.plugin("before-resolve", (result, callback) => {
				if(!result) return callback();
        const base = result.context;
        const request = result.request;
        /**
         * Define holders and calculate two general properties [id] and [folder]
         */
        return resolve(this.rules, {
          base: base,
          request: request,
          root: this.root,
          resolve: this.resolve,
        })
        .then(function(request) {
          return callback(null, Object.assign({},
            result,
            {
              request: request instanceof Array ? request[0] : request,
            }
          ));
        })
        .catch(console.log);
			});
		});
	}
}

module.exports = WebpackImportSubPlugin;
