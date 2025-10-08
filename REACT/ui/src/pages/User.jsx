import React, { useEffect, useState } from 'react';
import img12 from '../assets/images/img12.jpg';

const User = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/getAllUser', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        console.log('Failed to fetch users');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  
  return (
    <div
      className="bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: `url(${img12})` }}
    >
      <div className="bg-gray-700/70 w-full h-full">
        <h1 className="font-bold font-serif text-3xl text-white md:pt-16 pt-5 md:pl-[400px] pl-7">
          User Details
        </h1>
        <table className="border border-white text-white md:w-[1390px] md:ml-[400px] ml-7 mt-10 bg-gray-700/30">
          <thead>
            <tr>
              <th>User Name</th>
              <th className="border border-white px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border border-white px-4 py-2 text-center">{user.username}</td>
                <td className="border border-white px-4 py-2 text-center">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
