import * as fs from 'fs';
import { parse } from 'dotenv';
import { EnvConfig } from './interfaces/env-config.interface';

export class ConfigService {
  private readonly envConfig: EnvConfig;  

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('.env file not exists');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.APP_PORT,
      };
    }
  }

  /**
   * return environment key value
   *
   * @param key any
   */
  get(key: string): string {
    return this.envConfig[key];
  }
}
