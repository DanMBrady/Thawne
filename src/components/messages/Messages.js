import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
export const Messages =()=>{
    const [friend,setFriend]=useState({
        name:"joe"
    })
    const [messages,setMessages]=useState([])
    const {friendId} = useParams()
    const localThawneUser = localStorage.getItem("thawne_user")
    const thawneUserObject = JSON.parse(localThawneUser)
    useEffect(
        ()=>{
            fetch(`http://localhost:8088/users?id=${friendId}`)
            .then(response => response.json())
            .then((data)=>{
                const singleFriend =data[0]
                setFriend(singleFriend)
            })
        },
        [friendId]
       )
       useEffect(
        ()=>{
             fetch(`http://localhost:8088/messages`)
            .then(response => response.json())
            .then((friendArray)=>{
                setMessages(friendArray)
            })
            
        },
        []
    )
  
    const userMessages= messages.filter(message=>(message.friendId === friend.id && message.userId === thawneUserObject.id) || (message.friendId=== thawneUserObject.id && message.userId === friend.id))
    
    return <article>
        <h1>{friend.name}</h1>
       
        {
            userMessages.map(message=>{

                return <article key={message.id}>
                    <section>{message.message}</section>
                    </article>
            })
        }
    </article>
}