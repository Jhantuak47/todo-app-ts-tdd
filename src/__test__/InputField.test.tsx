import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import InputField from "../components/InputField";
import App from "../App";
import { act } from "react-dom/test-utils";

afterEach(cleanup);
describe("InputField", () => {
  const event = UserEvent.setup();

  test("renders field with single todos", async () => {
    render(<App />);
    const inputElem = screen.getByRole("textbox");
    fireEvent.change(inputElem, { target: { value: "Go to market" } });

    expect(inputElem).toHaveValue("Go to market");

    const goBtn = screen.getByRole("button", { name: /go/i });
    event.click(goBtn);

    const todoList = await screen.findByText(
      "Go to market",
      {},
      { timeout: 1000 }
    );
    expect(todoList).toBeInTheDocument();
  });

  test("renders filed with multiple todos", async () => {
    render(<App />);

    const event = UserEvent.setup();
    const todoTask = ["Go to market", "Practice maths", "Watching movies"];
    const input = screen.getByRole("textbox");
    const goBtn = screen.getByRole("button", { name: /go/i });

    /**
     * First approach just keeping one after another
     */
    // fireEvent.change(input, {
    //   target: {
    //     value: todoTask[0],
    //   },
    // });
    // await event.click(goBtn);

    // fireEvent.change(input, {
    //   target: {
    //     value: todoTask[1],
    //   },
    // });
    // await event.click(goBtn);

    // fireEvent.change(input, {
    //   target: {
    //     value: todoTask[2],
    //   },
    // });
    // await event.click(goBtn);

    // keep the line of code inside act which can modify the state on a component.
    await act(async () => {
      for (let task of todoTask) {
        await fireEvent.change(input, {
          target: {
            value: task,
          },
        });
        await event.click(goBtn);
      }
    });

    /**
     * Either get all the list items or get the ul and check for the childrens.
     * const todoLists = screen.getAllByRole("listitem");
     * expect(todoLists).toHaveLength(todoTask.length);
     *
     */
    const todoLists = screen.getByRole("list");
    expect(todoLists.children).toHaveLength(todoTask.length);
  });
});
