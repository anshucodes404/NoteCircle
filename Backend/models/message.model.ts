import mongoose, {Document, Schema} from "mongoose";

interface IMessage extends Document{
    sender: mongoose.Schema.Types.ObjectId,
    text: string[],
    receiver: mongoose.Schema.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date
}

const messageSchema: Schema = new Schema<IMessage>({
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    text: [{ type: String }],
    receiver: { type: mongoose.Types.ObjectId, ref: "User" },
}, { timestamps: true })


export const Message = mongoose.model<IMessage>("Message", messageSchema)