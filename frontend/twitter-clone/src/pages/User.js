import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../service/UserService";
import bg from "../images/defaul-bg.png"
import profile from "../images/default-profile.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from "../components/Divider";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FeedList from "../components/FeedList";
import {Close} from "@mui/icons-material";
import MyDropzone from "../components/MyDropzone";

const User = () => {
    const [user, setUser] = useState()
    const [menu, setMenu] = useState(0) // 0 tweets 1 tweets & media 2 media 3 likes
    const [edit, setEdit] = useState(false)

    const {username} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        let userService = new UserService()
        userService.getUserByUsername(username).then(res => setUser(res.data))
    }, [username])

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className={"flex flex-col border-r border-l border-gray-extraLight w-1/2 mr-auto relative"}>
            {user &&
                <>
                    <header
                        className="sticky flex items-center top-0 z-10 bg-white p-2 h-16 border-b border-gray-extraLight ">
                        <ArrowBackIcon
                            style={{cursor: "pointer", marginRight: "10px", marginLeft: "5px"}}
                            fontSize={"small"}
                            onClick={() => navigate("/")}/>
                        <div className="flex flex-col">
                            <span className="font-medium text-lg text-gray-900">{user.name}</span>
                            <span className="font-light text-sm
                    ">{user.tweets.length} tweets</span>
                        </div>
                    </header>
                    <div className="h-52" style={{
                        backgroundImage: `url(${bg}`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                        <img
                            src={user.profileImageLink ? `http://localhost:8080/v1/users/${username}/image/download` : profile}
                            alt="Profile"
                            className="w-28 h-28 rounded-full mt-36 ml-3 absolute"
                        />
                    </div>
                    <div className="mb-3">
                        <button
                            className="float-right h-10 bg-transparent py-2 px-4 rounded-2xl mt-1 mr-1 font-bold text-sm"
                            style={{color: "#1DA1F2", border: `1px solid #1DA1F2`}}
                            onClick={() => setEdit(!edit)}>Edit profile
                        </button>
                        <div className="mt-16 ml-3">
                            <span className="font-bold block mb-0">{user.name}</span>
                            <span className="font-light block text-sm">@{user.username}</span>
                            <span className="block">{user.bio}</span>
                            <span className="flex items-center font-light block mt-2" style={{fontSize: "13px"}}>
                                <CalendarMonthIcon fontSize="small"
                                                   style={{color: "lightslategrey", marginRight: "3px"}}/>
                                Joined {month[new Date(user.creationTimestamp).getUTCMonth()]} {new Date(user.creationTimestamp).getFullYear()}</span>
                            <div className="flex items-center">
                                0 <span className="mr-2 p-1 text-sm font-light">Following</span>
                                0 <span className="text-sm p-1 font-light">Followers</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around p-2">
                        <button
                            className="bg-transparent focus:outline-none text-sm"
                            onClick={() => setMenu(0)}>
                            Tweets
                        </button>
                        <button
                            className="bg-transparent focus:outline-none text-sm"
                            onClick={() => setMenu(1)}>
                            Tweets & replies
                        </button>
                        <button
                            className="bg-transparent focus:outline-none text-sm"
                            onClick={() => setMenu(2)}>
                            Media
                        </button>
                        <button
                            className="bg-transparent focus:outline-none text-sm"
                            onClick={() => setMenu(3)}>
                            Likes
                        </button>
                    </div>
                    <Divider/>
                    <FeedList tweets={user.tweets}/>
                    {edit &&
                        <>
                            <div
                                className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative my-6 mx-auto w-96">
                                    <div
                                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="p-6 flex-auto" onSubmit={() => setEdit(false)}>
                                            <Close className="mb-1" onClick={() => setEdit(false)}/>
                                            <div className="h-36 flex relative" style={{
                                                backgroundImage: `url(${bg}`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover"
                                            }}>
                                                <div className="w-16 h-16 mt-28 ml-1 relative">
                                                    <img
                                                        src={user.profileImageLink ? `http://localhost:8080/v1/users/${username}/image/download` : profile}
                                                        alt="Profile"
                                                        className="w-16 h-16 rounded-full"
                                                    />
                                                    <MyDropzone/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-10 fixed inset-0 z-40 bg-black"/>
                        </>
                    }
                </>
            }
        </div>
    );
};

export default User;