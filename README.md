# Punch Office Website
You can visit the deploy website [here](https://punch.fly.dev/).

![Log in page](/public/photos/login.png)
![Dashboard](/public/photos/dashboard.png)

If the error message shown wile logging, please wait for about 1 minutes to let the database server load.
![Server Suspend](/public/photos/server_suspend.png)

You can see the punch history in the calendar on the right.
Blue color means that you punch in and out above 8 hours, while the red means below 8 hours.
![Punch Calendar](/public/photos/punch_calendar.png)
## General info
Daily punch in and out
## Project features
* Users can punch in and out
* If holidays, users cannot punch since these days are not suitable for work.
* Users can change their password
* Users can punch in and out
* If holidays, users cannot punch since these days are not suitable for work.
* Users can change their password

## Prerequisites
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en) v18.14.2
* [Prisma](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)

## How to install
### Using Git
```
git clone https://github.com/freeway26tw/punch-office.git
```
### Install npm dependencies and initialize database setting
```
cd punch-office
npm install
npx prisma migrate dev
npm start
```

### Setting up environments
1. You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
`cp .env.example .env`
3. The file `.env` is already ignored, so you never commit your credentials.
4. Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.

## How to run
```
npm run dev
```
You can check if the server is running from the message below
```
Punch app listening on port 3000!
Press CTRL + C to stop the process.
```

## Default account and password
<table>
  <th>
    <td style="font-weight:bold">Account</td>
    <td style="font-weight:bold">Password</td>
  </th>
  <tr>
    <td>user</td>
    <td>a001</td>
    <td>acuser</td>
  </tr>
</table>

## Bugs or improvements
Every project needs improvements, Feel free to report any bugs or improvements. Pull requests are always welcome.