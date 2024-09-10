'use client'

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string; 
  is_premium: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isClient, setIsClient] = useState(false);  // Add a state to check if the component is mounted

  useEffect(() => {
    setIsClient(true);  // Indicate that we're now on the client side
  }, []);

  useEffect(() => {
    if (isClient && WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, [isClient]);  // Only run this effect once the component is on the client side

  return (
    <main className="p-4">
      {
        userData ? (
          <>
            <h1 className="text-2xl font-bold mb-4">User Data</h1>
            <ul>
              <li>ID: {userData.id}</li>
              <li>First Name: {userData.first_name}</li>
              {userData.last_name && <li>Last Name: {userData.last_name}</li>}
              {userData.username && <li>Username: {userData.username}</li>}
              <li>Language: {userData.language_code}</li>
              <li>Premium: {userData.is_premium ? "Yes" : "No"}</li>
            </ul>
          </>
        ) : (
          <div>Loading...</div>
        )
      }
    </main>
  );
}
