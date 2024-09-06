import pageElements from "../../support/pageElements";

describe("Registration of new users", () => {
  beforeEach(function () {
    cy.fixture("users").then(function (users) {
      this.users = users;
    });
  });

  context("Register a new user", () => {
    it("Verify if user is created with success", function () {
      const user = this.users.create;
      const firstName = user.name.split(" ")[0];

      cy.task("removeuser", user.email);
      cy.createUser(user);

      cy.get(pageElements.welcomeMessage).should(
        "have.text",
        "Boas vindas ao Mark85, o seu gerenciador de tarefas."
      );
      cy.get(pageElements.backToLoginLink)
        .should("contain.text", "Voltar para login")
        .click();

      cy.loginUser(user);
      cy.get(pageElements.userGreeting).should(
        "contain.text",
        "Olá, " + firstName
      );
    });

    it("Verify if not possible to create a user with duplicate email", function () {
      const user = this.users.dup_email;

      cy.task("removeuser", user.email);
      cy.postUser(user);
      cy.createUser(user);
      cy.get(pageElements.errorMessage).should(
        "have.text",
        "Oops! Já existe um cadastro com e-mail informado."
      );
    });
    it("Verify if not possible to create a user with email invalid", function () {
      const user = this.users.createEmail_invalid;

      cy.createUser(user);
      cy.get(pageElements.alertError).should(
        "have.text",
        "Digite um e-mail válido"
      );
    });
  });
  context("Required fields", function () {
    it("Verify if name is required", function () {
      const user = this.users.required;

      cy.task("removeuser", user.email);
      cy.notcreateUser(user, "name");
      cy.contains("button", "Cadastrar").click();
      cy.get(pageElements.alertError).should(
        "contain.text",
        "Informe seu nome completo"
      );
    });

    it("Verify if email is required", function () {
      const user = this.users.required;

      cy.task("removeuser", user.email);
      cy.notcreateUser(user, "email");
      cy.contains("button", "Cadastrar").click();
      cy.get(pageElements.alertError).should(
        "contain.text",
        "Informe seu e-email"
      );
    });

    it("Verify if password is required", function () {
      const user = this.users.required;

      cy.task("removeuser", user.email);
      cy.notcreateUser(user, "password");
      cy.contains("button", "Cadastrar").click();
      cy.get(pageElements.alertError).should(
        "contain.text",
        "Informe uma senha com pelo menos 6 digitos"
      );
    });

    it("Verify if password connot be less than 6 digits ", function () {
      const user = this.users.required;

      cy.task("removeuser", user.email);
      cy.notcreateUser(user, "password");
      cy.get(pageElements.passwordInput).type("12345");
      cy.contains("button", "Cadastrar").click();
      cy.get(pageElements.alertError).should(
        "contain.text",
        "Informe uma senha com pelo menos 6 digitos"
      );
    });

    it("Verify if it is not possible to create a user with empty fields", function () {
      cy.emptyFields();
      cy.get(pageElements.alertError)
        .should("have.length", 3)
        .and(($errors) => {
          expect($errors.eq(0)).to.contain.text("Informe seu nome completo");
          expect($errors.eq(1)).to.contain.text("Informe seu e-email");
          expect($errors.eq(2)).to.contain.text(
            "Informe uma senha com pelo menos 6 digitos"
          );
        });
    });
  });
});
