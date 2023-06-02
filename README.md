# springwood
Real-time Collaborative Drawing Application

This is a real-time collaborative drawing application built with React.js, Canvas Api and Socket.IO. It allows multiple users to draw on a shared canvas simultaneously.

The application consists of two main components: the client-side code responsible for the drawing canvas interface, and the server-side code that handles the real-time communication between clients.

Client-Side

The client-side code is responsible for rendering the drawing canvas interface and handling user interactions.

Technologies and Packages Used

React.js: A JavaScript library for building user interfaces.
Socket.IO: A library that enables real-time, bidirectional communication between the client and server.
lodash: A utility library that provides various helper functions.
File Structure

Canvas.js: The main component that represents the drawing canvas and handles user interactions.
firebaseConfig.js: Configuration file for Firebase authentication.
Login.js: The file responsible for firebase authentication.
index.js: Entry point of the client-side application.
Functionalities

Drawing Canvas:

The canvas allows users to draw using a brush tool or erase using an eraser tool.
Users can change the brush color and size.
The canvas supports drawing various shapes such as rectangles and circles.
When a user draws or erases on the canvas, the changes are immediately synced with other connected users.
Real-time Communication:

The client establishes a socket connection with the server using Socket.IO.
When a user draws on the canvas, the drawing data is sent to the server and broadcasted to all connected clients.
The received drawing data is rendered on the canvas of each connected client in real-time.
Saving Drawings:

Users can save their drawings by sending the drawing data to the server for storage.
Server-Side

The server-side code handles the real-time communication between clients and the storage of drawings.

Technologies and Packages Used

Node.js: A JavaScript runtime for server-side development.
Express: A web application framework for Node.js.
Socket.IO: A library for real-time, bidirectional communication.
Mongoose: An Object Data Modeling (ODM) library for MongoDB.
dotenv: A package for loading environment variables from a .env file.
cors: A package for enabling Cross-Origin Resource Sharing (CORS).
File Structure

server.js: The main server file that sets up the Express server and socket connections.
routes/canvas.js: Defines the API routes for saving and retrieving drawings.
models/canvasModel.js: Defines the Mongoose model for the drawing data.
Functionalities

Socket Connection:

The server sets up a socket.io server and listens for client connections.
When a client connects, the server logs a message and sets up event listeners for drawing-related events.
Drawing Events:

When a client emits a 'draw' event, indicating a user drawing on the canvas, the server broadcasts the drawing data to all connected clients.
Saving Drawings:

The server provides an API endpoint for saving drawings.
When a client sends a POST request with the drawing data and user ID, the server validates the request payload and saves the drawing data to the database.
Deployment and Configuration

The client-side code
can be built using a bundler such as Webpack or Create React App.

The server-side code can be deployed to a Node.js hosting platform such as Heroku or AWS Elastic Beanstalk.
Configure the environment variables required by the server (e.g., MongoDB connection URL, Firebase credentials) using a .env file or the hosting platform's environment variable settings.