import { useEffect } from 'react';

const Login = (props: { history: any }) => {
  useEffect(() => {
    // test.getLogin();
    localStorage.setItem("token", "dasdasda");
    // ApplicationUserManager.Login();
  }, [props])
  return (
    <></>
  )
}

export default Login;