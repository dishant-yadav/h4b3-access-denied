const express = require('express');
const { ExpressPeerServer } = require("peer");
const { Server: SocketServer } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

// doctor appointment booking routes:-
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

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro-001",
});

const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 0,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND, credentials: true }));

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
app.use('/doctorauth', doctorAuthRouter);

// Summarization route
app.post('/api/summarize', async (req, res) => {
    const { text, sum_length } = req.body;

    if (!text || !Array.isArray(text)) {
        return res.status(400).json({ error: 'Invalid input. Please provide a valid text array.' });
    }

    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    {
                        text: `You are an expert summarizer capable of understanding the content and summarizing aptly, keeping most valid information intact. Develop a summarizer that efficiently condenses the text into a concise summary. The summaries should capture essential information and convey the main points clearly and accurately. The summarizer must be able to handle content related to patient and doctor conversations. It should prioritize key facts, medical advice, diagnoses, and any prescribed treatments or next steps while maintaining the integrity and tone of the original conversation. Aim for a summary that is approximately ${sum_length} words in size. Focus on clarity, brevity, and relevance to ensure the summary is both informative and readable.`
                    }
                ]
            },
        ],
    });

    try {
        const result = await chatSession.sendMessage(`Write a summary for the text. ${JSON.stringify(text)}`);
        res.json({ summary: result.response.text() });
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).json({ error: 'An error occurred while generating the summary.' });
    }
});

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
