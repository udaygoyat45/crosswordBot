module.exports = {
	'env': {
		'es6': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [
			'warning',
			'tab'
		],
		'linebreak-style': [
			'warning',
			'unix'
		],
		'quotes': [
			'warning',
			'single'
		],
		'semi': [
			'warning',
			'always'
		],
		"comma-dangle": [
			'warning',
			'always-multiline'
		]
	}
};