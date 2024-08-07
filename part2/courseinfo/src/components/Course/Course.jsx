import React from 'react';

const Total = (parts) => {
    const partsArray = parts.parts;
    const total = partsArray.reduce((accumulator, part) => accumulator + part.exercises, 0);
    return (
      <div>
        <strong>Total of {total} exercises.</strong>
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
        <Total parts={parts} />
      </div>
    )
  }
  
  
  const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  }

  export default Course