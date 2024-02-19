import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/features/authSlice';
import "../auth.scss";


const SignIn = () => {
    const dispatch = useDispatch<AppDispatch>();
  return (
    <div className='auth'>
      <h1>Sign in to Nike</h1>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
         <GoogleLogin
                onSuccess={credentialResponse => {
                    const data = JSON.parse(atob(credentialResponse.credential?.split(".")[1] || ""));
                    data.first_name = data.given_name;
                    data.photo_url = data.picture;
                    dispatch(loginUser(data));
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
            />
    </GoogleOAuthProvider>
    </div>
  )
}

export default SignIn