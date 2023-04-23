import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import { AiFillBulb } from "react-icons/ai";
import Form from "./components/Form";
import ExpenseList from "./components/expense-tracker/components/ExpenseList";
import { useEffect, useState } from "react";
import ExpenseFilter from "./components/expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./components/expense-tracker/components/ExpenseForm";
import Message from "./Message";
import userService, { User } from "./services/userService";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();
  // let items: string[] = ["New York", "London", "Tokyo"];

  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  //   // setSelectedIndex(index);
  // };

  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 20, category: "Groceries" },
    { id: 3, description: "ccc", amount: 30, category: "Electronics" },
    { id: 4, description: "ddd", amount: 40, category: "Entertainment" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category == selectedCategory)
    : expenses;

  if (expenses.length == 0) return null;

  const deleteUser = (user: User): void => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id != user.id));
    userService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  function addUser(): void {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Tanuj" };
    setUsers([newUser, ...users]);
    userService
      .createUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  }

  function updateUser(user: User): void {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    userService.updateUser(user).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  }

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        ></ExpenseForm>
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        ></ExpenseFilter>
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      ></ExpenseList>
      <hr />
      <div className="m3">
        <p>Here we are going to display some apiClient capabilities</p>
      </div>

      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}{" "}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-outline-danger"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* <Form></Form> */}
      {/* <AiFillBulb color="red"></AiFillBulb> */}
      {/* <Alert>
        <span>Hello world</span>
      </Alert> */}
      {/* <ListGroup items={items} name="Cities" onSelectItem={handleSelectItem} /> */}
    </div>
  );
}

export default App;
