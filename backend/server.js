const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken'); // For JWT token generation
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: "http://localhost:5173", // Ensure this matches the client URL
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true
  },
  transports: ["websocket"], // Enforce WebSocket only for transport
});
// Models
const User = require('./models/User'); // User model
const PatientData = require('./models/PatientData'); // PatientData model

dotenv.config();

 
const PORT = process.env.PORT || 3000;
const JWT_SECRET = '12345'; // Use environment variables for sensitive data

// Middleware
app.use(cors());
app.use(bodyParser.json());


io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on("join", ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("new_peer", {
            socketId: socket.id,
            micOn: true, // You can track mic state here
        });
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit("joined", {
                clients,
                username,
                socketId: socket.id,
            });

        });
    });


    socket.on("mic_toggle", ({ roomId, username, micOn }) => {
      console.log(`${username} toggled mic: ${micOn}`);
      // Notify others in the room about the mic status
      socket.to(roomId).emit("mic_toggle_responce", {
          username,
          micOn,
      });
  });
  
  socket.on('send_offer', ({ sdp, to }) => {
    console.log("offer Recieved On server");
    socket.to(to).emit('recieve_offer', { sdp, from: socket.id });
  });
  
  socket.on('send_answer', ({ sdp, to }) => {
    console.log("answer Recieved On server");
    socket.to(to).emit('recieve_answer', { sdp, from: socket.id });
  });
  
  socket.on('ICE_candidates', ({ candidate, socketId }) => {
    console.log("ICE Recieved On server");
    
    io.to(socketId).emit('recieve_ice_candidate', { candidate, from: socket.id });
    console.log(userSocketMap[socketId]);
  });

  socket.on('disconnecting', () => {

    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
            socketId: socket.id,
            username: userSocketMap[socket.id],
        });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
  



});


  




// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected to database'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// Route to get all patient data
app.get('/api/get-patient-data', async (req, res) => {
  try {
    const patientData = await PatientData.find(); // Get all documents from the PatientData collection
    res.status(200).json(patientData); // Send the patient data as response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Route for submitting patient details
app.post('/api/submit-details', async (req, res) => {
  const { fullName, age, address, condition, location } = req.body;

  try {
    // Create and save the new patient data in a single collection
    const patientData = new PatientData({
      fullName,
      age,
      address,
      condition,
      location,
    });

    await patientData.save(); // Save patient data in the collection

    res.status(201).json({ message: 'Details submitted successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Register a new user
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password }); // Add password hashing if required
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Direct password comparison (implement password hashing in production)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Default route for health check
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
