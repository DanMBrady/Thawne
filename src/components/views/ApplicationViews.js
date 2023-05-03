import { Outlet, Route, Routes } from "react-router-dom"
import { Messages } from "../messages/Messages"
import { HomeMessage } from "../messages/HomeMessage"
export const ApplicationViews = () => {
    
	return <>
		<Routes>
            <Route path="/" element={
                <>
               <h1>Thawne</h1>
                  <Outlet />
              </>
            }>

            </Route>
            <Route path="messages" element={ <HomeMessage/>} />

            <Route path="messages/:friendId" element={ <Messages/>} />

                
        </Routes>
    
		
	
		
	</>
}

