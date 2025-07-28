import Controller from "sap/ui/core/mvc/Controller";
export default class AppController extends Controller {
    onInit() {
        this.getView()?.addStyleClass(this.getOwnerComponent().getContentDensityClass());
    }
}
