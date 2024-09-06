Cypress.Commands.add("postUser", (user) => {
  cy.api({
    url: `${Cypress.env("apiUrl")}/users`,
    method: "POST",
    body: user,
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("postSession", (user) => {
  cy.api({
    url: `${Cypress.env("apiUrl")}/sessions`,
    method: "POST",
    body: { email: user.email, password: user.password },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("postTasks", (task, token) => {
  cy.api({
    url: `${Cypress.env("apiUrl")}/tasks`,
    method: "POST",
    body: task,
    headers: {
      authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("getTasks", (token) => {
  cy.api({
    url: `${Cypress.env("apiUrl")}/tasks`,
    method: "GET",
    headers: {
      authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("getUniqueTask", (taskId, token) => {
  cy.api({
    url: `${Cypress.env("apiUrl")}/tasks/${taskId}`,
    method: "GET",
    headers: {
      authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("deleteTask", (taskId, token) => {
  cy.api({
    url: `${Cypress.env("apiUrl")}/tasks/${taskId}`,
    method: "DELETE",
    headers: {
      authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("putTask", (taskId, token) => {
  cy.api({
    url: `${Cypress.env("apiUrl")}/tasks/${taskId}/done`,
    method: "PUT",
    headers: {
      authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});
