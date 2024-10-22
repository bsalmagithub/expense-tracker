
# Expense Tracker

A simple and intuitive personal expense tracker built using Node.js, Express.js, and SQLite. This application allows users to track their income and expenses, categorize them, and view a summary of their financial balance.

## Features

- Add new transactions (income/expense)
- View all transactions
- Edit existing transactions
- Delete transactions

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Structure](#database-structure)
- [Technologies Used](#technologies-used)
- [Testing API](#testing-api)
- [License](#license)

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/bsalmagithub/expense-tracker.git
    ```

2. **Navigate into the project directory**:
    ```bash
    cd expense-tracker
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up SQLite database**:
    The project uses SQLite as the database. Ensure you have SQLite installed or use an SQLite-compatible database browser if required.

5. **Run the application**:
    ```bash
    npm start
    ```

    Your server should now be running on `http://localhost:3001`.

## Usage

To test the API, you can use tools like [Postman](https://www.postman.com/) or `cURL` for making HTTP requests.

### Example for creating a transaction (POST request):

```bash
curl -X POST http://localhost:3001/transactions -H "Content-Type: application/json" -d '{
  "type": "expense",
  "category": "Food",
  "amount": 50.5,
  "date": "2024-10-23",
  "description": "Lunch"
}'
```

### Access all transactions (GET request):

```bash
curl http://localhost:3001/transactions
```

## API Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/transactions`               | Add a new transaction                |
| GET    | `/transactions`               | Retrieve all transactions            |
| GET    | `/transactions/:id`           | Retrieve a specific transaction by ID|
| PUT    | `/transactions/:id`           | Update a transaction by ID           |
| DELETE | `/transactions/:id`           | Delete a transaction by ID           |


### Sample JSON for POST and PUT

```json
{
  "type": "income",
  "category": "Salary",
  "amount": 1000,
  "date": "2024-10-01",
  "description": "October salary"
}
```

## Database Structure

This project uses an SQLite database to store transaction data. The table structure for `transactions` is as follows:

| Column      | Type        | Description                    |
|-------------|-------------|--------------------------------|
| `id`        | INTEGER     | Primary key (auto-increment)    |
| `type`      | TEXT        | "income" or "expense"           |
| `category`  | TEXT        | Category of the transaction     |
| `amount`    | REAL        | Transaction amount              |
| `date`      | TEXT        | Date of the transaction (YYYY-MM-DD) |
| `description` | TEXT      | Description of the transaction |

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend
- **Express.js**: Web framework for Node.js
- **SQLite**: Lightweight relational database for storing transaction data
- **Nodemon**: Tool to restart the server automatically when file changes are detected

## Testing API

**POST Call (/transactions) Add a new transaction**

![image](https://github.com/user-attachments/assets/9ce629a1-a2cc-4da8-b70f-a7aa5236be3c)


**GET Call (/transactions) Retrieve all transactions**

![image](https://github.com/user-attachments/assets/eb339b07-b48d-4204-b0c1-aa3f51fad557)


**GET Call (/transactions/:id) Retrieve a specific transaction by ID**

![image](https://github.com/user-attachments/assets/0a113add-2e9b-4611-9413-e716ab617567)


**PUT Call (/transactions/:id) Update a transaction by ID**

![image](https://github.com/user-attachments/assets/367db82d-2294-4fdc-b5bb-bd34fd7a3e02)


**DELETE Call (/transactions/:id) Delete a transaction by ID**

![image](https://github.com/user-attachments/assets/7b4f32d2-eb57-4e51-9ec7-2b9284aec8d4)


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
