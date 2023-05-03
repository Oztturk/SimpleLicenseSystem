import { model, Schema } from 'mongoose'

const schema = new Schema({
    key: String,
});

export default model("unclaimedkeys", schema, "unclaimedkeys");