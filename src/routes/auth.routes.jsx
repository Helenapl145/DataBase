import{ Routes, Route } from 'react-router-dom';

import { SignIn } from '../pages/SignIn'
import { Error } from '../pages/Error'

export function AuthRoutes() {
    return (
        <Routes>
            <Route path='/' element={<SignIn />}/>
            <Route path="*" element={<Error />}/>
        </Routes>
    )
}