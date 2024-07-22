// Example: Message model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

// Example: VideoCall model
const videoCallSchema = new Schema({
    caller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['initiated', 'ongoing', 'ended'], default: 'initiated' },
    createdAt: { type: Date, default: Date.now }
});

const VideoCall = mongoose.model('VideoCall', videoCallSchema);

module.exports = VideoCall;

// Example: AudioCall model
const audioCallSchema = new Schema({
    caller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['initiated', 'ongoing', 'ended'], default: 'initiated' },
    createdAt: { type: Date, default: Date.now }
});

const AudioCall = mongoose.model('AudioCall', audioCallSchema);

module.exports = AudioCall;
