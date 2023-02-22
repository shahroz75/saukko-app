// importing react packages
<<<<<<< HEAD
/*import React, { useRef } from "react";*/
import { useState } from "react";
/*import { useNavigate } from "react-router-dom";*/
=======
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 5be051f79fa770894dc780aad6d9de17ace04406

// import axios
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

<<<<<<< HEAD
const RegisterPage = () => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  /*const navigate = useNavigate();*/
=======
// form email and password validators
import * as EmailValidator from "email-validator";
import { passwordVal } from "../../utils/PasswordValidate";

const RegisterPage = () => {
  /*const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [passwordConfirm, setPasswordConfirm] = useState(""),
    [buttonDisabled, setButtonDisabled] = useState();
>>>>>>> 5be051f79fa770894dc780aad6d9de17ace04406

  // stores form input info
  const formRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    passwordConfirmRef = useRef();

  // change page
  // const navigate = useNavigate();

  // processes the registration after fields have been filled and the "register" button has been pressed
  const processRegistration = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    // validate inputs
    console.log(EmailValidator.validate(email));
    console.log(passwordVal.validate(password));
    console.log(passwordVal.validate(passwordConfirm));

    // check if passwords match
    if (password === passwordConfirm) {
      // sending data from form to the backend
      axios
        .post("/register", {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      console.log("Salasanat eivät ole samoja.");
    }
  };*/

  // enable login button style if fields are filled

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState();

  const navigate = useNavigate();

  const processRegistration = async (e) => {
<<<<<<< HEAD
    e.preventDefault();

    try {
      const registerData = {
=======
    // e.preventDefault();
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
>>>>>>> 5be051f79fa770894dc780aad6d9de17ace04406
        email,
        password,
        passwordVerify,
      };

      axios
        .post("http://localhost:5000/auth/", registerData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(email, password, passwordVerify);
    } catch (err) {
      console.error(err);
    }
  };

  // button styling/CSS
  const buttonStyleDisabled = {
      color: "var(--saukko-main-white)",
      border: "var(--link-disabled)",
      background: "var(--link-disabled)",
    },
    buttonStyleEnabled = {
      color: "var(--saukko-main-white)",
      border: "var(--saukko-main-black)",
      background: "var(--saukko-main-black)",
    };

  useEffect(() => {
    setButtonDisabled(
      ![email, password, confirmPassword].every((input) => input.length > 0)
    );
  }, [email, password, confirmPassword]);

  return (
    <main className="registerPage__wrapper">
      <WavesHeader title="Saukko" fill="#9fc9eb" />
      <section className="registerPage__container">
        <h2>Rekisteröidy</h2>

        <form onSubmit={processRegistration}>
          <section className="registerPage__container--form-text">
            <label htmlFor="">Sähköposti *</label>
            <input
              // ref={emailRef}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Kirjoita sähköpostiosoitteesi."
            />
            <label htmlFor="">Salasana *</label>
            <input
              // ref={passwordRef}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Valitse salasanasi."
            />
            <input
<<<<<<< HEAD
              value={passwordVerify}
              type="password"
              onChange={(e) => setPasswordVerify(e.target.value)}
              placeholder="Kirjoita salasana uudelleen."
            />
            <p>
              Jos sinulla on jo tili <a href="/login">Kirjaudu sisään</a>
            </p>
          </section>
          <section className="registerPage__form--bottom">
            <Button style={buttonStyle} type="submit" text="Luo " />
          </section>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;

/*return (
    <main className="registerPage__wrapper">
      <WavesHeader />
      <section className="registerPage__container">
        <h2>Rekisteröidy</h2>
        <form ref={formRef} onSubmit={processRegistration}>
          <section className="registerPage__container--form-text">
            <label htmlFor="">Sähköposti *</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Kirjoita sähköpostiosoitteesi."
            />
            <label htmlFor="">Salasana *</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Valitse salasanasi."
            />
            <input
              ref={passwordConfirmRef}
=======
              // ref={passwordConfirmRef}
>>>>>>> 5be051f79fa770894dc780aad6d9de17ace04406
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Kirjoita salasana uudelleen."
            />
            <p>
              Jos sinulla on jo tili <a href="/login">Kirjaudu sisään</a>
            </p>
          </section>
        </form>
      </section>
      <section className="registerPage__form--bottom">
        <Button
          style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
          onClick={() =>
            buttonDisabled
              ? console.log("button disabled")
              : processRegistration()
          }
          type="submit"
          text="Luo tili"
        />
      </section>
    </main>
  );
};

export default RegisterPage;
