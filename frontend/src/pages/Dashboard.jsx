import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <p>Welcome Back!</p>
        <p>What would you like to do today?</p>
      </div>
      <div>
        <div onClick={() => navigate("/createbill")} className='cursor-pointer'>
          Create Bill
        </div>
        <div onClick={() => navigate("/admin")} className='cursor-pointer'>
          Admin Panel
        </div>
      </div>
    </div>
  )
}

export default Dashboard
