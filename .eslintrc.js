module.exports = {
    env: {
        browser: true,
        es6: true,
        "jest": true,
        "cypress/globals": true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: [
        "react", "jest", "cypress"
    ],
    rules: {
        // indent: [
        //     "warn",
        //     2
        // ],
        // "linebreak-style": [
        //     "error",
        //     "unix"
        // ],
        quotes: [
            "error",
            "single"
        ],
        semi: [
            "error",
            "always"
        ],
        eqeqeq: "error",
        "no-trailing-spaces": "error",
        "arrow-spacing": [
            "error", {"before": true, "after": true}
        ],
        "no-console": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": "off",
        "import/no-anonymous-default-export": "off"
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};