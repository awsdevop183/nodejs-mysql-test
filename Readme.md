# 🚀 Node.js Application to Check Database Connection

This project demonstrates how to set up a Node.js app in Docker to connect with a MySQL database.

1. Install docker on Ubuntu
```sudo apt update -y && sudo curl https://get.docker.com | bash```
2. Make directory structure as per the project, create required files and paste the content

3. Update app.js file with appropriate DB credentials

4. Connect to your DB and Create Database and Table as per mysql.db file

5. Create Docker image with `docker build -t testdb .`

6. Create a container from the image `docker run -d --name db -p 90:3000 testdb`




# Node Application to check ASG

1. Create an EC2(Ubuntu) for Mysql
2. Install Docker using `curl https://get.docker.com | bash`
3. Then run `docker run -d --name mysql-server -e MYSQL_ROOT_PASSWORD=Admin123 -p 3306:3306 mysql:8.0`
4. `Docker ps` (to get container_id)
5. `Docker exec -it container_id bash`
6. `mysql -u root -p (then enter admin password from above command)`

7.   ```CREATE USER 'admin'@'%' IDENTIFIED BY 'Admin123';
      GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
      FLUSH PRIVILEGES;
      CREATE DATABASE movieDB;```

8. `USE movieDB;`
```
CREATE TABLE movies (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
genre VARCHAR(50),
release_year INT);

INSERT INTO movies (title, genre, release_year) VALUES
('Inception', 'Sci-Fi', 2010),
('The Matrix', 'Sci-Fi', 1999),
('Interstellar', 'Sci-Fi', 2014),
('The Godfather', 'Crime', 1972),
('Pulp Fiction', 'Crime', 1994);
```

9.Create another Instance:



git clone https://github.com/awsdevop183/aws-rds-test.git

cd aws-rds-test

Update app.js with Mysql Instance Private IP

docker build -t movies .

docker run -d --name movies -p 80:3000 movies

docker update --restart=always movies
