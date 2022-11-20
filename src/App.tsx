import React, { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type User = {
  avatar_url: string;
};

function App() {
  let username = "cisc0disco";

  // const [userInfo, setUserInfo] = useState<User>();

  // useEffect(() => {
  //   fetch(`https://api.github.com/users/${username}`)
  //     .then((resp) => resp.json())
  //     .then((json) => {
  //       console.log(json);
  //       setUserInfo(json);
  //     });
  // });

  const data = `{
  "login": "cisc0disco",
  "id": 29115431,
  "node_id": "MDQ6VXNlcjI5MTE1NDMx",
  "avatar_url": "https://avatars.githubusercontent.com/u/29115431?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/cisc0disco",
  "html_url": "https://github.com/cisc0disco",
  "followers_url": "https://api.github.com/users/cisc0disco/followers",
  "following_url": "https://api.github.com/users/cisc0disco/following{/other_user}",
  "gists_url": "https://api.github.com/users/cisc0disco/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/cisc0disco/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/cisc0disco/subscriptions",
  "organizations_url": "https://api.github.com/users/cisc0disco/orgs",
  "repos_url": "https://api.github.com/users/cisc0disco/repos",
  "events_url": "https://api.github.com/users/cisc0disco/events{/privacy}",
  "received_events_url": "https://api.github.com/users/cisc0disco/received_events",
  "type": "User",
  "site_admin": false,
  "name": "cisc0disco",
  "company": null,
  "blog": "",
  "location": "Prague, Czech Republic",
  "email": null,
  "hireable": true,
  "bio": null,
  "twitter_username": null,
  "public_repos": 22,
  "public_gists": 1,
  "followers": 30,
  "following": 21,
  "created_at": "2017-06-01T06:38:43Z",
  "updated_at": "2022-11-18T12:10:16Z"
}`;

  const userInfo = JSON.parse(data);

  const date = new Date(userInfo.created_at);

  return (
    <div id="main">
      <nav>
        <h2>devfinder</h2>
      </nav>
      <div id="search-bar">
        <FontAwesomeIcon icon={"magnifying-glass"} size="xl" id="search-icon" />
        <input
          type="text"
          name=""
          id="search-box"
          placeholder="Search GitHub Username"
        />
      </div>
      <div id="result">
        <div id="main-info">
          <img id="profile-picture" src={userInfo?.avatar_url} alt="profile" />
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
      </div>
    </div>
  );
}

export default App;
