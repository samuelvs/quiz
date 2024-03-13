# Quiz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

contact: sva2@aluno.ifal.edu.br

## Installation of Node.js and npm

**Node.js:**
   - Download and install Node.js from the official website: [Node.js](https://nodejs.org/).
   - Verify the installation by opening a terminal and typing:
     ```bash
     node -v
     npm -v
     ```

## Installation of Angular CLI

**Angular CLI:**
   - Install the Angular CLI globally by running the following command in the terminal:
     ```bash
     npm install -g @angular/cli
     ```
   - Verify the installation by typing:
     ```bash
     ng --version
     ```

## Running the Project 

**Install Dependencies:**
   - Install project dependencies (frontend & backend) with the following command:
     ```bash
     npm install
     ```

## Development front

First `cd frontend`.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

The project use a Firebase Authentication and Firebase Database. You can find all variables need in your firebase project -> settings -> general,your firebase project -> settings -> accounts service -> Generate new primary key. Those two places contains all Firebase values necessary to .env.

Run `npm run prebuild; npm run build; npm run copy-assets` to build the project (Front-end and Back-end). The build artifacts will be stored in the `dist/` directory.

## Init server

Run `npm run start` to start server node.
