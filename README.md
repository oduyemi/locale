# Locale API Documentation

Welcome to Locale API, your ultimate resource for geographical information about Nigeria! Whether you're a developer building applications for Nigeria's vast population or simply curious about its regions, states, and local government areas (LGAs), Locale API has you covered. This documentation provides an overview of the API endpoints, authentication procedures, and usage guidelines to help you leverage Locale's features effectively.


### Base URL

The base URL for accessing Locale API is:

`https://locale-4z2n.onrender.com`

### Authentication and Authorization

To access Locale API endpoints, developers must authenticate their requests using API keys. Each developer must sign up to generate their unique API key, which will be used for subsequent requests.

### Registering a New User

#### Endpoint: /register

Method: POST

Description: Registers a new user and generates an API key.

Request Body:

json

`{
  "fname": "First Name",
  "lname": "Last Name",
  "email": "example@example.com",
  "pwd": "your_password",
  "cpwd": "confirm_password"
}`

Response:

json

`{
  "fname": "First Name",
  "lname": "Last Name",
  "email": "example@example.com",
  "token": "your_access_token"
}`

Logging In

Endpoint: /login

Method: POST

Description: Logs in an existing user and provides an access token.

Request Body:

json

`{
  "email": "example@example.com",
  "pwd": "your_password"
}`

Response:

json

`{
  "access_token": "your_access_token",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "fname": "First Name",
    "lname": "Last Name",
    "email": "example@example.com",
    "api_key": "your_api_key"
  }
}`

#### Logging Out

Endpoint:  `/logout`

Method: POST

Description: Logs out a user from the current session.

Request Header:

Authorization: Bearer your_access_token

Response:

json

`{
  "message": "Logout successful"
}`

### Endpoints

#### Users

##### Get All Users

Endpoint: `/users`

Method: GET

Description: Retrieves all registered users.

Response Body: Array of user objects.

##### Get User by ID

Endpoint: `/users/{id}`

Method: GET

Description: Retrieves user details by ID.

Response Body: User object.

##### Edit User Profile

Endpoint: `/users/{id}`

Method: PUT

Description: Updates user profile information.

Request Body: User object with updated fields.

Response Body: Updated user object.

#### API Key

##### Get API Key

Endpoint: `/api-key/{api_key}`

Method: GET

Description: Retrieves the user's API key.

Response Body: API key object.

#### Regions

##### Get All Regions

Endpoint: `/regions`

Method: GET

Description: Retrieves all regions in Nigeria.

Response Body: Array of region objects.

##### Get Region by ID

Endpoint: `/regions/{region_id}`

Method: GET

Description: Retrieves region details by ID.

Response Body: Region object.

##### Get Region by Name

Endpoint: `/regions/region/{regionSearch}`

Method: GET

Description: Retrieves region details by name.

Response Body: Region object.

#### States

##### Get All States

Endpoint: `/states`

Method: GET

Description: Retrieves all states in Nigeria.

Response Body: Array of state objects.

##### Get State by ID

Endpoint: `/states/{state_id}`

Method: GET

Description: Retrieves state details by ID.

Response Body: State object.

##### Get State by Name

Endpoint: `/states/state/{stateSearch}`

Method: GET

Description: Retrieves state details by name.

Response Body: State object.

#### LGAs

##### Get All LGAs

Endpoint: `/lgas`

Method: GET

Description: Retrieves all local government areas (LGAs) in Nigeria.

Response Body: Array of LGA objects.

##### Get LGA by ID

Endpoint: `/lgas/{lga_id}`

Method: GET

Description: Retrieves LGA details by ID.

Response Body: LGA object.

#### Cities

##### Get All Cities

Endpoint: `/cities`

Method: GET

Description: Retrieves all cities in Nigeria.

Response Body: Array of city objects.

##### Get City by ID

Endpoint: `/cities/{city_id}`

Method: GET

Description: Retrieves city details by ID.

Response Body: City object.

### Conclusion

Locale API provides comprehensive access to geographical information about Nigeria, empowering developers to build innovative solutions tailored to the needs of Nigeria's diverse population. By leveraging Locale's endpoints and authentication mechanisms, developers can seamlessly integrate geographical data into their applications, unlocking new possibilities for exploration and development. Start exploring Nigeria with Locale API today!






