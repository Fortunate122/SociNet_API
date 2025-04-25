# SociNet API

## Description
SociNet API is a full-featured RESTful backend API built with TypeScript, Express, and MongoDB (Mongoose) for a social network application. It supports full CRUD operations for users and their thoughts, embedded reactions (like replies), and a self-referencing friend list. The API is designed to be tested using Insomnia and supports large volumes of unstructured social data.

## Table of Contents
- [Motivation](#motivation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Seed Data](#seed-data)
- [License](#license)
- [Learning](#learning)
- [Standout](#standout)
- [Questions](#questions)
- [GitHubRepo](#githubrepo)
- [VideoLink](#videolink)

## Motivation
The goal of this project was to design an API capable of handling scalable social interactions, including user profiles, posts, friend connections, and inline reactions, using modern backend practices and NoSQL data modeling.

## Usage
- Clone the repo
- Install dependencies: `npm install`
- Start MongoDB locally
- Start server: `npm run dev`
- Use Insomnia to test endpoints defined in `/api/users` and `/api/thoughts`

## Endpoints
### Users
- `GET /api/users` – Get all users
- `GET /api/users/:userId` – Get one user (with thoughts and friends)
- `POST /api/users` – Create user
- `PUT /api/users/:userId` – Update user
- `DELETE /api/users/:userId` – Delete user and their thoughts
- `POST /api/users/:userId/friends/:friendId` – Add friend
- `DELETE /api/users/:userId/friends/:friendId` – Remove friend

### Thoughts
- `GET /api/thoughts` – Get all thoughts
- `GET /api/thoughts/:thoughtId` – Get one thought
- `POST /api/thoughts` – Create thought
- `PUT /api/thoughts/:thoughtId` – Update thought
- `DELETE /api/thoughts/:thoughtId` – Delete thought

### Reactions (Subdocuments of Thoughts)
- `POST /api/thoughts/:thoughtId/reactions` – Add reaction
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` – Remove reaction

## Testing
Use Insomnia to:
- Perform CRUD on users and thoughts
- Add/remove friends
- Add/remove reactions

The full Insomnia collection is included in the project for easy import.

## Seed Data
To generate mock users and thoughts:
```bash
npm run seed
```
This script creates users, links them to thoughts, and randomly assigns friendships.

## License
This project is licensed under the None license.

## Learning
Built for understanding NoSQL relationships with Mongoose, schema validation, virtual properties, subdocuments, and how to build clean, testable REST APIs in TypeScript.

## Standout
- Full support for reaction subdocuments and friend linking
- Auto-clean and seedable DB
- Designed with modular, scalable file structure

## Questions
If you have any questions, please reach out:
- GitHub: [Fortunate122](https://github.com/Fortunate122)
- Email: davidsaldana122@gmail.com

## GitHubRepo
https://github.com/Fortunate122/SociNet_API

## VideoLink
https://app.screencastify.com/v3/watch/meOC144QPEoPPcw59xrT