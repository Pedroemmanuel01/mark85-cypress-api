describe("GET/tasks", () => {
  beforeEach(function () {
    cy.fixture("tasks/tasks-get").then(function (tasks) {
      this.tasks = tasks;
    });
  });

  it("Get my tasks", function () {
    const { user, tasks } = this.tasks.list;

    cy.task("removeTaskLike", "Estud4r");
    cy.task("removeuser", user.email);
    cy.postUser(user);

    cy.postSession(user).then((userResp) => {
      //Vai percorrer a lista de tasks e postar cada uma delas
      tasks.forEach(function (t) {
        cy.postTasks(t, userResp.body.token);
      });
      cy.getTasks(userResp.body.token).then((response) => {
        expect(response.status).to.eq(200);
        // Verifica se o comprimento do array é igual ao número de tasks criadas
        expect(response.body).to.have.length(tasks.length);
        // Verifica se as tarefas retornadas correspondem às tarefas criadas
        tasks.forEach((task, index) => {
          expect(response.body[index].name).to.eq(task.name);
          expect(response.body[index].tags).to.eql(task.tags);
        });
      });
    });
  });

  it("Get unique task", function () {
    const { user, task } = this.tasks.unique;

    cy.task("removetask", task.name, user.email);
    cy.task("removeuser", user.email);
    cy.postUser(user);

    cy.postSession(user).then((userResp) => {
      cy.postTasks(task, userResp.body.token).then((taskResp) => {
        cy.getUniqueTask(taskResp.body._id, userResp.body.token).then(
          (response) => {
            expect(response.status).to.eq(200);
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
            cy.getUniqueTask(taskResp.body._id, userResp.body.token).then(
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
