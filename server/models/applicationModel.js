import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema ({
    jobName: { type: String, required: true },
    jobDesc: { type: String, required: true },
    state: { type: String, required: true },
    associatedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

const Application = mongoose.model('Applications', applicationSchema);

export default Application;