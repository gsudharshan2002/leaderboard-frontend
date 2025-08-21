"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/axios";  
import Leaderboard from "@/components/Leaderboard";
//this is typescript so 
type User = {
  _id: string,
  name: string,
  points: number,
  team: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  //  fetching and sort based on points and pass users to Leaderboard comp

  const fetchApi = async () => {
    try {
      const res = await api.get<User[]>("/users");
      const sortUsers = res.data.sort((a: User, b: User) => b.points - a.points);
      setUsers(sortUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // random point add using post method when user select and clicking claim
  // button disable if selecteduser in empty

  const handleClaims = async () => {
    
    try {
      const points = Math.floor(Math.random() * 10) + 1; // random 1–10
      const res = await api.put(`/users/${selectedUser}`, { points });
      fetchApi();
      
    } catch (err) {
      console.log(err);
    }
    
    
  };

  // post method for adding user it will update users when it runs 
  const handleAdd = async () => {
    try {
      const res = await api.post("/users", { name, points: 0, team });
      alert(`${res.data.name} added`);
      fetchApi();
    } catch (err) {
      console.log(err);
    }
  };

  // for side-effect 
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="bg-black text-white w-full h-full">
  
      <h1 className="text-white font-bold text-center text-5xl p-4">
        Leader Board
      </h1>

     
      <div className="flex flex-col lg:flex-row lg:min-h-screen justify-between gap-5 m-2">
        
        
        
        <div className="bg-purple-950 w-full lg:w-1/3 xl:w-1/4 p-6 
                        space-y-6 order-2 lg:order-1 lg:h-screen 
                        rounded-t-3xl lg:rounded-none lg:rounded-r-3xl">
          <h1 className="text-2xl font-bold text-center">Select user for Claim Points</h1>
          
          
          <select
            className="px-5 p-3 w-full text-black rounded-2xl bg-white"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select user</option>
            {users.map((user, i) => (
              <option key={i} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

         
          <button
            onClick={handleClaims}
            disabled={!selectedUser}
            className="bg-amber-400 hover:bg-amber-600 w-full px-5 p-3 text-black rounded-2xl disabled:opacity-50"
          >
            Claim Points
          </button>

          
          <h2 className="text-2xl font-bold text-center">Add User</h2>
          <div className="bg-purple-700 flex flex-col gap-5 pt-6 px-2 pb-4 rounded-3xl">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 p-3 rounded-2xl bg-white text-black"
              placeholder="Name"
            />
            <select
              className="px-5 p-3 w-full text-black rounded-2xl bg-white"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            >
              <option value="">Select team</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
            <button
              onClick={handleAdd}
              disabled={name.trim() === "" || team.trim() === ""}
              className="bg-green-500 hover:bg-green-600 text-white px-5 p-3 rounded-2xl disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </div>

        {/*Leaderboard Panel */}
        <div className="flex-1 order-1 lg:order-2 lg:h-screen overflow-y-auto ">
          <Leaderboard users={users} />
        </div>
      </div>
    </div>
  );
}
