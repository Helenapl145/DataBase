import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "../services/api.ts"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface AuthData {
  token: string,
}

interface AuthProvidesProps {
  children: ReactNode,
}

interface AuthContextData{
  authData?: AuthData
  signIn: (username: string, password: string) => Promise<AuthData | undefined>
  signOut: () => Promise<void>
  user: AuthData | null
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({children}: AuthProvidesProps) {
    const [data, setData] = useState<AuthData | null>(null)
  

    async function signIn(username: string, password:string): Promise<AuthData | undefined> {
        try {
            await api.post('https://ftcfke7dq3sryag5zumeerufkm0fiwvv.lambda-url.us-east-1.on.aws/login', {
                grant_type: '',
                username: username.toLowerCase(),
                password: password.toLowerCase(),
                scope: '',
                client_id: '',
                client_secret: ''
              }, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
              .then(response => {
                toast.success('Usuario autenticado com sucesso')
                const {access_token} = response.data
              
                setTimeout(() => {
                  localStorage.setItem("@db", access_token)
                  api.defaults.headers.common["authorization"] = `Bearer ${access_token}`
                
                  setData(access_token)
                }, 1500)  
              
              })
              .catch(error => {
                console.error('Erro:', error);
                toast.error("Tente novamente! Senha ou usuário invalido.");
              });
          } catch (error) {
              console.error(error);
          
          } 

          return
    }

    function signOut(): Promise<void>{
      localStorage.removeItem("@db")
      setData(null)
      return Promise.resolve();
  }

    useEffect(() => {
      const access_token = localStorage.getItem("@db")
      const token = access_token?.toString()

      if(token) {
         api.defaults.headers.common["authorization"] = `Bearer ${token}`

          setData({token})
      }
    }, [])

    return (
      <AuthContext.Provider value={{signIn, signOut, user: data}}>
        {children}
      </AuthContext.Provider>
    )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export {AuthProvider, useAuth}
