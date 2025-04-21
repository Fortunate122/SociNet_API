import { faker } from '@faker-js/faker';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
const seed = async () => {
    console.log('🌱 Seeding database...');
    await cleanDB();
    const users = [];
    const thoughts = [];
    // Generate Users
    for (let i = 0; i < 10; i++) {
        const username = faker.internet.userName();
        const email = faker.internet.email();
        users.push({ username, email });
    }
    const userDocs = await User.insertMany(users);
    // Generate Thoughts per User
    for (const user of userDocs) {
        for (let j = 0; j < 2; j++) {
            const thoughtText = faker.hacker.phrase();
            const thought = await Thought.create({
                thoughtText,
                username: user.username,
            });
            await User.findByIdAndUpdate(user._id, { $push: { thoughts: thought._id } });
            thoughts.push({ thoughtText, username: user.username });
        }
    }
    // Randomly Add Friends
    for (const currentUser of userDocs) {
        const otherUsers = userDocs.filter(u => u._id.toString() !== currentUser._id.toString());
        const randomFriend = faker.helpers.arrayElement(otherUsers);
        await User.findByIdAndUpdate(currentUser._id, { $addToSet: { friends: randomFriend._id } });
    }
    console.log('✅ Seed complete. Users and Thoughts created.');
};
export default seed;
// import { faker } from '@faker-js/faker';
// import { User, Thought } from '../models/index.js';
// import cleanDB from './cleanDB.js';
// const seed = async () => {
//   console.log('🌱 Seeding database...');
//   await cleanDB();
//   const users = [];
//   const thoughts = [];
//   // Generate Users
//   for (let i = 0; i < 10; i++) {
//     const username = faker.internet.userName();
//     const email = faker.internet.email();
//     users.push({ username, email });
//   }
//   const userDocs = await User.insertMany(users);
//   // Generate Thoughts per User
//   for (let i = 0; i < userDocs.length; i++) {
//     const user = userDocs[i];
//     for (let j = 0; j < 2; j++) {
//       const thoughtText = faker.hacker.phrase();
//       const thought = await Thought.create({
//         thoughtText,
//         username: user.username,
//       });
//       await User.findByIdAndUpdate(user._id, { $push: { thoughts: thought._id } });
//       thoughts.push(thought);
//     }
//   }
//   // Randomly Add Friends
//   for (let i = 0; i < userDocs.length; i++) {
//     const currentUser = userDocs[i];
//     const otherUsers = userDocs.filter(u => u._id.toString() !== currentUser._id.toString());
//     const randomFriend = faker.helpers.arrayElement(otherUsers);
//     await User.findByIdAndUpdate(currentUser._id, { $addToSet: { friends: randomFriend._id } });
//   }
//   console.log('✅ Seed complete. Users and Thoughts created.');
// };
// export default seed;
