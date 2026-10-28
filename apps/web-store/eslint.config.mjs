import baseConfig from "../../eslint.config.mjs";
import reactConfig from "../../tools/eslint/eslint.react.config.mjs";
import nextConfig from "../../tools/eslint/eslint.next.config.mjs";

export default [...baseConfig, ...reactConfig, ...nextConfig, { ignores: [".next/**/*"] }];
