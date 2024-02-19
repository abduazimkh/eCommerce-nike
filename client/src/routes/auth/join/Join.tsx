import { Container } from '../../../utils/Utils'
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../redux/features/authSlice';

import "../auth.scss";
import { AppDispatch, RootState } from '../../../redux/store';

const Join = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state:RootState) => state.auth)
    
  return (
   <div className='auth'>
      <h1>Create an account</h1>
     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Container>
            {
                !auth.token && 
                <GoogleLogin
                        text='signup_with'
                        onSuccess={credentialResponse => {
                            const data = JSON.parse(atob(credentialResponse.credential?.split(".")[1] || ""));
                            data.first_name = data.given_name;
                            data.photo_url = data.picture;
                            dispatch(createUser(data));
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    useOneTap
            />
            }
        </Container>
    </GoogleOAuthProvider>
   </div>
  )
}

export default Join