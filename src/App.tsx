import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import { AiFillBulb } from "react-icons/ai";
import Form from "./components/Form";
import ExpenseList from "./components/expense-tracker/components/ExpenseList";
import { useState } from "react";
import ExpenseFilter from "./components/expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./components/expense-tracker/components/ExpenseForm";

function App() {
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
