module.exports = {
	'root': true,
	'parser': '@typescript-eslint/parser',
	'env': {
		'es6': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly',
	},
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint',
	],
	'rules': {
		'indent': [
			'warn',
			'tab',
		],
		'linebreak-style': [
			'warn',
			'unix',
		],
		'quotes': [
			'warn',
			'single',
		],
		'semi': [
			'warn',
			'always',
		],
		"comma-dangle": [
			'warn',
			'always-multiline',
		],
		'no-explicit-any': [
			'off',
		],
	}
};