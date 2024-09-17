# WebExample

A simple project to showcase a common development environment for a web app using Docker and Next.js.

## Features

- **Next.js 14**: The latest version of Next.js for building server-side rendered React applications.
- **Shadcn UI**: A modern UI library for building beautiful interfaces.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Flyway**: A database migration tool that allows you to manage and track changes to your database schema.

## Getting Started

To get started with this project, you'll need to have Docker and Docker Compose installed on your machine.

### Running the Project

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/JTGlez/FSExample.git
    ```


2. **Build and Run with Docker Compose**:
   Use the following command to build and run the project in detached mode:

    ```bash
    docker-compose up --build -d
    ```

    This command will start all the necessary services, including the Next.js app, PostgreSQL database, and any other dependencies defined in the `docker-compose.yml` file.
    The project will be available at [http://localhost:3000](http://localhost:3000).

### Development

During development, hot reloading is enabled to provide a smooth experience. Any changes made to the source code will automatically reload the application without needing to restart the Docker containers. 
[Source here](https://dev.to/yuvraajsj18/enabling-hot-reloading-for-nextjs-in-docker-4k39)