import { useState, useEffect } from "react";

const UserProfile = () => {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData({ name: data.name, email: data.email });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{userData?.name}</h1>
      <p>{userData?.email}</p>
    </div>
  );
};

export default UserProfile;
