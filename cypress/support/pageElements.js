const pageElements = {
  signupUser: 'a[href="/signup"]',
  nameInput: '[data-testid="input-container"] input[name="name"]',
  emailInput: '[data-testid="input-container"] input[name="email"]',
  passwordInput: '[data-testid="input-container"] input[name="password"]',
  welcomeMessage: ".notice.success p",
  errorMessage: ".notice.error p",
  backToLoginLink: 'a[href="/"]',
  userGreeting: "div > div > small",
  alertError: ".alert .alert-error",
  buttonAdd: 'a[href="/create"] button',
  nameTask: 'input[placeholder="Nome da tarefa"]',
  tagsInput: 'input[name="tags"]',
  taskItem: ".task-item",
  itemToggle: ".task-item .item-toggle",
  itemSelected: ".task-item .item-toggle-selected",
  taskTodo: ".task-item .task-todo",
  taskDone: ".task-item .task-done",
  tags: ".task-item .tags span",
  taskRemoveButton: ".task-remove",
};

export default pageElements;
