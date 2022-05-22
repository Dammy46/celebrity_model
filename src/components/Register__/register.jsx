import React, { useState } from 'react';

const Register = ({ routeChange, loadUser  }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onName = (e) => {
    setName(e.target.value);
  };
  const onEmail = (e) => {
    setEmail(e.target.value);
  };
  const onPassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    fetch('https://rocky-fjord-74712.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {    
          loadUser(user);
          routeChange('home');
        }
      });
  };

  return (
    <article className="br2 ba dark-gray b--white-10 mv4 w-100 w-50-m w-30-l mw6 center shadow-5">
      <div className="measure ">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Create account</legend>
          <div className="mt4 input_wrap">
            <input
              className="pa2 input-reset ba bg-transparent  hover-white w-100"
              type="text"
              name="name"
              id="name"
              placeholder="name"
              onChange={onName}
            />
          </div>
          <div className="mt4 input_wrap">
            <input
              className="pa2 input-reset ba bg-transparent  hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
              placeholder="Email"
              required
              onChange={onEmail}
            />
          </div>
          <div className="mv4 input_wrap">
            <input
              className="b pa2 input-reset ba bg-transparent  hover-white w-100"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={onPassword}
            />
          </div>
        </fieldset>
        <div className="">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
            onClick={onSubmit}
          />
        </div>
        <div className="lh-copy mt3">
          <p className="f5 link  white db pointer">
            Already have an account?
            <span
              className="pointer dim green"
              onClick={() => routeChange('signin')}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default Register;

