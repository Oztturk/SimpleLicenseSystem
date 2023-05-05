import { model, Schema } from 'mongoose'

const schema = new Schema({
    key: String,
    days: Number
});

export default model("unclaimedkeys", schema, "unclaimedkeys");