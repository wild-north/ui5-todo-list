'use strict';
sap.ui.define(
  ['sap/ui/core/UIComponent', 'sap/ui/model/json/JSONModel', 'sap/ui/Device'],
  (UIComponent, JSONModel, Device) => {
    'use strict';
    return UIComponent.extend('ui5.todo.Component', {
      metadata: {
        interfaces: ['sap.ui.core.IAsyncContentCreation'],
        manifest: 'json',
      },
      init() {
        UIComponent.prototype.init.apply(this, arguments);
        const todoData = {
          groups: [
            {
              id: 'default',
              title: 'My Tasks',
              color: 'blue',
            },
          ],
          todos: [
            {
              id: '1',
              title: 'Welcome to Todo List',
              description: 'This is your first todo item. Click to edit or create new ones!',
              status: 'todo',
              groupId: 'default',
              createdAt: new Date().toISOString(),
              dueDate: null,
            },
          ],
        };
        const todoModel = new JSONModel(todoData);
        this.setModel(todoModel, 'todos');
        const deviceModel = new JSONModel(Device);
        deviceModel.setDefaultBindingMode('OneWay');
        this.setModel(deviceModel, 'device');
        this.getRouter().initialize();
      },
      getContentDensityClass() {
        return Device.support.touch ? 'sapUiSizeCozy' : 'sapUiSizeCompact';
      },
    });
  }
);
