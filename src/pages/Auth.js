import React from 'react'
import {auth, googleProvider}  from '../config/firebase'
import {createUserWithEmailAndPassword, signOut, signInWithPopup} from 'firebase/auth'
import { FcGoogle } from "react-icons/fc";



export default function Auth( {userName, setUserName}){

    const [authentication, setAuthentication] = React.useState('')
    
    


    React.useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userStuuf'))
        setAuthentication(userInfo)
        

        const userNames = JSON.parse(localStorage.getItem('username'))
        setUserName(userNames)
        
       
        
      },[])
    

    React.useEffect(() => {
        localStorage.setItem('userStuuf', JSON.stringify(authentication))
        localStorage.setItem('username', JSON.stringify(userName))
       
      }, [authentication, userName]);


     
    const [user, setUser] = React.useState({
        email:'',
        password:''
    })

    const logOut =  async () => {
        try {
            await signOut(auth)
            console.log('user logged out ')
            setAuthentication('')
            setUserName('')
            localStorage.removeItem('userStuuf')
            localStorage.removeItem('username')

            
            
        }catch (err){ 
            console.log(err)
        }
        
    }

    const googleSignIn = async () => {
        try {
            const result =  await signInWithPopup(auth, googleProvider)
            console.log(result)
            setUserName(result.user.displayName)
            setAuthentication(result.user)


        } catch (err){
            console.log(err)
        }
    }


    const handleChange = (event) => {
        
        const {type, name, value, checked} = event.target
        setUser(prevUser => {
            return {
                ...prevUser,
                [name] : type === 'checkbox' ? checked : value
            }
        })
    }

    async function LogIn(event) {
        event.preventDefault()
        try {
          const result = await createUserWithEmailAndPassword(auth, user.email, user.password);
          
          setAuthentication(result)
          console.log(authentication)
          setUser({
            email: '',
            password: ''
          })
          
          
        } catch (err) {
          console.error(err.code, err.message);
        }
      }

    return (
        <div className='auth--div'>
            <div>
        { authentication ? '' : <div><h2 className='signupp--header'>SIGN UP</h2>
        <form onSubmit={LogIn}>
            <input 
            type='text'
            value={user.email}
            onChange={handleChange}
            name='email'
            placeholder='email'
            
            />
            <input 
            type='password'
            value={user.password}
            onChange={handleChange}
            name='password'
            placeholder='password'
            
            />

           { authentication === '' &&<div><button> SUBMIT</button>  
            <button onClick={googleSignIn}>SIGN IN WITH GOOGLE <FcGoogle/></button></div>}   
            

            

        </form>
        
        </div>}
        {authentication !== '' && <button onClick={logOut}>LOG OUT </button>}
        </div>
        </div>


    )

   
}