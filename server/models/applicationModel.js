import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema ({
    jobName: { type: String, required: true },
    jobDesc: { type: String, required: true },
    ascUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

const Applications = mongoose.model('Applications'. applicationSchema);

export default Applications;