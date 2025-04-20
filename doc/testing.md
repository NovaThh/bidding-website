# Testing

## Traceability matrix

### Functional

The table below shows an overview of which test covers which functional requirements

|                         Test                         | F1 | F2  | F3  | F4  | F5  | F6  | F7 | F8  | F9  | F10  |  
|:----------------------------------------------------:|:--:|:---:|:---:|:---:|:---:|:---:|:--:|:---:|:---:|:----:|  
|         T1. Get bids for gemstone successful         |    |  X  |     |     |     |     |    |     |     |      |  
|             T2. Bid placed successfully              |    |  X  |     |  X  |  X  |  X  |    |     |  X  |      |  
|                T3. Invalid bid amount                |    |     |     |  X  |  X  |  X  |    |     |  X  |      |  
|    T4. Attempt to place a bid after auction ended    |    |  X  |     |  X  |  X  |  X  |    |     |  X  |      |  
|  T5. Attempt to place a bid lower than current bid   |    |  X  |     |  X  |  X  |  X  |    |     |  X  |      |  
|          T6. Request executed successfully           | X  |     |     |     |     |     |    |     |     |      |  
|        T7. Gemstone search by name successful        | X  |     |  X  |     |     |     |    |     |     |      |  
|      T8. No gemstones found for invalid search       |    |     |  X  |     |     |     |    |     |     |      |  
|        T9. Retrieve gemstone by ID successful        | X  |  X  |     |     |     |     |    |     |     |      |  
|        T10. Gemstone not found for invalid ID        |    |     |     |     |     |     |    |     |     |      |  
|          T11. Gemstone creation successful           | X  |  X  |     |     |  X  |  X  |    |     |     |  X   |  
| T12. Gemstone creation failed due to missing fields  |    |     |     |     |  X  |  X  |    |     |     |  X   |  
|         T13. Unauthorized gemstone creation          |    |     |     |     |  X  |  X  |    |     |     |  X   |  
|           T14. Gemstone update successful            |    |     |     |     |  X  |  X  |    |     |     |  X   |  
|      T15. Gemstone update failed for invalid ID      |    |     |     |     |  X  |  X  |    |     |     |  X   |  
|          T16. Gemstone deletion successful           |    |     |     |     |     |     |    |     |     |  X   |  
|         T17. Unauthorized gemstone deletion          |    |     |     |     |     |     |    |     |     |  X   |  
|     T18. Gemstone deletion failed for invalid ID     |    |     |     |     |     |     |    |     |     |  X   |  
|    T19. Login successful, token received (Admin)     |    |     |     |     |     |     |    |     |     |      |  
|  T20. Login successful, token received (Non-Admin)   |    |     |     |     |     |     |    |     |  X  |      |  
|          T21. User registration successful           |    |     |     |     |  X  |  X  |    |     |     |      |  
| T22. User registration failed due to missing fields  |    |     |     |     |  X  |  X  |    |     |     |      |  
| T23. User registration failed due to duplicate email |    |     |     |     |  X  |  X  |    |     |     |      |  
|            T24. Get user by ID successful            |    |     |     |     |     |     |    |     |     |      |  
|      T25. Get user by ID failed for invalid ID       |    |     |     |     |     |     |    |     |     |      |  
|            T26. Get all users successful             |    |     |     |     |     |     |    |     |     |      |  
|   T27. Auctions filtered by attributes successful    |    |     |     |     |     |     | X  |     |     |      |  


### Non funtional

The table below shows an overview of which test covers which non-functional requirements

| Test                                                       | NF1 | NF2 | NF3 | NF4 | NF5 | NF6 | NF7 | NF8 | NF9 | NF10 | NF11 | NF12 | NF13 | NF14 | NF15 | NF16 | NF17 | NF18 | NF19 | 
|:-----------------------------------------------------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
| T1. Get bids for gemstone successful                       |  X  |  X  |  X  |  X  |     |     |     |     |     |  X   |      |      |      |      |      |      |      |      |      |
| T2. Bid placed successfully                                |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |      |  X   |  X   |  X   |
| T3. Invalid bid amount                                     |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |      |      |      |      |
| T4. Attempt to place bid after auction ended               |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |      |      |      |      |
| T5. Attempt to place bid lower than current highest bid    |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |      |      |      |      |
| T6. Get all gemstones successful                           |  X  |  X  |  X  |  X  |     |     |     |     |     |  X   |      |      |      |      |      |      |      |      |      |
| T7. Gemstone search by name successful                     |  X  |  X  |  X  |  X  |  X  |     |     |     |     |  X   |      |      |      |      |      |      |      |      |      |
| T8. No gemstones found for invalid search                  |  X  |  X  |  X  |  X  |  X  |     |     |     |     |  X   |      |      |      |      |      |      |      |      |      |
| T9. Retrieve gemstone by ID successful                     |  X  |  X  |  X  |  X  |     |     |     |     |     |  X   |      |      |      |      |      |      |      |      |      |
| T10. Gemstone not found for invalid ID                     |  X  |  X  |  X  |  X  |     |     |     |     |     |  X   |      |      |      |      |      |      |      |      |      |
| T11. Gemstone creation successful                          |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |  X   |      |      |      |
| T12. Gemstone creation failed due to missing fields        |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |  X   |      |      |      |
| T13. Unauthorized gemstone creation                        |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |  X   |      |      |  X   |
| T14. Gemstone update successful                            |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |  X   |      |      |      |
| T15. Gemstone update failed for invalid ID                 |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |  X   |      |      |      |
| T16. Gemstone deletion successful                          |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |  X   |      |      |      |
| T17. Unauthorized gemstone deletion                        |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |  X   |      |      |  X   |
| T18. Gemstone deletion failed for invalid ID               |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |      |      |      |      |  X   |      |      |      |
| T19. Auctions filtered by attributes successful            |  X  |  X  |  X  |  X  |  X  |  X  |  X  |     |     |  X   |      |      |      |      |      |      |      |      |      |
| T20. Login successful, token received (admin)              |  X  |  X  |  X  |  X  |     |     |     |     |     |  X   |      |      |      |      |      |  X   |  X   |  X   |      |
| T21. Login successful, token received (non-admin)          |  X  |  X  |  X  |  X  |     |     |     |     |     |  X   |      |      |      |      |      |  X   |  X   |      |      |
| T22. User registration successful                          |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |  X   |      |      |      |      |  X   |      |      |
| T23. User registration failed due to missing fields        |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |  X   |      |      |      |      |  X   |      |      |
| T24. User registration failed due to duplicate email       |  X  |  X  |  X  |  X  |     |     |     |  X  |     |  X   |      |  X   |      |      |      |      |  X   |      |      |
| T25. Get user by ID successful                             |  X  |  X  |  X  |  X  |     |     |     |     |     |  X   |      |      |      |      |      |  X   |      |      |      |
| T26. Get user by ID failed for invalid ID                  |  X  |  X  |  X  |  X  |     |     |     |     |     |  X   |      |      |      |      |      |  X   |      |      |      |
| T27. Get all users successful                              |  X  |  X  |  X  |  X  |     |     |     |     |     |  X   |      |      |      |      |      |  X   |      |      |      |

------------------------------
## Test Plan: Gemstone Auction System

---

### 1. Objective

The objective of this test plan is to ensure the correct functionality of the **Gemstone Auction System**, covering user authentication, gemstone management, bidding processes, and other core features. This will include testing both **server-side endpoints** and **client-side functionality** under various scenarios such as **positive**, **negative**, and **edge cases**.

---

### 2. Scope

#### Server-Side:

- **User Management:**
    - User registration
    - User login
    - Fetching user data

- **Gemstone Management (CRUD):**
    - Create, Read, Update, and Delete gemstones

- **Bidding:**
    - Place bids
    - Fetch bids

- **Authorization & Authentication:**
    - Token-based authentication (JWT)
    - Admin access control

#### Client-Side:

- **Add Item Page (Admin):** Add new gemstones.
- **Homepage:** Display, search, and filter gemstone listings.
- **Item Details Page:** Display gemstone details and allow bidding.
- **Login Page:** User authentication.
- **Register Page:** User registration.
- **Update/Edit Item Page (Admin):** Admin edit functionality for gemstones.

---

### 3. Testing Types

- **Functional Testing:** Verify that features behave as expected.
- **API Testing:** Test API endpoints for correct responses and error handling.
- **Authentication & Authorization Testing:** Ensure secure access for different user roles.
- **UI Testing:** Test user interaction and functionality on the client side.
- **Error Handling Testing:** Validate proper error messages and system responses under failure scenarios.

---

### 4. Test Environment

- **Frontend:** Svelte | page.js
- **Backend:** Node.js | Express.js | JWT | Bcrypt
- **Database:** Array-based (mock data)
- **Authentication:** JWT (Bearer Tokens)
- **Testing Tools:** IntelliJ REST Client, Postman (API Testing), Chrome/Firefox (UI Testing)

---

### 5. Test Scenarios

### Server-Side (API Endpoints)

##### User Management:

- **Register new users.**
- **Duplicate registration attempt (failure expected).**
- **Login with valid credentials.**
- **Login with invalid credentials (failure expected).**
- **Fetch authenticated user's details.**
- **Fetch unauthenticated user's details (failure expected).**

##### Gemstone Management (Admin):

- **Add new gemstone (Admin only).**
- **Update existing gemstone (Admin only).**
- **Delete gemstone (Admin only).**
- **Fetch all gemstones (Any user).**
- **Fetch gemstone by ID (Any user).**
- **Unauthorized gemstone operations (failure expected for non-admin users).**

##### Bidding System:

- **Place a bid on a gemstone (Authenticated user).**
- **Attempt to place a bid without authentication (failure expected).**
- **Retrieve bids for a specific gemstone (Public access).**
- **Retrieve user's personal bids (Authenticated user).**
- **Retrieve winning bids (Authenticated user).**

##### Authentication & Authorization:

- **Access protected routes without token (failure expected).**
- **Access protected routes with expired/invalid token (failure expected).**
- **Admin-only routes are restricted.**

### Client-Side Pages

#### Add Item Page (Admin):

- **Add a gemstone (Admin only).**
- **Attempt to add gemstone as non-admin (failure expected).**

#### Homepage:

- **Load gemstone listings.**
- **Search/filter gemstones by various criteria.**

#### Item Details Page:

- **Display gemstone details.**
- **Place bid as a logged-in user.**
- **Attempt to place bid without logging in (failure expected).**

#### Login Page:

- **Login with valid credentials.**
- **Attempt to login with invalid credentials (failure expected).**

#### Register Page:

- **Register a new user.**
- **Handle duplicate registration attempt (error expected).**

#### Update/Edit Item Page (Admin):

- **Update gemstone details as Admin.**
- **Attempt to update gemstone as non-admin (failure expected).**

---

### 6. Expected Outcomes

- Successful user **registration** and **login**.
- Only **authorized users (Admins)** can add, update, or delete gemstones.
- Users can **place bids** on gemstones, and bids are saved and retrieved correctly.
- Only **authenticated users** can view their bids and winning items.
- **Non-admin users** cannot perform admin tasks.
- Proper **error handling** and **status codes** are returned for unauthorized or invalid actions.

---


-----
## Test report

### 1. Objective

The goal of this test report is to evaluate the outcomes of the testing conducted on the **Gemstone Auction System**, verifying that all functionalities such as user authentication, gemstone management, and bidding processes meet the expected requirements.

---

### 2. Test Environment

- **Frontend**: Svelte, page.js
- **Backend**: Node.js, Express.js, JWT, Bcrypt
- **Database**: Array-based (Mock Data)
- **Authentication**: JWT (Bearer Tokens)
- **Testing Tools**: IntelliJ REST Client, Postman, Browser (Chrome/Firefox)

---

### 3. Test Results

#### Functional Testing

| Test Case ID  | Test Case Description                                  | Result  | Remarks                                   |
|---------------|--------------------------------------------------------|---------|-------------------------------------------|
| T1            | Get bids for gemstone successful                       | Passed  | All bids retrieved correctly              |
| T2            | Bid placed successfully                                | Passed  | Bids placed as expected                   |
| T3            | Invalid bid amount                                     | Passed  | Correct validation of invalid bid amounts |
| T4            | Attempt to place a bid after auction ended             | Passed  | System prevents bidding after auction end |
| T5            | Attempt to place a bid lower than current bid          | Passed  | System prevents lower bids                |
| T6            | Request executed successfully                          | Passed  | Successful responses for valid requests   |
| T7            | Gemstone search by name successful                     | Passed  | Correct search results returned           |
| T8            | No gemstones found for invalid search                  | Passed  | Correct error handling for invalid search |
| T9            | Retrieve gemstone by ID successful                     | Passed  | Correct gemstone data retrieved by ID     |
| T10           | Gemstone not found for invalid ID                      | Passed  | Error message returned for invalid ID     |
| T11           | Gemstone creation successful                           | Passed  | Gemstone successfully created             |
| T12           | Gemstone creation failed due to missing fields         | Passed  | Validation error on missing fields        |
| T13           | Unauthorized gemstone creation                         | Passed  | Non-admin users cannot create gemstones   |
| T14           | Gemstone update successful                             | Passed  | Gemstone updated successfully             |
| T15           | Gemstone update failed for invalid ID                  | Passed  | Correct validation for invalid ID         |
| T16           | Gemstone deletion successful                           | Passed  | Gemstone successfully deleted             |
| T17           | Unauthorized gemstone deletion                         | Passed  | Non-admin users cannot delete gemstones   |
| T18           | Gemstone deletion failed for invalid ID                | Passed  | Error handling for invalid ID             |
| T19           | Login successful, token received (Admin)               | Passed  | Admin login successful                    |
| T20           | Login successful, token received (Non-Admin)           | Passed  | Non-admin login successful                |
| T21           | User registration successful                           | Passed  | User registration successful              |
| T22           | User registration failed due to missing fields         | Passed  | Validation error on missing fields        |
| T23           | User registration failed due to duplicate email        | Passed  | Duplicate email handled correctly         |
| T24           | Get user by ID successful                              | Passed  | Correct user data retrieved by ID         |
| T25           | Get user by ID failed for invalid ID                   | Passed  | Error message returned for invalid ID     |
| T26           | Get all users successful                               | Passed  | All users retrieved correctly             |
| T27           | Auctions filtered by attributes successful             | Passed  | Filtering works as expected               |

---

#### API Testing

| Test Case ID  | API Endpoint                     | Expected Result                         | Actual Result                           | Status  |
|---------------|----------------------------------|-----------------------------------------|-----------------------------------------|---------|
| T1            | `GET /bids`                      | Retrieve bids for a gemstone            | All bids retrieved                      | Passed  |
| T2            | `POST /bids`                     | Place a valid bid                       | Bid placed successfully                 | Passed  |
| T3            | `POST /bids` (invalid amount)    | Reject invalid bid amount               | Validation error message returned       | Passed  |
| T4            | `POST /bids` (auction ended)     | Prevent placing bids after auction end  | Error message returned                  | Passed  |
| T5            | `GET /gemstones`                 | Retrieve all gemstones                  | Gemstones retrieved                     | Passed  |
| T6            | `POST /gemstones`                | Create a new gemstone (Admin)           | Gemstone created                        | Passed  |
| T7            | `POST /login`                    | Admin login                             | Admin token received                    | Passed  |
| T8            | `POST /login`                    | Non-admin login                         | User token received                     | Passed  |

---

#### UI Testing

| Page                  | Test Case Description                                    | Result  | Remarks                                                                                   |
|-----------------------|----------------------------------------------------------|---------|-------------------------------------------------------------------------------------------|
| Add Item Page (Admin) | Add gemstone as admin                                    |  Passed | Successfully added a new gemstone                                                         |
| Homepage              | Search, sort, and filter gemstones by criteria           | Passed  | Search, sort, and filtering works as expected                                             |
| Item Details Page     | Display correct gemstone details                         | Passed  | Correct details are shown                                                                 |
| Login Page            | Login with valid credentials                             | Passed  | Login works for both admin and user                                                       |
| Login Page            | Attempt to log in with invalid credentials               | Passed  | Error message displayed                                                                   |
| Register Page         | Register a new user                                      | Passed  | New user registered                                                                       |
| Register Page         | Attempt duplicate registration                           | Passed  | Error displayed for duplicate email                                                       |
| Update Item Page      | Update gemstone details as admin                         | Passed  | Successfully updated gemstone                                                             |
| Real-time Bid Update  | Bids are updated in real-time without reloading the page | Passed  | Successfully updated bids when someone places a new bid without having to reload the page |

---

## 4. Conclusion

- **Pass Rate**: 100%
- All the test cases have passed successfully, ensuring that the core functionality of the system works as expected.

