sap.ui.define(
  ['sap/ui/core/UIComponent', 'sap/ui/model/json/JSONModel'],
  (UIComponent, JSONModel) =>
    UIComponent.extend('ui5.walkthrough.Component', {
      metadata: {
        interfaces: ['sap.ui.core.IAsyncContentCreation'],
        manifest: 'json',
      },

      init(...args) {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, args);

        // set data model
        const oData = {
          recipient: {
            name: 'World',
          },
        };
        const oModel = new JSONModel(oData);
        this.setModel(oModel);
      },
    })
);
