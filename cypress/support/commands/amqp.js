Cypress.Commands.add("purgeQueueMessage", () => {
  cy.api({
    url: "https://toad.rmq.cloudamqp.com/api/queues/bjsvzjig/tasks/contents",
    method: "Delete",
    body: {
      vhost: "bjsvzjig",
      name: "tasks",
      mode: "purge",
    },
    headers: {
      authorization:
        "Basic YmpzdnpqaWc6NDZwRmhvUU92VFFyWTVRT1dmS18yM1FjOG1YQlQ5cFY=",
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("getMessageQueue", () => {
  cy.api({
    url: "https://toad.rmq.cloudamqp.com/api/queues/bjsvzjig/tasks/get",
    method: "POST",
    body: {
      vhost: "bjsvzjig",
      name: "tasks",
      truncate: "50000",
      ackmode: "ack_requeue_true",
      encoding: "auto",
      count: "1",
    },
    headers: {
      authorization:
        "Basic YmpzdnpqaWc6NDZwRmhvUU92VFFyWTVRT1dmS18yM1FjOG1YQlQ5cFY=",
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});
