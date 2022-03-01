import { useState, useEffect } from 'react';
import "./App.css";

function App() {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const{name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  },[formErrors])
  const validate = (values) => {
    const errors = {}
    const regex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!values.firstname){
      errors.firstname = "Fistname is required!";
    }
    if(!values.lastname){
      errors.lastname = "Lastname is required!";
    }
    if(!values.email){
      errors.email = "Email is required!";
    } else if(!regex.test(values.email)){
      errors.email = "This is not a valid email format!";
    }
    if(!values.password) {
      errors.password = "Password is required!";
    } else if(values.password.length < 4) {
      errors.password = "Password must be more than 6 characters";
    } else if(values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
  return (
    <div className='container'>
      {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="ui message success">Signed in successfully</div>
      ) : (
      <pre></pre>
      )}
      <form onSubmit={handleSubmit}>
        <h1>Login form</h1>
        <div className='ui divider'></div>
        <div className='ui form'>
          <div className='field'>
            <label>First Name</label>
            <input type="text" name='firstname' placeholder='Firstname' value={formValues.firstname} onChange={handleChange} />
          </div>
          <p>{formErrors.firstname}</p>
          <div className='field'>
            <label>Last name</label>
            <input type="text" name='lastname' placeholder='Lastname' value={formValues.lastname} onChange={handleChange} />
          </div>
          <p>{formErrors.lastname}</p>
          <div className='field'>
            <label>Email</label>
            <input type="email" name='email' placeholder='Email' value={formValues.email} onChange={handleChange} />
          </div>
          <p>{formErrors.email}</p>
          <div className='field'>
            <label>Password</label>
            <input type="password" name='password' placeholder='Password' value={formValues.password} onChange={handleChange} />
          </div>
          <p>{formErrors.password}</p>
          <button className='ui blue'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App
