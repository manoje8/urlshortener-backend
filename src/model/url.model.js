import { Schema, model } from "mongoose";

const shortUrlSchema = new Schema(
    {
        url: {type: String, required: true},
        shortId: {type: String, required: true},
        hitCount: {type:Number, default: 0},
        userId: {type: Schema.Types.ObjectId, ref: "users", default: null}
    },
    {
        timestamps:true
    },
    {
        collection: "shortUrl",
        versionKey: false
    }
)

const shortUrlModel = model("shortUrl", shortUrlSchema, "shortUrl")

export default shortUrlModel