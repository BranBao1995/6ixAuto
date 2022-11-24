const db = require("../config/connection");
const { User, Post } = require("../models");
const userSeeds = require("./userSeeds.json");
const postSeeds = require("./postSeeds.json");

db.once("open", async () => {
  try {
    await Post.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      const random = Math.floor(Math.random() * (3 + 1));
      const allUsers = await User.find({});
      const randomUserId = allUsers[random]._id;
      const post = await Post.create({
        ...postSeeds[i],
        user: randomUserId,
      });
      const user = await User.findOneAndUpdate(
        { _id: randomUserId },
        {
          $addToSet: {
            listings: post._id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
