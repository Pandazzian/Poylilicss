import { createUserWithEmailAndPassword, User} from 'firebase/auth'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function() {
  const { $auth } = useNuxtApp()

  const user = useState<User | null>("fb_user", () => null)

  const signinUser = async (email: string, password: string) =>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });  
    }
  const registerUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCreds = await createUserWithEmailAndPassword($auth, email, password)
      if (userCreds) {
        user.value = userCreds.user
        return true
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // handle error
      }
      return false
    }
    return false
  }

  return {
    user,
    registerUser
  }
}