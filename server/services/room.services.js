import User from "../db/schemas/user.js";

export default class UserServices {
    static createUserRoom(email, room) {
        return new User({email, room}).save();
    }
}