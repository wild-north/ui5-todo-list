sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
  ],
  (Controller, JSONModel, Filter, FilterOperator) => {
    'use strict';

    return Controller.extend('ui5.walkthrough.controller.InvoiceList', {
      onInit: function () {
        const oViewModel = new JSONModel({
          currency: 'EUR',
        });

        this.getView().setModel(oViewModel, 'view');
      },

      onFilterInvoices: function (oEvent) {
        const aFilter = [];
        const sQuery = oEvent.getParameter('query');

        if (sQuery) {
          aFilter.push(new Filter('ProductName', FilterOperator.Contains, sQuery));
        }

        const oList = this.byId('invoiceList');

        oList.getBinding('items').filter(aFilter);
      },

      onPress: function (oEvent) {
        const oItem = oEvent.getSource();
        const oRouter = this.getOwnerComponent().getRouter();

        const invoicePath = window.encodeURIComponent(
          oItem.getBindingContext('invoice').getPath().substring(1)
        );

        oRouter.navTo('detail', {
          invoicePath,
        });
      },
    });
  }
);
