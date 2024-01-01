import { useEffect, useRef, useState } from 'react';
import styles from './app.module.css'

function App() {

  const [data, setData] = useState({
    email: '',
    password: '',
    repeatPassword: ''
  })
  const [error, setError] = useState(null)

  const submitButtonRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()

    if (data.email === '' || data.password === '' || data.repeatPassword === '') {
      setError('ERROR: все поля должны быть заполнены')
    } else if (data.password !== data.repeatPassword) {
      setError('ERROR: пароли не совпадают')
    } else {
      console.log(data)
    } 
  }

  const onEmailBlur = () => {
    let emailError = null

    if (!/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)*$/.test(data.email)) {
      emailError = 'ERROR: указан неверный email'
    } else if (data.email.length > 40) {
      emailError = 'ERROR: email не должен быть длиннее 40 символов'
    }
    setError(emailError)
  }

  const onPasswordBlur = () => {
    let passError = null

    if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*;:]/.test(data.password)) {
      passError = 'ERROR: пароль должен содержать хотя бы одну заглавную и одну строчную латинскую буквы, \nтак же цифру и один из спец символов (!@#$%^&*)'
    } else if (data.password.length < 6 || data.password.length > 16) {
      passError = 'ERROR: пароль не должен быть короче 6 символов и длиннее 16'
    }
    setError(passError)
  }

  useEffect(() => {
    if (
      (/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)*$/.test(data.email)) &&
      (data.email.length < 40) &&
      (/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*;:]/.test(data.password)) &&
      (data.password.length > 6 || data.password.length < 16) &&
      (data.password === data.repeatPassword)
    ) {
      submitButtonRef.current.focus()
    }
  }, [data])

  return (
    <div className={styles.app}>
      <form onSubmit={(e) => onSubmit(e)}>

        {error && <div className={styles.errorLabel}>{error}</div>}

        <h2>Email:</h2>
        <input 
          name='email'
          type='email' 
          value={data.email} 
          placeholder='email'
          onChange={({target}) => setData({...data, email: target.value})}
          onBlur={onEmailBlur}
        ></input>

        <h2>Password:</h2>
        <input 
          name='password'
          type='password' 
          value={data.password} 
          placeholder='password'
          onChange={({target}) => setData({...data, password: target.value})}
          onBlur={onPasswordBlur}
        ></input>

        <h2>Repeat password:</h2>
        <input 
          name='repeatPassword'
          type='password' 
          value={data.repeatPassword}
          placeholder='password'
          onChange={({target}) => setData({...data, repeatPassword: target.value})}
          onBlur={() => setError(null)}
        ></input>

        <button ref={submitButtonRef} type='submit' className={styles.register} disabled={error !== null}>Register</button>
      </form>
    </div>
  );
}

export default App;
