sap.ui.define(['sap/ui/core/ComponentContainer'], ComponentContainer => {
  new ComponentContainer({
    name: 'ui5.todo-list',
    settings: {
      id: 'todo-list',
    },
    async: true,
  }).placeAt('content');
});
