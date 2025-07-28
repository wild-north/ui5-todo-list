import UIComponent from "sap/ui/core/UIComponent";
import Device from "sap/ui/Device";
import JSONModel from "sap/ui/model/json/JSONModel";
export default class Component extends UIComponent {
    static metadata = {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        manifest: "json"
    };
    init() {
        super.init();
        const todoData = {
            groups: [
                {
                    id: "default",
                    title: "My Tasks",
                    color: "blue"
                }
            ],
            todos: [
                {
                    id: "1",
                    title: "Welcome to Todo List",
                    description: "This is your first todo item. Click to edit or create new ones!",
                    status: "todo",
                    groupId: "default",
                    createdAt: new Date().toISOString(),
                    dueDate: null
                }
            ]
        };
        const todoModel = new JSONModel(todoData);
        this.setModel(todoModel, "todos");
        const deviceModel = new JSONModel(Device);
        deviceModel.setDefaultBindingMode("OneWay");
        this.setModel(deviceModel, "device");
        this.getRouter().initialize();
    }
    getContentDensityClass() {
        return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
    }
}
