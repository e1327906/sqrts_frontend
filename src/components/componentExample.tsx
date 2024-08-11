// 1. List your imports here
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; // import bootstrap components where necessary
// import { <insert api variable name here> } from '../../services/api';


// 2. Define the props type if your component needs to receive props
// interface Props {
//   // Example prop: message of type string
//   message: string;
// }


// 3a. Functional component using arrow function syntax with Props type
// const ExampleComponent: React.FC<Props> = ({ message }) => {

// Or 3b. functional component using arrow function syntax without props
const ExampleComponent: React.FC = () => {
  // useState hook to manage local state, initialState can be any type, string/number/boolean/etc
  // In this example, it's the username and password state initialized to an empty string
  // and count state initialized to 0
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [count, setCount] = useState<number>(0);


  // 4. Here you can add functions if necessary
  // const checkPasswordStrength = (password: string) => {
  //   // Define the criteria for a strong password
  //   const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   // Test the password against the criteria
  //   return strongPasswordRegex.test(password);
  // };


  // 5. Add event listeners if necessary
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Do something
    // if (!checkPasswordStrength(password)) {
    //   setPasswordError('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
    //   return;
    // }
  };

  // 6. useEffect hook to perform side effects in the component
  // In this example, it's used to update the document title on count
  useEffect(() => {
    // This code runs after every render when count changes
    document.title = `You clicked ${count} times`;

    // Optional cleanup mechanism for effects
    return () => {
      // Cleanup code here, runs before the component is removed from the UI
      // and before re-running the effect due to a subsequent render
    };
  }, [count]); // Dependencies array, effect runs when these values change

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '330px' }}>
        <h3 className="text-center mb-3">Create an account</h3>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {/* {usernameError && <div className="text-danger">{usernameError}</div>} */}
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* {passwordError && <div className="text-danger">{passwordError}</div>} */}
        </Form.Group>

        <Button variant="alert" className="w-100 mb-3" onClick={() => setCount(count + 1)}>
          Increase Count
        </Button>
        
        <Button variant="primary" type="submit" className="w-100 mb-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default ExampleComponent;