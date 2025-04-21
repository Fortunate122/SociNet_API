import { Schema, model } from 'mongoose';
import dayjs from 'dayjs';
import ReactionSchema from './Reaction.js';
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dayjs(timestamp).format('MMM D, YYYY h:mm A'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', ThoughtSchema);
export default Thought;
