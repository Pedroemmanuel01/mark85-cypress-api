describe("POST/tasks", () => {
  beforeEach(function () {
    cy.fixture("tasks/tasks-post").then(function (tasks) {
      this.tasks = tasks;
    });
  });

  it("Register a new tasks", function () {
    const { user, task } = this.tasks.create;

    cy.task("removeuser", user.email);
    cy.postUser(user);

    cy.postSession(user).then((userResp) => {
      cy.task("removetask", task.name, user.email);
      //Chamando o token com o response body
      cy.postTasks(task, userResp.body.token).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.name).to.eq(task.name);
        expect(response.body.tags).to.eql(task.tags);
        expect(response.body.user).to.eq(userResp.body.user._id);
        expect(response.body._id.length).to.eq(24);
      });
    });
  });
  it("Duplicate tasks", function () {
    const { user, task } = this.tasks.dup;

    cy.task("removeuser", user.email);
    cy.postUser(user);

    cy.postSession(user).then((userResp) => {
      cy.task("removetask", task.name, user.email);
      cy.postTasks(task, userResp.body.token);
      cy.postTasks(task, userResp.body.token).then((response) => {
        expect(response.status).to.eq(409);
        expect(response.body.message).to.eq("Duplicated task!");
      });
    });
  });
});
