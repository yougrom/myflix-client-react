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

  //************************************* */
  const toggleFavorite = (movieId) => {
    const isFavorite = userInfo?.FavoriteMovies.includes(movieId);
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://dry-ridge-94435-1154c64a056a.herokuapp.com/users/${user.Username}/movies/${movieId}`;

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Checking if the response returns JSON
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            return response.json(); // If the response is JSON, parse it
          } else {
            return response.text(); // Otherwise, we process it as text
          }
        } else {
          throw new Error("Could not update favorites");
        }
      })
      .then((data) => {
        // We update the state or do something else depending on the response
        if (typeof data === "string") {
          // Обработка текстового сообщения от сервера, если необходимо
          console.log(data);
        } else {
          // 'data' is assumed to be the updated userInfo object
          setUserInfo(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.log(toggleFavorite);

  //****************************************** */
  const isFavorite = (movieId) => userInfo?.FavoriteMovies.includes(movieId);
  //****************************************** */

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
            <MovieCard
              key={movie._id}
              movie={movie}
              toggleFavorite={() => toggleFavorite(movie._id)}
              isFavorite={isFavorite(movie._id)}
            />
          ))}
      </div>
    </div>
  );
};
