import { model, Schema } from 'mongoose'

const schema = new Schema({
    ip: String,
    key: String,
    date: Date,
});

export default model("activelisances", schema, "activelisances");