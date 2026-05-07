**Task Brief: Implementing Pharmacy Management System API Endpoints**

**Objective:**
Implement the Pharmacy Management System API endpoints as described in the provided contract, ensuring accuracy and adherence to the specified requirements.

**Scope:**

1. **Patient Records Endpoint (GET /patients)**:
	* Create a new endpoint that retrieves a list of patient records.
	* The response should be an array of patient objects with the required fields (id, name, address).
2. **Prescription Form Endpoint (POST /prescriptions)**:
	* Create a new endpoint that accepts a prescription form submission request.
	* The response should create a new patient record and return the newly created record in the request body.
3. **Inventory Endpoint (GET /inventory)**:
	* Create a new endpoint that retrieves an array of inventory items.
	* The response should be an array of inventory objects with the required fields (id, name, quantity).
4. **Billing Endpoint (GET /billing)**:
	* Create a new endpoint that retrieves an array of billing records.
	* The response should be an array of billing objects with the required fields (id, amount).

**Deliverables:**

1. Complete all API endpoints as specified in the contract.
2. Implement authentication and authorization using JSON Web Tokens (JWT) for secure access control.
3. Use a database (PostgreSQL) to store patient records, prescriptions, inventory items, and billing records.

**Assumptions and Dependencies:**

* The Frontend Team will use React as the frontend framework.
* The API endpoints will be implemented in separate files with corresponding JavaScript implementations.
* The database schema will be designed based on the provided contract requirements.

**Responsibilities:**

1. **Frontend Team Members**:
	* Implement all API endpoints according to the contract.
	* Use the specified frontend framework (React) and libraries (e.g., Axios, Bootstrap).
	* Ensure error handling and validation are implemented correctly.
2. **Backend Team**:
	* Design and implement the database schema based on the provided contract requirements.
	* Implement authentication and authorization using JWT.

**Timeline:**

The implementation will be completed in 4 weeks, with the following milestones:

Week 1-2: Define the API endpoints and create a basic prototype using React.

Week 3-4: Implement all API endpoints according to the contract, including authentication and authorization.

**Assessment Criteria:**

* Correctness of implemented API endpoints.
* Adherence to the provided contract requirements.
* Quality of code and design.
* Test coverage and error handling.

**Tools and Resources:**

1. React 17.0.2
2. Node.js 14.17.0
3. PostgreSQL 13.4
4. Axios
5. Bootstrap
6. JSON Schema for validation

Please confirm your understanding of the task brief, and I'll be happy to assist you in implementing the Pharmacy Management System API endpoints!