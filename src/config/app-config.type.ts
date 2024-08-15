export type AppConfig = {
  nodeEnv: string;
  port: number;
  corsOrigin: boolean | string | RegExp | (string | RegExp)[];
};
