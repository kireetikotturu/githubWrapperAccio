import { useState } from "react";
import "./App.css";
import {ClipLoader} from 'react-spinners'
import axios from 'axios';

const App = () => {
  const [userName, setUserName] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFormSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setUserInfo(null)
    const response = await axios.get('https://api.github.com/users/' + userName)
    setUserInfo(response.data)
    setLoading(false)
  }
const {login, name, followers, following, company, bio, avatar_url, public_repos} = userInfo || {}
  return (
    <div>
      <div className="container">
        <h1 className="heading">Github Wrapper</h1>
        <form className="formCard" onSubmit={handleFormSubmit}>
          <input type="text" onChange={(e)=>setUserName(e.target.value)} />
          <button>Search</button>
        </form>
        {loading && <ClipLoader className="loader" color="white" size={50} cssOverride={{borderWidth: "6px"}}/>}
        {userInfo && <div className="userDetailsCard">
          <div className="userDetailsBody">
              <p className="name">{name}</p>
              <em className="userName">{login}</em>
            <div className="followersContainer">
              <p className="followers">Followers: {followers}</p>
            <p className="following">Following: {following}</p>
            </div>
            <p className="reposText">Public Repos: {public_repos}</p>
            <div className="prof">
              <p>🏢 Company: {company}</p>
              <p>✍️ Bio: {bio}</p>
            </div>
          </div>
          <img
            src={avatar_url}
            alt="userImage"
            className="userImage"
          />
        </div>}
        
      </div>
    </div>
  );
};

export default App;
