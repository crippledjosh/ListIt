module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "meteor": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "impliedStrict": true
        },
        "allowImportExportEverywhere": true,
        "sourceType": "module"
    },
    "plugins": [
        "react",
    ],
    "rules": {
        "indent": [
            "error",
            "tab",
			{
				"SwitchCase": 1
			}
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "react/no-find-dom-node": "off"
    }
};
