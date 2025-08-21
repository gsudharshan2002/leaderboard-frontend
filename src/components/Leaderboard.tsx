import React from "react";

type User = {
  _id: string;
  name: string;
  points: number;
  team:string
};

type Props = { users: User[] };

export default function Leaderboard({ users }: Props) {
  
  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  const chooseColor = (team: string) => { // for logo background color to make diff
  switch (team.toLowerCase()) {
    case "red":
      return "bg-red-600";
    case "green":
      return "bg-green-600";
    case "blue":
      return "bg-blue-700";
    default:
      return "bg-gray-400"; 
  }
};

  return (
    <div className="bg-purple-950 rounded-3xl shadow-md p-10  w-full h-[800px] lg:h-dvh flex flex-col ">
      
      <div className="flex justify-center items-end gap-3 my-6">
       {/* 2nd */}
        {topThree[1] && (
          <div className="flex flex-col items-center bg-amber-500 rounded-md p-8 ">
            <div className={` w-16 h-16 rounded-full ${chooseColor(topThree[1].team)} flex items-center justify-center text-2xl font-bold `}>
             <img src={"https://png.pngtree.com/png-clipart/20231001/original/pngtree-golden-shiny-2nd-number-png-image_13218509.png"}></img>
            </div>
            <p className="mt-1 text-sm">{topThree[1].name}</p>
            <p className="text-xs text-gray-500">{topThree[1].points} pts</p>
            <p className="text-3xl">2nd</p>
          </div>
        )}

        {/* 1st */}
        {topThree[0] && (
          <div className="flex flex-col items-center bg-amber-400 p-8 rounded-md -translate-y-6 ">
            <div className={` w-20 h-20 rounded-full ${chooseColor(topThree[0].team)}  flex items-center justify-center text-2xl font-bold `}>
              <img src={"https://png.pngtree.com/png-clipart/20230517/original/pngtree-golden-yellow-number-one-shiny-png-image_9163386.png"}></img>
            </div>
            <p className="mt-1 font-semibold">{topThree[0].name}</p>
            <p className="text-sm text-gray-600">{topThree[0].points} pts</p>
            <p className="text-4xl">1st</p>
          </div>
        )}

        {/* 3rd */}
        {topThree[2] && (
          <div className="flex flex-col items-center bg-amber-700 p-8 rounded-md ">
            <div className={` w-14 h-14 rounded-full ${chooseColor(topThree[1].team)}  flex items-center justify-center text-2xl font-bold `}>
              <img src="https://static.vecteezy.com/system/resources/previews/021/456/159/original/blue-number-3-a-happy-birthday-celebration-png.png" alt="3rd" />
            </div>
            <p className="mt-1 text-sm">{topThree[2].name}</p>
            <p className="text-xs text-black">{topThree[2].points} pts</p>
            <p className="text-3xl">3rd</p>
          </div>
        )}
      </div>

    

        {/* others */}
      <div className="flex-1 overflow-y-auto space-y-2 w-full lg:w-2/4 m-auto">
        {others.map((u, i) => (
          <div
            key={u._id}
            className="flex items-center justify-between bg-black px-3 py-2 rounded-3xl">
            <div className="flex items-center gap-3 ">
              <div className={` w-8 h-8 rounded-full ${chooseColor(u.team)} flex items-center justify-center text-sm font-semibold`}>
                {i + 4}
              </div>
              <p>{u.name}</p>
            </div>
            <p className="text-sm font-medium">{u.points} pts</p>
          </div>
        ))}
      </div>
    </div>
  );
}
