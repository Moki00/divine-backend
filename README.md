# This is the backend for Divine Homes Services website

## using Node.js

```
npm run dev  # Start in development mode (with Nodemon)
npm start    # Start in production mode (with Node.js)
```

```
set up with npm install express cors
```

# Create User

curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d '{"name": "Gokame Man", "email": "Gokame@gmail.com"}'

# Get All Users

curl -X GET http://localhost:5000/api/users

# Get User by ID

curl -X GET http://localhost:5000/api/users/1

# Update User

curl -X PUT http://localhost:5000/api/users/1 -H "Content-Type: application/json" -d '{"name": "Some Updated Name", "email": "newemail@example.com"}'

# Delete User

curl -X DELETE http://localhost:5000/api/users/1
