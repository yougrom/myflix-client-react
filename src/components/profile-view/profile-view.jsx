import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";

export const ProfileView = ({ movies, user }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    const url = `https://dry-ridge-94435-1154c64a056a.herokuapp.com/users/${user.Username}`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
        setUsername(data.Username);
        setEmail(data.Email);
        setBirthday(data.Birthday ? data.Birthday.split("T")[0] : "");
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [user.Username, user.token]); // These dependencies ensure that the request will be executed when the username or token changes

  const handleUpdate = (e) => {
    e.preventDefault();
    // code to send updated information to the server
    console.log(username, email, birthday);
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userInfo.Username}'s Profile</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Birthday:</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
      <Button
        onClick={() => {
          /* function to remove user */
        }}
      >
        Deregister
      </Button>
      <div className="favorites">
        <h2>Favorite Movies</h2>
        {movies
          .filter((m) => userInfo?.FavoriteMovies.includes(m._id))
          .map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
      </div>
    </div>
  );
};
