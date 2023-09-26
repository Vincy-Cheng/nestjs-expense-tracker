# Expense Tracker (NestJS & ReactJS)

This is expense tracker web application. It is built with NestJS (backend), ReactJS (frontend) and MySQL (database).

**Most of the styling and design are refered to [Monny app](https://greamer.com/)**

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
