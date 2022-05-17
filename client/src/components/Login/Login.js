import React from 'react';
import './Login.css';


import { useNavigate } from 'react-router-dom';
export default function Login() {

const navigate = useNavigate();




const errorMessage = (event, message) => {
  event.preventDefault();
  alert(message);
  return false;
}

const checkEmail = (value) => {

  var valid = true;

  if (value.indexOf('@') === -1) { valid = false; }
  else {
    var parts = value.split('@');
    var domain = parts[1];
    if (domain.indexOf('.') === -1) { valid = false; }
    else {
      var domainParts = domain.split('.');
      var ext = domainParts[1];
      if (ext.length > 4 || ext.length < 2) { valid = false; }
    }
  }
  return valid;
}

const signIn = (event) => {
  event.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  const userCredintials = { email: email, password: password };

  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredintials),
  })
    .then(response => response.json())
    .then(data => {
      if (data.authenticated) {
      navigate('/OrgPage',{state:data.user});
      } else {
        alert(data.errorMessage)
      }
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });


  let isValid = checkEmail(email)

  if (!email || !password) {
    errorMessage(event, "Please insert email and password");
  } else if (!isValid) {
    errorMessage(event, "Please insert valid email");
  }

}

const unmaskPassword = () => {
  let password = document.querySelector("#password");
  if (password['getAttribute']('type') === "password") {
    password['setAttribute']('type', 'text');
  } else {
    password['setAttribute']('type', 'password');
  }
}

return (
  <>
    <div className="signIn">
      <h1>Log In Form</h1>
      <form className="contact-form" onSubmit={signIn}>
        <p>*E-mail :</p>
        <input id="email" type="email" name="email" placeholder="Enter E-mail" />
        <p>*Password :</p>
        <input id="password" type="password" name="password" placeholder="Enter password" />
        <p className="toggle_password" onClick={unmaskPassword}>Show/Hide Password</p>
        <input className='signin-btn' type="submit" value="Sign In" />
      </form >
    </div >
  </>
)
}