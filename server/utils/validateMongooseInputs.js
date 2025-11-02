import mongoose from "mongoose";

export const validateMongooseInputs = async (fields, options = {}) => {
    const { objectId } = fields;
    const {
        checkUserId = false,
    } = options;

    if (checkUserId && !mongoose.Types.ObjectId.isValid(objectId)){
        throw new Error('Invalid userId input');
    }

    return;
}