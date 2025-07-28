'use strict';
sap.ui.define(['sap/ui/core/mvc/Controller'], Controller => {
  'use strict';

  return Controller.extend('ui5.todo.controller.App', {
    onInit() {
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
    },
  });
});
