import Controller from "sap/ui/core/mvc/Controller";
import Component from "ui5/todo/Component";

export default class AppController extends Controller {
  
  public onInit(): void {
    this.getView()?.addStyleClass((this.getOwnerComponent() as Component).getContentDensityClass());
  }
} 