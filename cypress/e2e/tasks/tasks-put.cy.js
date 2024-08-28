describe("GET/tasks", () => {
  beforeEach(function () {
    cy.fixture("tasks/tasks-put").then(function (tasks) {
      this.tasks = tasks;
    });
  });
  it("Update task to done", function () {
    const { user, task } = this.tasks.update;

    cy.task("removetask", task.name, user.email);
    cy.task("removeuser", user.email);
    cy.postUser(user);

    cy.postSession(user).then((userResp) => {
      cy.postTasks(task, userResp.body.token).then((taskResp) => {
        cy.putTask(taskResp.body._id, userResp.body.token).then((response) => {
          expect(response.status).to.eq(204);
        });
        cy.getUniqueTask(taskResp.body._id, userResp.body.token).then(
          (response) => {
            expect(response.body.is_done).to.be.true;
          }
        );
      });
    });
  });
  it("Task Not found", function () {
    const { user, task } = this.tasks.not_found;

    cy.task("removetask", task.name, user.email);
    cy.task("removeuser", user.email);
    cy.postUser(user);

    cy.postSession(user).then((userResp) => {
      cy.postTasks(task, userResp.body.token).then((taskResp) => {
        cy.deleteTask(taskResp.body._id, userResp.body.token).then(
          (response) => {
            expect(response.status).to.eq(204);

            // Verificar se a tarefa foi realmente deletada
            cy.putTask(taskResp.body._id, userResp.body.token).then(
              (response) => {
                expect(response.status).to.eq(404);
              }
            );
          }
        );
      });
    });
  });
});
