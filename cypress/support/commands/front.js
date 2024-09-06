import pageElements from "../../support/pageElements";

Cypress.Commands.add("createUser", (user) => {
  cy.visit("/");
  cy.get(pageElements.signupUser).click();
  cy.get(pageElements.nameInput).type(user.name);
  cy.get(pageElements.emailInput).type(user.email);
  cy.get(pageElements.passwordInput).type(user.password);
  cy.contains("button", "Cadastrar").click();
});

Cypress.Commands.add("loginUser", (user) => {
  cy.get(pageElements.emailInput).type(user.email);
  cy.get(pageElements.passwordInput).type(user.password);
  cy.contains("button", "Entrar").click();
});

Cypress.Commands.add("notcreateUser", (user, fieldToDelete) => {
  cy.visit("/");
  cy.get(pageElements.signupUser).click();

  if (fieldToDelete !== "name") {
    cy.get(pageElements.nameInput).type(user.name);
  }
  if (fieldToDelete !== "email") {
    cy.get(pageElements.emailInput).type(user.email);
  }
  if (fieldToDelete !== "password") {
    cy.get(pageElements.passwordInput).type(user.password);
  }
});
Cypress.Commands.add("loginInvalid", (user, fieldToDelete) => {
  cy.visit("/");

  if (fieldToDelete !== "email") {
    cy.get(pageElements.emailInput).type(user.email);
  }
  if (fieldToDelete !== "password") {
    cy.get(pageElements.passwordInput).type(user.password);
  }
});
Cypress.Commands.add("emptyFields", () => {
  cy.visit("/");
  cy.get(pageElements.signupUser).click();
  cy.contains("button", "Cadastrar").click();
});
Cypress.Commands.add("addTaskWithTags", (taskName, tags = []) => {
  cy.get(pageElements.buttonAdd).should("be.visible").click();
  cy.get(pageElements.nameTask).type(taskName);

  tags.forEach((tag) => {
    cy.get(pageElements.tagsInput).type(`${tag}{enter}`);
  });

  cy.contains("button", "Cadastrar").click();
});
Cypress.Commands.add("verifyTaskInList", (taskName, tags = []) => {
  cy.get(pageElements.taskItem).should("be.visible");
  cy.get(pageElements.taskTodo).should("contain.text", taskName);

  tags.forEach((tag) => {
    cy.get(pageElements.tags).should("contain.text", tag);
  });

  // If number of tags is zero, ensure no tags are present
  if (tags.length === 0) {
    cy.get(pageElements.tags).should("not.exist");
  }
});
Cypress.Commands.add("setupUserAndLogin", (user) => {
  cy.task("removeuser", user.email);
  cy.postUser(user);
  cy.visit("/");
  cy.loginUser(user);
});
