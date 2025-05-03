# NestJS GraphQL Backend Service

This is a NestJS backend service with GraphQL API that provides department management and authentication functionality.

## Features

- GraphQL API with Apollo Server
- PostgreSQL database with TypeORM
- Authentication with JWT
- Department and Sub-department management
- User management

## Live Demo

- API Service: [https://tactology-jmxs.onrender.com/](https://tactology-jmxs.onrender.com/)
- GraphQL Playground: [https://tactology-jmxs.onrender.com/graphql](https://tactology-jmxs.onrender.com/graphql)

## Prerequisites

- Node.js (v20 or higher)
- PostgreSQL database
- npm or yarn package manager

## Setup

- Clone the repository:

```bash
git clone https://github.com/Johndiddles/tactology
cd tactology
```

- Install dependencies:

```bash
yarn install
```

- Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
SYNCHRONIZE_DB=true                     # only do this if running locally
JWT_SECRET=your_jwt_secret
```

- Start the development server:

```bash
npm run start:dev
```

The GraphQL playground will be available at `http://localhost:3000/graphql`

## Available Queries and Mutations

### Authentication

#### Login

```graphql
mutation Login($input: LoginInput!) {
  login(loginInput: $input) {
    status
    message
    user {
      id
      username
    }
    accessToken
  }
}
```

Example payload:

```json
{
  "input": {
    "username": "gbenga",
    "password": "password1234"
  }
}
```

Example response:

```json
{
  "data": {
    "login": {
      "user": {
        "id": "0c890b19-facc-47dd-8f01-b70fe8f93710",
        "username": "gbenga"
      },
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYzg5MGIxOS1mYWNjLTQ3ZGQtOGYwMS1iNzBmZThmOTM3MTAiLCJ1c2VybmFtZSI6ImdiZW5nYSIsImlhdCI6MTc0NjIzMjE4NSwiZXhwIjoxNzQ2MjM1Nzg1fQ.Ml0BEZyYkoKbMnNWbyPg28Y1xyaM0ho_yc0VALm-AkQ"
    }
  }
}
```

#### Create User

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    id
    username
  }
}
```

Example payload:

```json
{
  "input": {
    "username": "gbenga",
    "password": "password1234"
  }
}
```

### Department Management

> **Note**: All department management endpoints require authentication. Include the JWT token in the Authorization header as a Bearer token:
>
> ```
> Authorization: 'Bearer <your_jwt_token>'
> ```
>
> You can obtain the token by using the login mutation.

#### Get All Departments

```graphql
query GetDepartments {
  departments {
    id
    name
    subDepartments {
      id
      name
    }
    createdAt
    updatedAt
  }
}
```

#### Get Department by ID

```graphql
query GetDepartment($input: ID!) {
  department(id: $input) {
    id
    name
    createdAt
    subDepartments {
      id
      name
    }
  }
}
```

Example payload:

```json
{
  "input": "0c890b19-facc-47dd-8f01-b70fe8f93710"
}
```

#### Create Department

```graphql
mutation CreateDepartment($input: CreateDepartmentInput!) {
  createDepartment(createDepartmentInput: $input) {
    id
    name
    subDepartments {
      id
      name
    }
    createdAt
    updatedAt
  }
}
```

Example payload:

```json
{
  "input": {
    "name": "Engineering",
    "subDepartments": [
      {
        "name": "Frontend"
      },
      {
        "name": "Backend"
      }
    ]
  }
}
```

#### Update Department

```graphql
mutation UpdateDepartment($input: UpdateDepartmentInput!) {
  updateDepartment(updateDepartmentInput: $input) {
    id
    name
    subDepartments {
      id
      name
    }
    updatedAt
  }
}
```

Example payload:

```json
{
  "input": {
    "id": "0c890b19-facc-47dd-8f01-b70fe8f93710",
    "name": "Engineering Department",
    "subDepartments": [
      {
        "id": "0c890b19-facc-47dd-8f01-b70fe8f93710",
        "name": "Frontend Development"
      }
    ]
  }
}
```

#### Remove Department

```graphql
mutation RemoveDepartment($input: ID!) {
  removeDepartment(id: $input) {
    status
    message
    id
  }
}
```

Example payload:

```json
{
  "input": "0c890b19-facc-47dd-8f01-b70fe8f93710"
}
```

### Sub-Department Management

#### Get All Sub-Departments

```graphql
query GetSubDepartments {
  subDepartments {
    id
    name
    createdAt
    updatedAt
  }
}
```

#### Get Sub-Department by ID

```graphql
query GetSubDepartment($input: ID!) {
  subDepartment(id: $input) {
    id
    name
    createdAt
    updatedAt
  }
}
```

Example payload:

```json
{
  "input": "0c890b19-facc-47dd-8f01-b70fe8f93710"
}
```

#### Update Sub-Department

```graphql
mutation UpdateSubDepartment($input: UpdateSubDepartmentInput!) {
  updateSubDepartment(updateSubDepartmentInput: $input) {
    id
    name
    updatedAt
  }
}
```

Example payload:

```json
{
  "input": {
    "id": "0c890b19-facc-47dd-8f01-b70fe8f93710",
    "name": "Frontend Engineering"
  }
}
```

#### Remove Sub-Department

```graphql
mutation DeleteSubDepartment($input: ID!) {
  removeSubDepartment(id: $input) {
    status
    message
    id
  }
}
```

Example payload:

```json
{
  "input": "0c890b19-facc-47dd-8f01-b70fe8f93710"
}
```

## Development

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application

## Security

- JWT authentication is required for protected routes
- Passwords are hashed using bcrypt
- Environment variables are used for sensitive configuration
