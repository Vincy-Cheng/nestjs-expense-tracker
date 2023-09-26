# Expense Tracker (NestJS & ReactJS)

This is expense tracker web application. It is built with NestJS (backend), ReactJS (frontend) and MySQL (database).

**Most of the styling and design are referred to [Monny app](https://greamer.com/)**

## Features

1. Manage expense and income and the same time
2. User can create multiple wallets
3. View the expense/income distribution by pie chart, bar chart and line chart.

## Deploy

### Pre-requisite

Please ensure you have installed the following framework or software

1. [NodeJS](https://nodejs.org/en/download/current)
2. [Docker](https://www.docker.com/)
3. [NestJS](https://docs.nestjs.com/first-steps) framework

### Steps

1. Pull [MySQL image](https://hub.docker.com/_/mysql)
2. Start the container and create database (You may need to create a user in the MySQL container)
3. Create a .env file as .env.example and fill them all  
4. Build the client folder (frontend)

    ```npm run build:client```
5. Start the application

    ```npm run start```

## Environment variables

| Name                           | Description                                          |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| DB_HOST                        | MySQL host. Ignored if `DB_SOCKETPATH` is provided.          |
| DB_PORT                        | MySQL port, default `3306`. Ignored if `DB_SOCKETPATH` is provided. |
| DB_DATABASE                    | MySQL database name.                                         |
| DB_USERNAME                    | MySQL username.                                              |
| DB_PASSWORD                    | MySQL password. For production, the password should be stored in `GAE_DB_PASSWORD` secret in the same GCP project. |
| JWT_SECRET                    | Secret for creating and verifying the JWT                                             |
| JWT_EXPIRATION_TIME                    | Expiration time for the JWT |

## Screebshots
![image](https://github.com/Vincy-Cheng/nestjs-expense-tracker/assets/60846680/518286b2-33c6-4834-983d-c005a26f950e)

![image](https://github.com/Vincy-Cheng/nestjs-expense-tracker/assets/60846680/774a15d1-efdf-4c57-9db2-9d12d3c1b7de)

![image](https://github.com/Vincy-Cheng/nestjs-expense-tracker/assets/60846680/f5293f3e-9139-4369-b333-86da48443196)

![image](https://github.com/Vincy-Cheng/nestjs-expense-tracker/assets/60846680/666b21da-dea1-415c-b661-8a52b0a34f1b)

![image](https://github.com/Vincy-Cheng/nestjs-expense-tracker/assets/60846680/067bf0c4-08d5-40e0-bdc5-b33779c1ba62)

![image](https://github.com/Vincy-Cheng/nestjs-expense-tracker/assets/60846680/bb2ff007-ec25-45e2-a7e6-7a93cf52b50b)

![image](https://github.com/Vincy-Cheng/nestjs-expense-tracker/assets/60846680/2c2aa917-996b-4f87-bedb-7b737c3a2a1f)

![image](https://github.com/Vincy-Cheng/nestjs-expense-tracker/assets/60846680/38cda686-3d32-4aa2-998f-addc66126ffa)

![image](https://github.com/Vincy-Cheng/nestjs-expense-tracker/assets/60846680/40a8ccc3-afd9-40ac-bce1-72cf9ef55ec8)

