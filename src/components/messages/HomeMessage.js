import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
export const HomeMessage =() =>{
    const [friends,setFriends]=useState([])
    const [users,setUsers]=useState([])
    const localThawneUser = localStorage.getItem("thawne_user")
    const thawneUserObject = JSON.parse(localThawneUser)
	useEffect(
        ()=>{
             fetch(`http://localhost:8088/friends?userId=${thawneUserObject.id}`)
            .then(response => response.json())
            .then((friendArray)=>{
                setFriends(friendArray)
            })
            
        },
        []
    )
    useEffect(
        ()=>{
             fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((userArray)=>{
                setUsers(userArray)
            })
            
        },
        []
    )
return <div className="home">
<h1>Messages</h1>
<h2>Friends</h2>
{
   friends.map(friend=>{
        const friendName= users.find(user=> user.id === friend.friendId)
       return<article key={friend.id}>
        {
            (friendName !== undefined) ?  <Link to={`/messages/${friendName.id}`}><h2>{friendName.name}</h2></Link> : ""
        }
      
       </article>

    })
}

</div>
}
