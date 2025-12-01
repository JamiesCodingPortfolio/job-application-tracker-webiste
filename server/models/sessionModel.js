import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tokenHash: { type: String, required: true},
}, {timestamps: true});

sessionSchema.index({ createdAt: 1 }, { expires: '14d' });

const Session = mongoose.model('Session', sessionSchema);

export default Session;