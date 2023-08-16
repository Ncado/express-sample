# Webbylab Express App

This is a simple Express application built with TypeScript. This README provides instructions on how to run the
application using Docker.

## Prerequisites

- Docker: Ensure that you have Docker installed on your machine. If not, you can download and install it
  from [Docker's official website](https://www.docker.com/get-started).

## Steps to Run the Application

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/ncado/webbylab-express.git
    cd webbylab-express
    ```

2. **Build the Docker Image:**
   Make sure you are in the root directory of the project, where the `Dockerfile` is located. Run the following command
   to build the Docker image:
    ```bash
    docker build -t webbylab-express-my-app .
    ```


3. **Run the APP through docker-compose:**

    ```bash
    docker compose up
    ```


3. **Run the Docker Container:**
   Run the Docker container using the following command:
    ```bash
    docker run --name movies -p 3000:3000 -e APP_PORT=3000 ncado/webbylab-express-my-app:latest
    ```

5. **Access the Application:**
   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.

## Notes

- The `-p 8000:3000` flag maps port 3000 inside the container to port 8000 on your local machine.
- The `-e APP_PORT=3000` flag sets the environment variable `APP_PORT` to `3000`.

