const express = require('express');
const { ExpressPeerServer } = require("peer");
const { Server: SocketServer } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// mongoDb connection:-
const connect = require('./configs/mongodb');

// auth routes:-
// patient
const authRouter = require('./router/authPatients');
// doctor
const doctorAuthRouter = require('./router/authDoctor');

// dipanshu made these routes:-
const doctorRouter = require('./router/doctorRouter');
const userRouter = require('./router/userRouter');

// doctor appoiintment booking routes:-
const doctorsRoute = require('./router/doctor');
// patient appointment booking routes:-
const patientsRoute = require('./router/patients');
// appointment booking routes:-
const appointmentRoutes = require('./router/appointmentBooking');

const app = express();
const server = require('http').createServer(app);

const PORT = 3050;
const FRONTEND = "http://localhost:5173";

const io = new SocketServer(server, {
    cors: { origin: FRONTEND },
    transports: ['websocket', 'polling'],
});

// const peerServer = ExpressPeerServer(server, {
//     debug: true,
//     path: "/",
//     corsOptions: {
//         origin: FRONTEND
//     }
// });

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: FRONTEND , credentials: true}));

// app.use('/auth', authRouter);
// app.use('/doctor', doctorRouter);
// app.use('/user', userRouter);

// CRUD for Doctor
app.use('/doctors', doctorsRoute);
// CRUD for Patient
app.use('/patients', patientsRoute);
// CRUD for appointments.
app.use('/api/appointments', appointmentRoutes);


// authentication routes:-
// patient authentication.
app.use('/patientauth', authRouter);
// doctor authentication.
app.use('/doctorauth', doctorAuthRouter)

app.get('/', (req, res) => {
    res.send('API working');
});

connect().then(() => {
    server.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
});

io.on('connection', socket => {
    console.log(socket.id, "connected using socket.io");
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });

    socket.on('message:send', (roomId, message) => {
        socket.to(roomId).emit('message:receive', message);
    });
});
