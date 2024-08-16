import { render, screen, fireEvent, within } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskList from "../components/TaskList";
import {
  deleteTask,
  editTask,
  toggleTaskCompletion,
} from "../store/slices/taskSlice";
import { ChakraProvider } from "@chakra-ui/react";

const mockStore = configureStore([]);

jest.mock("../store/slices/taskSlice", () => ({
  deleteTask: jest.fn(),
  editTask: jest.fn(),
  toggleTaskCompletion: jest.fn(),
  selectFilteredAndSortedTasks: jest.fn(() => [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      priority: "High",
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ]),
}));

describe("TaskList", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it("renders tasks correctly", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskList />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Priority: High")).toBeInTheDocument();
  });

  it("should dispatch toggleTaskCompletion when checkbox is clicked", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskList />
        </ChakraProvider>
      </Provider>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalled();
    expect(toggleTaskCompletion).toHaveBeenCalledWith("1");
  });

  it("should open edit mode when Edit button is clicked", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskList />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByPlaceholderText("Edit Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Edit Description")).toBeInTheDocument();
  });

  it("should dispatch editTask when Save button is clicked after editing", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskList />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByPlaceholderText("Edit Title"), {
      target: { value: "Edited Task" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(store.dispatch).toHaveBeenCalled();
    expect(editTask).toHaveBeenCalled();
  });

  it("should open the delete confirmation dialog when Delete button is clicked", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskList />
        </ChakraProvider>
      </Provider>
    );
    
    fireEvent.click(screen.getByText("Delete"));

    expect(
      screen.getByText((content, element) =>
        content.includes("delete this task")
      )
    ).toBeInTheDocument();
  });

  it("should dispatch deleteTask when task is confirmed for deletion", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskList />
        </ChakraProvider>
      </Provider>
    );

    // Click the initial "Delete" button to open the confirmation dialog
    fireEvent.click(screen.getByText("Delete"));

    // Locate the dialog then target the delete button within the dialog
    const dialog = screen.getByRole("alertdialog");
    const confirmDeleteButton = within(dialog).getByText("Delete");

    // Click the delete button in the dialog
    fireEvent.click(confirmDeleteButton);

    expect(store.dispatch).toHaveBeenCalled();
    expect(deleteTask).toHaveBeenCalledWith("1");
  });
});
