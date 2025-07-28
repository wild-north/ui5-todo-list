"use strict";
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/m/SplitApp"
], (Controller, JSONModel, UIComponent, SplitApp) => {
    "use strict";
    return Controller.extend("ui5.todo.controller.Main", {
        onInit() {
            const router = UIComponent.getRouterFor(this);
            router.getRoute("main")?.attachPatternMatched(this.onRouteMatched, this);
            router.getRoute("group")?.attachPatternMatched(this.onRouteMatched, this);
            const model = this.getView().getModel("todos");
            if (model) {
                model.setProperty("/filteredTodos", model.getProperty("/todos"));
                model.setProperty("/selectedGroupId", "all");
            }
        },
        onRouteMatched(event) {
            const args = event.getParameter("arguments");
            const groupId = args?.groupId || "all";
            this.filterTodosByGroup(groupId);
        },
        filterTodosByGroup(groupId) {
            const model = this.getView().getModel("todos");
            const allTodos = model.getProperty("/todos");
            let filteredTodos = allTodos;
            switch (groupId) {
                case "all":
                    filteredTodos = allTodos;
                    break;
                case "active":
                    filteredTodos = allTodos.filter((todo) => todo.status !== "done");
                    break;
                case "completed":
                    filteredTodos = allTodos.filter((todo) => todo.status === "done");
                    break;
                default:
                    filteredTodos = allTodos.filter((todo) => todo.groupId === groupId);
                    break;
            }
            model.setProperty("/filteredTodos", filteredTodos);
            model.setProperty("/selectedGroupId", groupId);
        },
        onGroupSelect(event) {
            const listItem = event.getParameter("listItem");
            const customData = listItem?.getCustomData();
            let groupId = "all";
            if (customData && customData.length > 0) {
                groupId = customData[0].getValue();
            }
            if (groupId) {
                const router = UIComponent.getRouterFor(this);
                if (groupId === "all") {
                    router.navTo("main");
                }
                else {
                    router.navTo("group", { groupId });
                }
            }
        },
        onNavBack() {
            const splitApp = this.byId("splitApp");
            splitApp.hideMaster();
        },
        onCreateTask() {
            console.log("Create task button clicked");
        },
        onSearchTodos(event) {
            const query = event.getParameter("newValue");
            const model = this.getView().getModel("todos");
            const allTodos = model.getProperty("/todos");
            const selectedGroupId = model.getProperty("/selectedGroupId");
            let filteredTodos = allTodos;
            switch (selectedGroupId) {
                case "all":
                    filteredTodos = allTodos;
                    break;
                case "active":
                    filteredTodos = allTodos.filter((todo) => todo.status !== "done");
                    break;
                case "completed":
                    filteredTodos = allTodos.filter((todo) => todo.status === "done");
                    break;
                default:
                    filteredTodos = allTodos.filter((todo) => todo.groupId === selectedGroupId);
                    break;
            }
            if (query) {
                filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()) ||
                    todo.description.toLowerCase().includes(query.toLowerCase()));
            }
            model.setProperty("/filteredTodos", filteredTodos);
        },
        onTodoPress(event) {
            const item = event.getSource();
            const bindingContext = item?.getBindingContext("todos");
            const todo = bindingContext?.getObject();
            console.log("Todo item clicked:", todo);
        },
        onToggleComplete(event) {
            const item = event.getSource();
            const bindingContext = item?.getBindingContext("todos");
            const path = bindingContext?.getPath();
            const model = this.getView().getModel("todos");
            const todo = bindingContext?.getObject();
            if (todo && path) {
                const newStatus = todo.status === "done" ? "todo" : "done";
                model.setProperty(path + "/status", newStatus);
                this.filterTodosByGroup(model.getProperty("/selectedGroupId"));
            }
        },
        formatCompleted(status) {
            return status === "done";
        },
        formatTitleClass(status) {
            return status === "done" ? "todoCompletedTitle" : "";
        },
        formatStatus(status) {
            const i18nModel = this.getView().getModel("i18n");
            switch (status) {
                case "todo":
                    return i18nModel?.getProperty("todoStatusTodo") || "To Do";
                case "inProgress":
                    return i18nModel?.getProperty("todoStatusInProgress") || "In Progress";
                case "done":
                    return i18nModel?.getProperty("todoStatusDone") || "Done";
                default:
                    return status;
            }
        },
        formatStatusState(status) {
            switch (status) {
                case "todo":
                    return "None";
                case "inProgress":
                    return "Warning";
                case "done":
                    return "Success";
                default:
                    return "None";
            }
        },
        formatDate(dateString) {
            if (!dateString)
                return "";
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - date.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                return "Yesterday";
            }
            else if (diffDays < 7) {
                return `${diffDays} days ago`;
            }
            else {
                return date.toLocaleDateString();
            }
        }
    });
});
