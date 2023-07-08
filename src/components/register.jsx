import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ userDatas, isLogin, createUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const navigate = useNavigate();
  function validObj() {
    //checking username already exist?
    const nameExist = userDatas.find((user) => user.name === userName);
    //checking two passwords match?
    const passwordsMatch = password !== confirmPassword;
    //checking password is more than 5 character
    const passwordLength = password.length < 5;
    return {
      name: nameExist,
      passMatch: passwordsMatch,
      passLength: passwordLength,
    };
  }

  function handleRegister() {
    const valid = validObj();
    if (valid.name) {
      return setRegistrationStatus("username is taken");
    }
    if (valid.passMatch) {
      return setRegistrationStatus("the passwords doesn't match");
    }
    if (valid.passLength) {
      return setRegistrationStatus("password length should at least 5");
    }
    navigate("/");
    createUser({
      user_name: userName,
      email: email,
      password: password,
      address: address,
      phone_number: phoneNumber,
    });
  }
  return (
    <>
      <div
        className="container p-3 mt-4 shadow-lg rounded"
        style={{ maxWidth: "500px" }}
      >
        <label>User name</label>
        <input
          value={userName}
          className="form-control"
          placeholder="user name"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          value={email}
          className="form-control"
          placeholder="user name"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Address</label>
        <input
          value={address}
          className="form-control"
          placeholder="user name"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label>Phone number</label>
        <input
          value={userName}
          className="form-control"
          placeholder="user name"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          value={password}
          className="form-control"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm password</label>
        <input
          value={confirmPassword}
          className="form-control"
          placeholder="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          className="btn btn-outline-success mt-2"
          onClick={handleRegister}
        >
          login
        </button>
        <br />
        <span className="text-danger">{registrationStatus}</span>
      </div>
    </>
  );
}
