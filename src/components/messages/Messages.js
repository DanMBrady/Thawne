import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import "./Messages.css"
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
        <div className="fullMessenger">
       <div className="messageContainer">
        {
            userMessages.map(message=>{

                return (message.userId===thawneUserObject.id) ?<article key={message.id}>
                    <section className="messageS">{message.message}</section>
                    </article>
                    : <article key={message.id}>
                    <section className="messageR">{message.message}</section>
                    </article>
            })
        }
        </div>
        </div>
    </article>
}