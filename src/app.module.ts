import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { datasource } from './datasource';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { RecordsModule } from './records/records.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // return {
        //   type: 'mysql',
        //   host: configService.get('DB_HOST'),
        //   port: configService.get('DB_PORT')
        //     ? parseInt(configService.get('DB_PORT'))
        //     : 3306,
        //   username: configService.get('DB_USERNAME'),
        //   password: configService.get('DB_PASSWORD'),
        //   database: configService.get('DB_DATABASE'),
        //   entities: ['dist/**/entities/*.entity.{ts,js}'],
        //   migrations: ['dist/migrations/*.{ts,js}'],
        //   autoLoadEntities: true,
        //   synchronize: false,
        // };

        return { ...datasource.options } as TypeOrmModuleOptions;
      },
    }),
    UsersModule,
    AccountsModule,
    CategoriesModule,
    RecordsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
