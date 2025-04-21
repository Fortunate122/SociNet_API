import { Schema, Types } from 'mongoose';
import dayjs from 'dayjs';
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dayjs(timestamp).format('MMM D, YYYY h:mm A'),
    },
}, {
    _id: false,
    id: false,
    toJSON: { getters: true },
});
export default ReactionSchema;
