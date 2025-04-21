import Thought from '../models/Thought.js';
import User from '../models/User.js';
export const thoughtController = {
    async getAllThoughts(_req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought)
                return res.status(404).json({ message: 'Thought not found' });
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
            res.status(201).json(thought);
            return; // Explicit return
        }
        catch (err) {
            res.status(400).json({ error: err });
            return; // Explicit return
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return; // Explicit return
            }
            res.json(thought);
            return; // Explicit return
        }
        catch (err) {
            res.status(400).json({ error: err });
            return; // Explicit return
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return; // Explicit return
            }
            await User.updateOne({ username: thought.username }, { $pull: { thoughts: thought._id } });
            res.json({ message: 'Thought deleted' });
            return; // Explicit return
        }
        catch (err) {
            res.status(500).json({ error: err });
            return; // Explicit return
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return; // Explicit return
            }
            res.json(thought);
            return; // Explicit return
        }
        catch (err) {
            res.status(400).json({ error: err });
            return; // Explicit return
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return; // Explicit return
            }
            res.json(thought);
            return; // Explicit return
        }
        catch (err) {
            res.status(400).json({ error: err });
            return; // Explicit return
        }
    },
};
