import jsdoc from "eslint-plugin-jsdoc";

export default [
	{
		plugins: {
			jsdoc,
		},
		rules: {
			"jsdoc/require-jsdoc": [
				"error",
				{
					publicOnly: true,
					require: {
						FunctionDeclaration: true,
						MethodDefinition: true,
						ClassDeclaration: true,
					},
				},
			],
			"jsdoc/require-param": "warn",
			"jsdoc/require-returns": "warn",
		},
	},
];
