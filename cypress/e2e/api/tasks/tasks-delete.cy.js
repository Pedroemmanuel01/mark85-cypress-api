describe("DELETE/tasks", () => {
  beforeEach(function () {
    cy.fixture("tasks/tasks-delete").then(function (tasks) {
      this.tasks = tasks;
    });
  });
  it("Remove a task", function () {
    const { user, task } = this.tasks.remove;

    cy.task("removetask", task.name, user.email);
    cy.task("removeuser", user.email);
    cy.postUser(user);

    cy.postSession(user).then((userResp) => {
      cy.postTasks(task, userResp.body.token).then((taskResp) => {
        cy.deleteTask(taskResp.body._id, userResp.body.token).then(
          (response) => {
            expect(response.status).to.eq(204);
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
            cy.deleteTask(taskResp.body._id, userResp.body.token).then(
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
