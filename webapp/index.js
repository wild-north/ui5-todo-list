sap.ui.define(['sap/ui/core/ComponentContainer'], ComponentContainer => {
  new ComponentContainer({
    name: 'ui5.todo',
    settings: {
      id: 'todo',
    },
    async: true,
  }).placeAt('content');
});
