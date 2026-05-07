# Architecture Document

## 1. Tech Stack Confirmation
The following technologies will be used for this project:
- **Frontend:** React for building the user interface and handling user interactions.
- **Backend:** Node.js for creating RESTful APIs and handling business logic.
- **Database:** PostgreSQL for storing and managing data.
- **Reasoning:**
  - React is chosen for its popularity, flexibility, and large community support, making it an ideal choice for building complex user interfaces.
  - Node.js is chosen for its ability to handle high concurrency, fast execution, and ease of development, making it suitable for building RESTful APIs.
  - PostgreSQL is chosen for its reliability, data integrity, and ability to handle large amounts of data, making it a good fit for storing and managing sensitive data such as patient records and prescriptions.

## 2. Folder Structure
The project will have the following folder structure:
```markdown
project/
|-- src/
|    |-- components/
|    |    |-- PatientRecord.js // displays patient record details
|    |    |-- PrescriptionForm.js // handles prescription form submission
|    |    |-- InventoryTable.js // displays inventory data
|    |-- routes/
|    |    |-- patient.js // handles patient record API requests
|    |    |-- prescription.js // handles prescription API requests
|    |    |-- inventory.js // handles inventory API requests
|    |-- models/
|    |    |-- Patient.js // defines patient record schema
|    |    |-- Prescription.js // defines prescription schema
|    |    |-- Inventory.js // defines inventory schema
|    |-- controllers/
|    |    |-- PatientController.js // handles patient record business logic
|    |    |-- PrescriptionController.js // handles prescription business logic
|    |    |-- InventoryController.js // handles inventory business logic
|    |-- services/
|    |    |-- PatientService.js // provides patient record data access
|    |    |-- PrescriptionService.js // provides prescription data access
|    |    |-- InventoryService.js // provides inventory data access
|    |-- utils/
|    |    |-- api.js // provides API request helper functions
|    |    |-- auth.js // provides authentication helper functions
|    |-- index.js // entry point for the application
|-- public/
|    |-- index.html // main HTML file for the application
|-- package.json // project dependencies and scripts
|-- README.md // project documentation
```

## 3. Database Schema
The database schema will consist of the following tables:
### Patient Table
- **Table Name:** patients
- **Fields:**
  - id (primary key, integer)
  - name (string)
  - contact_details (string)
  - date_of_birth (date)
  - medical_history (text)
  - allergies (text)
  - current_prescriptions (text)
- **Indexes:**
  - name (index)
  - contact_details (index)
- **Relationships:**
  - prescriptions (one-to-many)

### Prescription Table
- **Table Name:** prescriptions
- **Fields:**
  - id (primary key, integer)
  - patient_id (foreign key, integer)
  - medication (string)
  - dosage (string)
  - frequency (string)
  - dispensing_history (text)
- **Indexes:**
  - patient_id (index)
  - medication (index)
- **Relationships:**
  - patients (many-to-one)

### Inventory Table
- **Table Name:** inventory
- **Fields:**
  - id (primary key, integer)
  - medication (string)
  - stock_level (integer)
  - low_stock_threshold (integer)
- **Indexes:**
  - medication (index)
  - stock_level (index)
- **Relationships:**
  - prescriptions (many-to-many)

### Billing Table
- **Table Name:** billing
- **Fields:**
  - id (primary key, integer)
  - patient_id (foreign key, integer)
  - invoice_date (date)
  - amount (decimal)
  - payment_method (string)
- **Indexes:**
  - patient_id (index)
  - invoice_date (index)
- **Relationships:**
  - patients (many-to-one)

### Supplier Table
- **Table Name:** suppliers
- **Fields:**
  - id (primary key, integer)
  - name (string)
  - contact_details (string)
  - products_supplied (text)
  - order_history (text)
- **Indexes:**
  - name (index)
  - contact_details (index)
- **Relationships:**
  - inventory (many-to-many)

## 4. API Contracts
The following API endpoints will be available:
### Patient Endpoints
- **GET /api/patients**: retrieves a list of all patients
  - **Request Body:** none
  - **Response Schema:** array of patient objects
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 500 Internal Server Error: if database query fails
- **GET /api/patients/:id**: retrieves a patient by ID
  - **Request Body:** none
  - **Response Schema:** patient object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 404 Not Found: if patient not found
    - 500 Internal Server Error: if database query fails
- **POST /api/patients**: creates a new patient
  - **Request Body:** patient object
  - **Response Schema:** created patient object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 400 Bad Request: if request body is invalid
    - 500 Internal Server Error: if database query fails

### Prescription Endpoints
- **GET /api/prescriptions**: retrieves a list of all prescriptions
  - **Request Body:** none
  - **Response Schema:** array of prescription objects
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 500 Internal Server Error: if database query fails
- **GET /api/prescriptions/:id**: retrieves a prescription by ID
  - **Request Body:** none
  - **Response Schema:** prescription object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 404 Not Found: if prescription not found
    - 500 Internal Server Error: if database query fails
- **POST /api/prescriptions**: creates a new prescription
  - **Request Body:** prescription object
  - **Response Schema:** created prescription object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 400 Bad Request: if request body is invalid
    - 500 Internal Server Error: if database query fails

### Inventory Endpoints
- **GET /api/inventory**: retrieves a list of all inventory items
  - **Request Body:** none
  - **Response Schema:** array of inventory objects
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 500 Internal Server Error: if database query fails
- **GET /api/inventory/:id**: retrieves an inventory item by ID
  - **Request Body:** none
  - **Response Schema:** inventory object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 404 Not Found: if inventory item not found
    - 500 Internal Server Error: if database query fails
- **POST /api/inventory**: creates a new inventory item
  - **Request Body:** inventory object
  - **Response Schema:** created inventory object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 400 Bad Request: if request body is invalid
    - 500 Internal Server Error: if database query fails

### Billing Endpoints
- **GET /api/billing**: retrieves a list of all billing records
  - **Request Body:** none
  - **Response Schema:** array of billing objects
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 500 Internal Server Error: if database query fails
- **GET /api/billing/:id**: retrieves a billing record by ID
  - **Request Body:** none
  - **Response Schema:** billing object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 404 Not Found: if billing record not found
    - 500 Internal Server Error: if database query fails
- **POST /api/billing**: creates a new billing record
  - **Request Body:** billing object
  - **Response Schema:** created billing object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 400 Bad Request: if request body is invalid
    - 500 Internal Server Error: if database query fails

### Supplier Endpoints
- **GET /api/suppliers**: retrieves a list of all suppliers
  - **Request Body:** none
  - **Response Schema:** array of supplier objects
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 500 Internal Server Error: if database query fails
- **GET /api/suppliers/:id**: retrieves a supplier by ID
  - **Request Body:** none
  - **Response Schema:** supplier object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 404 Not Found: if supplier not found
    - 500 Internal Server Error: if database query fails
- **POST /api/suppliers**: creates a new supplier
  - **Request Body:** supplier object
  - **Response Schema:** created supplier object
  - **Authentication Required:** yes
  - **Error Responses:**
    - 401 Unauthorized: if authentication fails
    - 400 Bad Request: if request body is invalid
    - 500 Internal Server Error: if database query fails

## 5. Component Architecture (Frontend)
The following components will be used:
- **PatientRecordComponent**: displays patient record details
  - **API Endpoints:** GET /api/patients/:id
  - **State:** patient record object
- **PrescriptionFormComponent**: handles prescription form submission
  - **API Endpoints:** POST /api/prescriptions
  - **State:** prescription object
- **InventoryTableComponent**: displays inventory data
  - **API Endpoints:** GET /api/inventory
  - **State:** array of inventory objects
- **BillingTableComponent**: displays billing data
  - **API Endpoints:** GET /api/billing
  - **State:** array of billing objects
- **SupplierTableComponent**: displays supplier data
  - **API Endpoints:** GET /api/suppliers
  - **State:** array of supplier objects

## 6. Service Layer (Backend)
The following services will be used:
- **PatientService**: provides patient record data access
  - **Responsibilities:** retrieve patient records, create new patient records, update existing patient records
- **PrescriptionService**: provides prescription data access
  - **Responsibilities:** retrieve prescriptions, create new prescriptions, update existing prescriptions
- **InventoryService**: provides inventory data access
  - **Responsibilities:** retrieve inventory items, create new inventory items, update existing inventory items
- **BillingService**: provides billing data access
  - **Responsibilities:** retrieve billing records, create new billing records, update existing billing records
- **SupplierService**: provides supplier data access
  - **Responsibilities:** retrieve suppliers, create new suppliers, update existing suppliers

## 7. Authentication & Security
The following authentication and security measures will be implemented:
- **Authentication:** JSON Web Tokens (JWT) will be used to authenticate users
- **Authorization:** role-based access control will be used to authorize users to access certain endpoints
- **Data Encryption:** sensitive data will be encrypted using SSL/TLS
- **Password Hashing:** passwords will be hashed using a secure hashing algorithm

## 8. Environment Variables
The following environment variables will be used:
- **DB_HOST**: database host
  - **Example Value:** localhost
- **DB_PORT**: database port
  - **Example Value:** 5432
- **DB_USERNAME**: database username
  - **Example Value:** postgres
- **DB_PASSWORD**: database password
  - **Example Value:** password
- **JWT_SECRET**: JWT secret key
  - **Example Value:** secretkey

## 9. Dependencies
The following dependencies will be used:
- **React**: 17.0.2
- **Node.js**: 14.17.0
- **Express**: 4.17.1
- **PostgreSQL**: 13.4
- **pg**: 8.6.0
- **jsonwebtoken**: 8.5.1
- **bcrypt**: 5.0.1
- **cors**: 2.8.5
- **helmet**: 4.6.0
- **morgan**: 1.10.0
- **body-parser**: 1.19.0
- **lodash**: 4.17.21
- **moment**: 2.29.1
- **react-router-dom**: 5.2.0
- **react-bootstrap**: 2.0.0-rc.0
- **bootstrap**: 5.1.3