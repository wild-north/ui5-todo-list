import SplitApp from "sap/m/SplitApp";
import Event from "sap/ui/base/Event";
import Control from "sap/ui/core/Control";
import Controller from "sap/ui/core/mvc/Controller";
import Router from "sap/ui/core/routing/Router";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;

export default class MainController extends Controller {
  
  public onInit(): void {
    const router = (this.getOwnerComponent() as UIComponent)?.getRouter() as Router;

    router.getRoute("main")?.attachPatternMatched(this.onRouteMatched, this);
    router.getRoute("group")?.attachPatternMatched(this.onRouteMatched, this);

    const model = this.getView()?.getModel("todos") as JSONModel;

    if (model) {
      model.setProperty("/filteredTodos", model.getProperty("/todos"));
      model.setProperty("/selectedGroupId", "all");
    }
  }

  private onRouteMatched(event: Event): void {
    const args = (event as any).getParameter("arguments");
    const groupId = args?.groupId || "all";

    this.filterTodosByGroup(groupId);
  }

  private filterTodosByGroup(groupId: string): void {
    const model = this.getView()?.getModel("todos") as JSONModel;
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
  }

  public onGroupSelect(event: Event): void {
    const listItem = (event as any).getParameter("listItem");
    const customData = listItem?.getCustomData();
    let groupId = "all";
    
    if (customData && customData.length > 0) {
      groupId = customData[0].getValue();
    }
    
    if (groupId) {
      const router = (this.getOwnerComponent() as UIComponent)?.getRouter() as Router;

      if (groupId === "all") {
        router.navTo("main");
      } else {
        router.navTo("group", { groupId });
      }
    }
  }

  public onNavBack(): void {
    const splitApp = this.byId("splitApp") as SplitApp;

    splitApp?.hideMaster();
  }

  public onCreateTask(): void {
    // eslint-disable-next-line no-console
    console.log("Create task button clicked");
  }

  public onSearchTodos(event: Event): void {
    const query = (event as any).getParameter("newValue") as string;
    const model = this.getView()?.getModel("todos") as JSONModel;
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
  }

  public onTodoPress(event: Event): void {
    const item = event.getSource() as Control;
    const bindingContext = item?.getBindingContext("todos");
    const todo = bindingContext?.getObject();
    
    // eslint-disable-next-line no-console
    console.log("Todo item clicked:", todo);
  }

  public onToggleComplete(event: Event): void {
    const item = event.getSource() as Control;
    const bindingContext = item?.getBindingContext("todos");
    const path = bindingContext?.getPath();
    const model = this.getView()?.getModel("todos") as JSONModel;
    const todo = bindingContext?.getObject() as any;
    
    if (todo && path) {
      const newStatus = todo.status === "done" ? "todo" : "done";

      model.setProperty(`${path}/status`, newStatus);
      
      this.filterTodosByGroup(model.getProperty("/selectedGroupId"));
    }
  }

  public formatCompleted(status: string): boolean {
    return status === "done";
  }

  public formatTitleClass(status: string): string {
    return status === "done" ? "todoCompletedTitle" : "";
  }

  public formatStatus(status: string): string {
    const i18nModel = this.getView()?.getModel("i18n");
    
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
  }

  public formatStatusState(status: string): string {
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
  }

  public formatDate(dateString: string): string {
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
} 