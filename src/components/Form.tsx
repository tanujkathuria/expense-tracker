import React, { useRef } from "react";

const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const person = {
    name: "",
    age: 0,
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("on submitted");
          if (nameRef.current) {
            person.name = nameRef.current.value;
            console.log(nameRef.current.value);
          }
          if (ageRef.current) {
            console.log(ageRef.current.value);
            person.age = parseInt(ageRef.current.value);
          }
          console.log(person);
        }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input id="name" ref={nameRef} type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input id="age" ref={ageRef} type="number" className="form-control" />
        </div>
        <button className="btn btn-primary">submit</button>
      </form>
    </>
  );
};

export default Form;
