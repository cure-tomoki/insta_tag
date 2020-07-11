enum Env {
  development,
  production,
}

const targetEnv: Env = (() => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return Env.development;
    case 'production':
      return Env.production;
    default:
      throw new Error(`invalid NODE_ENV: ${process.env.NODE_ENV}`);
  }
})();

export const isDev = targetEnv === Env.development;
export const isProd = targetEnv === Env.production;
