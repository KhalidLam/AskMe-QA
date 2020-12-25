# AskMe-QA

An Stackoverflow Clone using Laravel (server) & ReactJs (client) 

## Installation 

#### Clone the repository:

```bash
git clone https://github.com/KhalidLam/AskMe-QA.git
```

## Set Up Server (Laravel)

#### Change directory to muora-server:

```bash
cd muora-server
```

#### Install PHP dependencies:

```bash
composer install
```

_If you don't have Composer installed, [instructions here](https://getcomposer.org/)._

#### Install Javascript dependencies:

```bash
npm install
```

_If you don't have Node and NPM installed, [instructions here](https://www.npmjs.com/get-npm)._


#### Create your environment file:

```bash
cp .env.example .env
```

#### Update these settings in the .env file:

-   DB_DATABASE (your local database, i.e. "askme")
-   DB_USERNAME (your local db username, i.e. "root")
-   DB_PASSWORD (your local db password, i.e. "")

#### Generate an app key:

```bash
php artisan key:generate
```

#### Run the database migrations:

```bash
php artisan migrate
```

#### Database Seeding

If you need sample data to work with, you can seed the database:

```
php artisan db:seed
```

#### Create storage shortcut

```bash
php artisan storage:link
```

#### Run the server:

```bash
php artisan serve
```

## Set Up Client (React)

#### Change directory to react-qa-project:

```bash
cd react-qa-project
```
#### Install Javascript dependencies:

```bash
npm install
```

#### Run React app:

```bash
npm start
```
