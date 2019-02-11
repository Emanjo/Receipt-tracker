const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
		proxy: {
			'api': {
				target: 'http://localhost:5000'
			}
		}
	},
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/imports.scss')
      ]
    }
  }
}
