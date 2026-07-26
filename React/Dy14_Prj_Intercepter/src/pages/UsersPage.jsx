import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from '../components/UserCard'

const UsersPage = () => {

    const [usersData, setUsersData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

   let getUsersData = async ()=>{
    try {
        let res = await axios.get("https://fakestoreapi.com/users")
        setUsersData(res.data)
        setIsLoading(false)
    } catch (error) {
        console.log(error);
        
    }
   } 

   useEffect(()=>{
    getUsersData()
   },[])

   if (isLoading) return <h1 className='h-full text-4xl flex items-center justify-center'>Loading Users...</h1>

  return (
    <div className=' grid grid-cols-4 gap-4'>
        {usersData.map((user)=>{
            return <UserCard user={user} key={user.id}/>
        })}
    </div>
  )
}

export default UsersPage