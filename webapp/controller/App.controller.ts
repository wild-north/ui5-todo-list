sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller: any) => {
  "use strict";

  return Controller.extend("ui5.todo.controller.App", {
    onInit(): void {
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
    }
  });
}); 