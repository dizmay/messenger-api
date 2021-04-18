import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot(); // Load .env files

class TypeormConfig {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string): string {
    const value = this.env[key];
    if (!value) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public getAllValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: Number(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }
}

const typeormConfig = new TypeormConfig(process.env).getAllValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { typeormConfig };
