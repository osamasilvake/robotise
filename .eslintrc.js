module.exports = {
	root: true, // Make sure eslint picks up the config at the root of the directory
	parser: '@typescript-eslint/parser',
	plugins: ['simple-import-sort'],
	parserOptions: {
		ecmaVersion: 2020, // Use the latest ecmascript standard
		sourceType: 'module', // Allows using import/export statements
		ecmaFeatures: {
			jsx: true // Enable JSX since we're using React
		}
	},
	settings: {
		react: {
			version: '999.999.999' // Automatically detect the react version
		}
	},
	env: {
		browser: true, // Enables browser globals like window and document
		amd: true, // Enables require() and define() as global variables as per the amd spec.
		node: true // Enables Node.js global variables and Node.js scoping.
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:react-hooks/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
	],
	rules: {
		'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
		'react/prop-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error'
	}
};
