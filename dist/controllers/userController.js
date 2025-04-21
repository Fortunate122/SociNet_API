import User from '../models/User.js';
import Thought from '../models/Thought.js';
export const userController = {
    async getAllUsers(_req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
            return;
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
            return;
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted' });
            return;
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
            return;
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
            return;
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    },
};
