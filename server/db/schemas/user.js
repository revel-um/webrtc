import mongoose from 'mongoose';

// Define the user schema
export const UserDocument = {
    email: {
        type: String,
    },
    room: {
        type: String,
        required: true,
    },
};

const userSchema = new mongoose.Schema(UserDocument, { timestamps: true });

// Create a User model based on the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
