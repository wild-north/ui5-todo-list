sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
 ], (Controller, MessageToast, JSONModel, ResourceModel) => {
    "use strict";
 
    return Controller.extend("ui5.todo-list.controller.App", {
      onInit() {
         const oModel = new JSONModel({
            recipient: {
               name: "World"
            }
         });
         this.getView().setModel(oModel);

         const i18nModel = new ResourceModel({
            bundleName: "ui5.todo-list.i18n.i18n"
         });

         this.getView().setModel(i18nModel, "i18n");
      },
      onShowHello() {
         MessageToast.show("Hello World");
      }
    });
 });