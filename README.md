# Backend Assignment – Financial Records API

## Overview
This project is a backend API built using Node.js and Express to manage financial records. It supports creating, updating, retrieving, and deleting records along with basic filtering and summary features.

The goal of this project is to demonstrate backend design, API structure, and logical implementation in a simple and clear manner.
## Tech Stack
Node.js
Express.js

## System Design
The application follows a simple monolithic structure:

Client → API Routes → Controller Logic → Data Storage
- Routes handle incoming requests
- Logic is implemented inside API handlers
- Data is stored in memory (array)

## Storage Approach
This project uses **in-memory storage (JavaScript array)** to store records.

### Why?
- Keeps implementation simple
- Focus on backend logic and API design
- No external database setup required

### Trade-off:
- Data is not persistent (resets when server restarts)
- Not suitable for production scale

## Features Implemented

### Financial Records CRUD
- Create record
- Get all records
- Get single record
- Update record
- Delete record

### Filtering
- Filter by `type` (income / expense)
- Filter by `category`

### Pagination
- Supports `page` and `limit`

### Dashboard Summary
- Total Income
- Total Expense
- Balance calculation

### Validation & Error Handling
- Required fields validation
- Proper status codes (400, 404)

---

##  API Endpoints

### Create Record
POST /records

### Get All Records
GET /records

### Get Single Record
GET /records/:id

### Update Record
PUT /records/:id

### Delete Record
DELETE /records/:id

### Summary
GET /summary

## 🧪 Sample Request

```json
POST /records
{
  "title": "Salary",
  "amount": 200,
  "category": "job",
  "type": "income"
}
