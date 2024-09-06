import pageElements from "../../support/pageElements";

describe("Task in the system ", () => {
  beforeEach(function () {
    cy.fixture("tasks/tasks-post").then(function (tasks) {
      this.tasks = tasks;
    });
  });

  context("Task add", () => {
    it("Verify if task is added successfully with 0 tags", function () {
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.addTaskWithTags(task.name);
      cy.verifyTaskInList(task.name);
    });

    it("Verify if task is added successfully with 1 tag", function () {
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.addTaskWithTags(task.name, [task.tag[0]]);
      cy.verifyTaskInList(task.name, [task.tag[0]]);
    });

    it("Verify if task is added successfully with 2 tags", function () {
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.addTaskWithTags(task.name, [task.tag[0], task.tag2[0]]);
      cy.verifyTaskInList(task.name, [task.tag[0], task.tag2[0]]);
    });

    it("Verify if task is added successfully with 3 tags", function () {
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.addTaskWithTags(task.name, [task.tag[0], task.tag2[0], task.tag3[0]]);
      cy.verifyTaskInList(task.name, [task.tag[0], task.tag2[0], task.tag3[0]]);
    });
    it("Verify if task not possible add with more than 3 tags", function () {
      //nao deveria ser possivel mas esta sendo
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.addTaskWithTags(task.name, [
        task.tag[0],
        task.tag2[0],
        task.tag3[0],
        task.tag4[0],
      ]);
      cy.verifyTaskInList(task.name, [
        task.tag[0],
        task.tag2[0],
        task.tag3[0],
        task.tag4[0],
      ]);
    });
    it("Task duplicate", function () {
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.addTaskWithTags(task.name, [task.tag[0]]);
      cy.addTaskWithTags(task.name, [task.tag[0]]);
      cy.get(pageElements.errorMessage).should(
        "have.text",
        "Oops! Tarefa duplicada."
      );
    });
  });
  context("Required fields", function () {
    it("Verify if name is required", function () {
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.get(pageElements.buttonAdd).should("be.visible").click();
      cy.get(pageElements.tagsInput).type(`${task.tag[0]}{enter}`);
      cy.contains("button", "Cadastrar").click();
      cy.get(pageElements.alertError).should("have.text", "Campo obrigatório");
    });
  });
  context("Tasks modification", function () {
    it("Verify if it is possible to mark task as completed", function () {
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.addTaskWithTags(task.name, [task.tag[0], task.tag2[0], task.tag3[0]]);
      cy.get(pageElements.taskTodo).should("be.visible");
      cy.get(pageElements.itemToggle).should("be.visible").click();
      cy.get(pageElements.taskTodo).should("not.exist");
      cy.get(pageElements.itemToggle).should("not.exist");
      //So ficam visiveis quando marcando como concluido
      cy.get(pageElements.itemSelected).should("be.visible");
      cy.get(pageElements.taskDone).should("be.visible");
    });
    it("Verify if it is possible to unmark task as completed", function () {
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.addTaskWithTags(task.name, [task.tag[0], task.tag2[0], task.tag3[0]]);
      cy.get(pageElements.taskTodo).should("be.visible");
      cy.get(pageElements.itemToggle).should("be.visible").click();
      cy.get(pageElements.taskTodo).should("not.exist");
      cy.get(pageElements.itemToggle).should("not.exist");
      //So ficam visiveis quando marcando como concluido
      cy.get(pageElements.itemSelected).should("be.visible");
      cy.get(pageElements.taskDone).should("be.visible");
      //Quando desmarca eles voltam a nao existir
      cy.get(pageElements.itemSelected).click();
      cy.get(pageElements.itemToggle).should("be.visible");
      cy.get(pageElements.taskTodo).should("be.visible");
      cy.get(pageElements.itemSelected).should("not.exist");
      cy.get(pageElements.taskDone).should("not.exist");
    });
    it("Verify if it is possible to delete task", function () {
      const { user, task } = this.tasks.createTask;

      cy.setupUserAndLogin(user);
      cy.addTaskWithTags(task.name, [task.tag[0], task.tag2[0], task.tag3[0]]);
      cy.contains(pageElements.taskItem, task.name)
        .find(pageElements.taskRemoveButton)
        .click();
      cy.contains(pageElements.taskItem, task.name).should("not.exist");
    });
  });
});
