import useTabs from '@tygr/tabs';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

function useInput(
  initialValue = ''
): [string, (ev: ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState(initialValue);
  return [value, (ev) => setValue(ev.target.value)];
}

const login = (email: string, password: string) =>
  console.log('Logging in', email, password);

const register = (email: string, password: string) =>
  console.log('Registering', email, password);

const resetPassword = (email: string) =>
  console.log('Resetting password', email);

export default function Login() {
  const [tabAttributes, setTab, LOGIN, REGISTER, RESET_PASSWORD] = useTabs(
    'login',
    'register',
    'reset-password'
  );

  /**
   * If you'd like to use a prop to set the initial tab, use a react effect to set the tab only
   * once. Make sure to pass an empty dependencies array as the second argument to prevent the
   * setTab function from running on every state and prop change
   **/
  const initialTab = 'register';
  useEffect(setTab(initialTab), []);

  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();
  const [confirmPassword, onConfirmPasswordChange] = useInput();

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    LOGIN && login(email, password);
    REGISTER && password === confirmPassword
      ? register(email, password)
      : console.log('Passwords do not match');
    RESET_PASSWORD && resetPassword(email);
  };

  return (
    <div className="tygr-login">
      <form {...tabAttributes} onSubmit={onSubmit}>
        <div className="header">
          <button
            onClick={setTab('login')}
            type="button"
            className={LOGIN ? 'selected' : ''}
          >
            Login
          </button>
          <button
            onClick={setTab('register')}
            type="button"
            className={REGISTER ? 'selected' : ''}
          >
            Register
          </button>
          <button
            onClick={setTab('reset-password')}
            type="button"
            className={RESET_PASSWORD ? 'selected' : ''}
          >
            Reset Password
          </button>
        </div>

        <label htmlFor="email">Email Address</label>
        <input
          required
          id="email"
          name="email"
          value={email}
          onChange={onEmailChange}
          type="text"
        />

        <label htmlFor="password" data-tab="login register">
          Password
        </label>
        <input
          required={LOGIN || REGISTER}
          id="password"
          name="password"
          data-tab="login register"
          value={password}
          onChange={onPasswordChange}
          type="password"
        />

        <label htmlFor="confirm-password" data-tab="register">
          Confirm Password
        </label>
        <input
          required={REGISTER}
          id="confirm-password"
          name="confirm-password"
          data-tab="register"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          type="password"
        />

        <input data-tab="login" type="submit" value="Login" />
        <input data-tab="register" type="submit" value="Register" />
        <input data-tab="reset-password" type="submit" value="Reset password" />
      </form>
    </div>
  );
}
