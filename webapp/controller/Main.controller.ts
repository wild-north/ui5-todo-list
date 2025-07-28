sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/UIComponent",
  "sap/m/SplitApp"
], (Controller: any, JSONModel: any, UIComponent: any, _SplitApp: any) => {
  "use strict";

  const MILLISECONDS_IN_SECOND = 1000;
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;
  const DAYS_IN_WEEK = 7;

  return Controller.extend("ui5.todo.controller.Main", {
    
    onInit(): void {
      const router = UIComponent.getRouterFor(this);

      router.getRoute("main")?.attachPatternMatched(this.onRouteMatched, this);
      router.getRoute("group")?.attachPatternMatched(this.onRouteMatched, this);

      const model = this.getView().getModel("todos") as any;

      if (model) {
        model.setProperty("/filteredTodos", model.getProperty("/todos"));
        model.setProperty("/selectedGroupId", "all");
      }
    },

    onRouteMatched(event: any): void {
      const args = event.getParameter("arguments");
      const groupId = args?.groupId || "all";

      this.filterTodosByGroup(groupId);
    },

    filterTodosByGroup(groupId: string): void {
      const model = this.getView().getModel("todos") as any;
      const allTodos = model.getProperty("/todos");
      
      let filteredTodos = allTodos;
      
      switch (groupId) {
        case "all":
          filteredTodos = allTodos;
          break;
        case "active":
          filteredTodos = allTodos.filter((todo: any) => todo.status !== "done");
          break;
        case "completed":
          filteredTodos = allTodos.filter((todo: any) => todo.status === "done");
          break;
        default:
          filteredTodos = allTodos.filter((todo: any) => todo.groupId === groupId);
          break;
      }
      
      model.setProperty("/filteredTodos", filteredTodos);
      model.setProperty("/selectedGroupId", groupId);
    },

    onGroupSelect(event: any): void {
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
        } else {
          router.navTo("group", { groupId });
        }
      }
    },

    onNavBack(): void {
      const splitApp = this.byId("splitApp");

      splitApp.hideMaster();
    },

    onCreateTask(): void {
      // eslint-disable-next-line no-console
      console.log("Create task button clicked");
    },

    onSearchTodos(event: any): void {
      const query = event.getParameter("newValue");
      const model = this.getView().getModel("todos") as any;
      const allTodos = model.getProperty("/todos");
      const selectedGroupId = model.getProperty("/selectedGroupId");
      
      let filteredTodos = allTodos;
      
      switch (selectedGroupId) {
        case "all":
          filteredTodos = allTodos;
          break;
        case "active":
          filteredTodos = allTodos.filter((todo: any) => todo.status !== "done");
          break;
        case "completed":
          filteredTodos = allTodos.filter((todo: any) => todo.status === "done");
          break;
        default:
          filteredTodos = allTodos.filter((todo: any) => todo.groupId === selectedGroupId);
          break;
      }
      
      if (query) {
        filteredTodos = filteredTodos.filter((todo: any) => 
          todo.title.toLowerCase().includes(query.toLowerCase()) ||
          todo.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      model.setProperty("/filteredTodos", filteredTodos);
    },

    onTodoPress(event: any): void {
      const item = event.getSource();
      const bindingContext = item?.getBindingContext("todos");
      const todo = bindingContext?.getObject();
      
      // eslint-disable-next-line no-console
      console.log("Todo item clicked:", todo);
    },

    onToggleComplete(event: any): void {
      const item = event.getSource();
      const bindingContext = item?.getBindingContext("todos");
      const path = bindingContext?.getPath();
      const model = this.getView().getModel("todos") as any;
      const todo = bindingContext?.getObject();
      
      if (todo && path) {
        const newStatus = todo.status === "done" ? "todo" : "done";

        model.setProperty(`${path}/status`, newStatus);
        
        this.filterTodosByGroup(model.getProperty("/selectedGroupId"));
      }
    },

    formatCompleted(status: string): boolean {
      return status === "done";
    },

    formatTitleClass(status: string): string {
      return status === "done" ? "todoCompletedTitle" : "";
    },

    formatStatus(status: string): string {
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

    formatStatusState(status: string): string {
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

    formatDate(dateString: string): string {
      if (!dateString) return "";
      
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY));
      
      if (diffDays === 1) {
        return "Yesterday";
      }

      if (diffDays < DAYS_IN_WEEK) {
        return `${diffDays} days ago`;
      }

      return date.toLocaleDateString();
    }
  });
}); 