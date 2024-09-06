import pageElements from "../../support/pageElements";

describe("Login in the system", () => {
  beforeEach(function () {
    cy.fixture("users").then(function (users) {
      this.users = users;
    });
  });

  context("Login", () => {
    it("Verify if login is success", function () {
      const userLogin = this.users.login;
      const firstName = userLogin.name.split(" ")[0];

      cy.task("removeuser", userLogin.email);

      cy.postUser(userLogin);
      cy.visit("/");

      cy.loginUser(userLogin);
      cy.get(pageElements.userGreeting).should(
        "contain.text",
        "Olá, " + firstName
      );
    });

    it("Verify if not possible to do login with email not registered", function () {
      const userEmailError = this.users.email_404;
      const userLogin = this.users.login;

      cy.task("removeuser", userLogin.email);
      cy.postUser(userLogin);
      cy.visit("/");
      cy.loginUser(userEmailError);
      cy.get(pageElements.errorMessage).should(
        "have.text",
        "Ocorreu um erro ao fazer login, verifique suas credenciais."
      );
    });
    it("Verify if not possible to do login with password invalid", function () {
      const userPassError = this.users.inv_pass;
      const userLogin = this.users.login;

      cy.task("removeuser", userLogin.email);
      cy.postUser(userLogin);
      cy.visit("/");
      cy.loginUser(userPassError);
      cy.get(pageElements.errorMessage).should(
        "have.text",
        "Ocorreu um erro ao fazer login, verifique suas credenciais."
      );
    });
    it("Verify if not possible to do login with email invalid", function () {
      const userEmailError = this.users.email_invalid;
      cy.visit("/");
      cy.loginUser(userEmailError);
      cy.get(pageElements.alertError).should(
        "have.text",
        "Digite um e-mail válido"
      );
    });
  });
  context("Required fields", function () {
    it("Verify if email is required", function () {
      const user = this.users.required;

      cy.task("removeuser", user.email);
      cy.postUser(user);
      cy.visit("/");
      cy.loginInvalid(user, "email");
      cy.contains("button", "Entrar").click();
      cy.get(pageElements.alertError).should(
        "contain.text",
        "Informe seu e-mail"
      );
    });

    it("Verify if password is required", function () {
      const user = this.users.required;

      cy.task("removeuser", user.email);
      cy.postUser(user);
      cy.visit("/");
      cy.loginInvalid(user, "password");
      cy.contains("button", "Entrar").click();
      cy.get(pageElements.alertError).should(
        "contain.text",
        "Informe sua senha"
      );
    });

    it("Verify if it is not possible to bo login with empty fields", function () {
      cy.visit("/");
      cy.contains("button", "Entrar").click();
      cy.get(pageElements.alertError)
        .should("have.length", 2)
        .and(($errors) => {
          expect($errors.eq(0)).to.contain.text("Informe seu e-mail");
          expect($errors.eq(1)).to.contain.text("Informe sua senha");
        });
    });
  });
});
