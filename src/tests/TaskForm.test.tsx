import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskForm from "../components/TaskForm";
import { addTask } from "../store/slices/taskSlice";
import { ChakraProvider } from "@chakra-ui/react";

const mockStore = configureStore([]);
jest.mock("../store/slices/taskSlice", () => ({
  addTask: jest.fn(),
}));

describe("TaskForm", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it("renders the task form correctly", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskForm />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Task Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task Description")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("should update form fields when typed into", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskForm />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Task Title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Task Description"), {
      target: { value: "Test Description" },
    });

    expect(screen.getByPlaceholderText("Task Title")).toHaveValue("Test Task");
    expect(screen.getByPlaceholderText("Task Description")).toHaveValue(
      "Test Description"
    );
  });

  it("should dispatch addTask when form is submitted", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskForm />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Task Title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Task Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(store.dispatch).toHaveBeenCalled();
    expect(addTask).toHaveBeenCalled();
  });

  it("should clear the form after submitting", () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TaskForm />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Task Title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Task Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    expect(screen.getByPlaceholderText("Task Title")).toHaveValue("");
    expect(screen.getByPlaceholderText("Task Description")).toHaveValue("");
  });
});
