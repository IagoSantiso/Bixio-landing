import next from "eslint-config-next";

/** eslint-config-next 16 ya exporta flat config, así que se extiende directamente. */
const config = [{ ignores: [".next/**", "out/**", "node_modules/**"] }, ...next];

export default config;
