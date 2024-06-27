import{ Routes, Route } from 'react-router-dom';


import { Default } from '../layout/Default'
import { Graphic } from '../pages/Graphic'
import { Dashboard } from '../pages/Dashboard'
import { Users } from '../pages/Users'
import { Profile } from '../pages/Profile'

import { Error } from '../pages/Error'

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Default />}>
                <Route path='/' element={<Dashboard />}/>
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/graphic' element={<Graphic />}/>
                <Route path='/users' element={<Users />}/>
                <Route path='/profile' element={<Profile />}/>
                
            </Route>
            <Route path='/error' element={<Error />}/>
            <Route path="*" element={<Error />}/>
        </Routes>
    )
}