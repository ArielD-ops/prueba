# **Notes Application**

A simple note-taking web app, with features for adding and filtering tags, built as a single-page application (SPA) using React for the frontend and NestJS for the backend, with PostgreSQL for storing data.

## **Features**

### **Phase 1: Basic Note Management**

* Create new notes (title, content).  
* Edit existing notes.  
* Delete notes.  
* Archive and unarchive notes.  
* View separate lists of active and archived notes.

### **Phase 2: Advanced Tagging and Filtering**

* Add or remove tags (categories) to notes.  
* Filter notes by one or more tags.

## **Technologies**

### **Frontend**

* **React**: 18.2.0  
* **Axios**: 1.6.2 (for API calls)  
* **Tailwind CSS**: 3.3.5 (for styling)  
* **Vite**: (as a build and development tool)

### **Backend**

* **NestJS**: 10.2.0 (Node.js Framework)  
* **TypeORM**: 0.3.17 (ORM for the database)  
* **PostgreSQL**: 14 (Database Management System)

### **Development Environment**

* **Node.js**: v22.17.1  
* **npm**: v10.9.2  
* **Operating System**: Compatible with any operating system (Linux, macOS, Windows).

## **Prerequisites**

Before running the application, make sure you have the following installed and running:

* **PostgreSQL**: Version 17 or higher.  
* A database named notes\_app (this will be created or verified by the setup.sh configuration script).

## **Setup and Execution**

Follow these steps to get the application running on your local environment:

1. **Clone the repository:**

```Bash```
```
   git clone \<repository-url\>  
   cd notes-app
``` 
2. **Configure the database and install dependencies:**
   
   This script will handle installing all Node.js dependencies for both the frontend and backend, and will configure the PostgreSQL database.
   
```Bash```
```
    chmod \+x setup.sh
    ./setup.sh  
``` 
Note: The setup.sh script will prompt you for your PostgreSQL user credentials to set up the database.

3. **Start the application:**
   
   This script will start both the backend server and the frontend development server.
   
```Bash```
```
    ./run.sh
```


4. Access the application:  
   Once both servers are running, open your web browser and visit:  
   http://localhost:3000

## **Project Structure**

The project is organized into the following main folders:

* frontend/: Contains the React user interface source code, styled with Tailwind CSS.  
* backend/: Contains the RESTful API code developed with NestJS, TypeORM, and PostgreSQL.  
* setup.sh: Bash/Zsh script for initial project setup (dependency installation and database configuration).  
* run.sh: Bash/Zsh script to start the frontend and backend servers.

## **API Endpoints**

The backend exposes the following RESTful endpoints for interacting with notes and tags:

| HTTP Method | Path | Description |
| :---- | :---- | :---- |
| POST | /api/notes | Creates a new note. |
| GET | /api/notes/active | Lists all active notes. |
| GET | /api/notes/archived | Lists all archived notes. |
| GET | /api/notes/:id | Retrieves a specific note by its ID. |
| PUT | /api/notes/:id | Updates an existing note. |
| DELETE | /api/notes/:id | Deletes a note. |
| PATCH | /api/notes/:id/archive | Archives a specific note. |
| PATCH | /api/notes/:id/unarchive | Unarchives a specific note. |
| POST | /api/tags | Creates a new tag. |
| GET | /api/tags | Lists all available tags. |
| DELETE | /api/tags/:id | Deletes a tag. |
| POST | /api/notes/:noteId/tags | Adds one or more tags to a note. |
| DELETE | /api/notes/:noteId/tags/:tagId | Removes a specific tag from a note. |
| GET | /api/notes/filter?tagIds=id1,id2,... | Lists notes filtered by one or more tag IDs. |
