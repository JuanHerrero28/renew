import { useState } from 'react';
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [userData, setUserData] = useState({
    email:"",
    password:""
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if (userData.email.trim() == '' || userData.password === '') {
      return;
    }

    localStorage.setItem(
      'userLogin',
      JSON.stringify(userData.email)
    )

    navigate('/dashboard')
  } 


  return (
    <div className={styles.containerLogin}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div className={styles.formControlLogin }>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
          {/* PASSWORD */}
        <div className={styles.formControlLogin }>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        
          <button className={styles.buttonLogin} type="submit">Login</button>
        
      </form>
    </div>
  );
};

export default Login;
