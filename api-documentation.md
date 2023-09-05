# Signature API Documentation

Welcome to the API documentation for the "Signature" digital task roster application. This documentation provides information on how to interact with the APIs that power "Signature."

## Table of Contents

- [Authentication](#authentication)
- [Tasks](#tasks)
  - [Get All Tasks](#get-all-tasks)
  - [Create a Task](#create-a-task)
  - [Get Task by ID](#get-task-by-id)
  - [Update Task](#update-task)
  - [Delete Task](#delete-task)
- [Users](#users)
  - [Get User Profile](#get-user-profile)

## Authentication

Authentication is required for most API endpoints in "Signature." You need to obtain an access token to authenticate your requests.

To authenticate, include the `Authorization` header in your HTTP requests with a bearer token:

```

Authorization: Bearer your_access_token_here

```

## Tasks

### Get All Tasks

**Endpoint:** `GET /api/tasks`

**Description:** Get a list of all tasks associated with the authenticated user.

**Response:**

- Status: 200 OK
- Body: A JSON array of task objects

Example Response:

```
[
  {
    "id": "task1",
    "title": "Complete Project Proposal",
    "description": "Prepare and submit the project proposal by the deadline.",
    "deadline": "2023-09-15T12:00:00Z",
    "priority": "High",
    "assignedTo": "user123",
    "completed": false
  },
]
```

### Create a Task

**Endpoint:** `POST /api/tasks`

**Description:** Create a new task.

**Request Body:**

- `title` (string, required): The title of the task.
- `description` (string): A description of the task.
- `deadline` (string, ISO 8601 format, required): The deadline for the task.
- `priority` (string, "Low", "Medium", "High", required): The priority level of the task.
- `assignedTo` (string, required): The ID of the user to whom the task is assigned.

**Response:**

- Status: 201 Created
- Body: A JSON object of the created task

Example Request Body:

```json
{
  "title": "Review Project Documentation",
  "description": "Thoroughly review the project documentation and provide feedback.",
  "deadline": "2023-09-20T16:00:00Z",
  "priority": "Medium",
  "assignedTo": "user456"
}
```

### Get Task by ID

**Endpoint:** `GET /api/tasks/:taskId`

**Description:** Get the details of a specific task by its ID.

**Request Parameters:**

- `taskId` (string, required): The ID of the task to retrieve.

**Response:**

- Status: 200 OK
- Body: A JSON object of the task

Example Response:

```json
{
  "id": "task1",
  "title": "Complete Project Proposal",
  "description": "Prepare and submit the project proposal by the deadline.",
  "deadline": "2023-09-15T12:00:00Z",
  "priority": "High",
  "assignedTo": "user123",
  "completed": false
}
```

### Update Task

**Endpoint:** `PUT /api/tasks/:taskId`

**Description:** Update the details of a specific task.

**Request Parameters:**

- `taskId` (string, required): The ID of the task to update.

**Request Body:**

- Include the fields to update in the task object.

**Response:**

- Status: 200 OK
- Body: A JSON object of the updated task

Example Request Body:

```json
{
  "title": "Complete Project Proposal (Updated)",
  "description": "Prepare and submit the project proposal by the deadline.",
  "completed": true
}
```

### Delete Task

**Endpoint:** `DELETE /api/tasks/:taskId`

**Description:** Delete a specific task by its ID.

**Request Parameters:**

- `taskId` (string, required): The ID of the task to delete.

**Response:**

- Status: 204 No Content

## Users

### Get User Profile

**Endpoint:** `GET /api/users/profile`

**Description:** Get the profile information of the authenticated user.

**Response:**

- Status: 200 OK
- Body: A JSON object of the user's profile

Example Response:

```json
{
  "id": "user123",
  "name": "John Doe",
  "email": "john@example.com"
}
```
