import React, { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; // <-- import styles to be used

type User = {
  avatar_url: string;
  name: string;
  html_url: string;
  login: string;
  bio: string;
  created_at: String;
  public_repos: Number;
  followers: Number;
  following: Number;
  location: String;
  blog: String;
  company: String;
  twitter_username: String;
};

const usernameRegex = new RegExp(/\w(-\w|\w\w|\w){0,19}$/g);

function App() {
  const user: User = {
    avatar_url: "",
    name: "",
    html_url: "",
    login: "",
    bio: "",
    created_at: "",
    public_repos: 0,
    followers: 0,
    following: 0,
    location: "",
    blog: "",
    company: "",
    twitter_username: "",
  };

  const [userInfo, setUserInfo] = useState<User>(user);

  const [inputValue, setInputValue] = useState("octocat");

  const [isLoading, setIsLoading] = useState(false);

  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchError(false);

      if (usernameRegex.test(inputValue)) {
        setIsLoading(true);

        fetch(`https://api.github.com/users/${inputValue}`).then(
          (resp: Response) => {
            if (resp.ok) {
              resp.json().then((json) => {
                setIsLoading(false);
                setUserInfo(json);
              });
            } else {
              setIsLoading(false);
              setSearchError(true);
              console.log("User not found");
            }
          }
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const date = new Date(userInfo.created_at.toString());

  return (
    <div id="main">
      <nav>
        <h2>devfinder</h2>
      </nav>
      <div id="search-bar">
        <FontAwesomeIcon
          icon={"magnifying-glass"}
          size="xl"
          id="search-icon"
          className={`${isLoading ? "loadingRotation" : ""} ${
            searchError ? "searchError" : ""
          }`}
          style={
            {
              "--search-color": `${searchError ? "#b90f0f" : "#0e60e8"}`,
            } as React.CSSProperties
          }
        />
        <input
          type="text"
          name=""
          id="search-box"
          placeholder="Search GitHub Username"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      {userInfo.login !== "" ? (
        <div id="result">
          <div id="main-info">
            <img id="profile-picture" src={userInfo.avatar_url} alt="profile" />
            <div id="main-info-side">
              <p id="name">{userInfo.name}</p>
              <p id="github-link">
                <a href={userInfo.html_url}>@{userInfo.login}</a>
              </p>
              <p id="joined-date">
                Joined {date.getDate()}{" "}
                {date.toLocaleString("en-us", { month: "short" })}{" "}
                {date.getFullYear()}
              </p>
            </div>
          </div>
          <div id="bio-container">
            <p
              id="bio-text"
              className={userInfo.bio === null ? "grayedOut" : ""}
            >
              {userInfo.bio === null ? "The profile has no bio" : userInfo.bio}
            </p>
          </div>
          <div id="data-container">
            <div id="data-titles">
              <p>Repos</p>
              <p>Followers</p>
              <p>Following</p>
            </div>
            <div id="data-numbers">
              <p>{userInfo.public_repos?.toString()}</p>
              <p>{userInfo.followers?.toString()}</p>
              <p>{userInfo.following?.toString()}</p>
            </div>
          </div>
          <div id="brands">
            <h4>
              <FontAwesomeIcon icon={"location-dot"}></FontAwesomeIcon>
              <p className={userInfo.location === null ? "grayedOut" : ""}>
                {userInfo.location === null
                  ? "Not Available"
                  : userInfo.location}
              </p>
            </h4>
            <h4>
              <FontAwesomeIcon icon={"link"}></FontAwesomeIcon>
              <p className={userInfo.blog === "" ? "grayedOut" : ""}>
                {userInfo.blog === "" ? "Not Available" : userInfo.blog}
              </p>
            </h4>
            <h4>
              <FontAwesomeIcon icon={faTwitter} />
              <p
                className={
                  userInfo.twitter_username === null ? "grayedOut" : ""
                }
              >
                {userInfo.twitter_username === null
                  ? "Not Available"
                  : userInfo.twitter_username}
              </p>
            </h4>
            <h4>
              <FontAwesomeIcon icon="building"></FontAwesomeIcon>
              <p className={userInfo.company === null ? "grayedOut" : ""}>
                {userInfo.company === null ? "Not Available" : userInfo.company}
              </p>
            </h4>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
