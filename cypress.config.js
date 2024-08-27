const { defineConfig } = require("cypress");

const { connect } = require("./cypress/support/mongo");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on) {
      // implement node event listeners here

      const db = await connect();

      on("task", {
        async removeuser(email) {
          const users = db.collection("users");
          await users.deleteMany({ email: email });
          return null;
        },
        async removetask(taskname, emailUser) {
          const users = db.collection("users");
          const user = users.findOne({ email: emailUser });
          const tasks = db.collection("tasks");
          await tasks.deleteMany({ name: taskname, user: user._id });
          return null;
        },
        async removeTaskLike(key) {
          const tasks = db.collection("tasks");
          await tasks.deleteMany({ name: { $regex: key } });
          return null;
        },
      });
    },
    baseUrl: "http://localhost:3333",
  },
});
