import React, { useState, useEffect } from "react";
import Axios from 'axios';

function EditProfile({ userId }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // Fetching user information prior to prfile updates
    // useEffect(() => {
    //     userId = "bti5DEw9E2Xn1aC9PyR1PlZScDy2";
    //     // (async () => {
    //     //     try {
    //     //         const queryString = 'http://localhost:4000/api/users/?where={"uid": "' + userId + '"}';
    //     //         const user = await axios.get(queryString);
    //     //         setUser(user.data);
    //     //     } catch (error) {
    //     //         console.log(error);
    //     //         return;
    //     //     }
    //     // })();
    //     const queryString = 'http://localhost:4000/api/users/?where={"uid": "' + userId + '"}';
    //     Axios.get(queryString)
    //         .then((response) => {
    //             console.log(response);
    //             setFirstName(response.data.data[0].firstName);
    //             setLastName(response.data.data[0].lastName);
    //             // console.log(`___FIRST: ${response.data.data[0].firstName}, ___LAST: ${response.data.data[0].lastName}`);
    //         });
    // }, []);

    // const handleInput = (e) => {
    //     console.log(e.target.name, " : ", e.target.value);
    //     setUserData({ ...user, [e.target.name]: e.target.value });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryString = `http://localhost:4000/api/users/?where={"uid":"${"bti5DEw9E2Xn1aC9PyR1PlZScDy2"}"}`;
        Axios.get(queryString)
            .then((response) => {
                console.log("RESPONSE: ");
                console.log(userId);
                console.log(response.data.data[0].firstName);
                console.log(response.data.data[0].lastName);
                const _id = response.data.data[0]._id;
                console.log("Current UID: " + userId);
                // setFirstName(response.data.data[0].firstName);
                // setLastName(response.data.data[0].lastName);
                console.log(`_ID: ${response.data.data[0]._id}, ___LAST: ${response.data.data[0].lastName}`);
                const user = { firstName: firstName, lastName: lastName };
                console.log("=====>")
                console.log(user);
                Axios.put(`http://localhost:4000/api/users/${_id}`, user)
                    .then((res) => {
                        console.log("Successfully updated the profile");
                        console.log("===> res: " + res);
                    })
                    .catch((err) => {
                        console.log("Error: Could not update the profile : ");
                    });
            }).catch({});
    };

    return (
        // <div className="App">
        //     {/* <h1>Hello, {userData.firstName && userData.firstName != "" ? userData.firstName : "Stranger"}!</h1> */}
        //     <form onSubmit={handleSubmit}>
        //         <input
        //             className="black"
        //             type="text"
        //             name="firstName"
        //             onChange={(e) => setFirstName(e.target.value)}
        //             placeholder={"first name"}
        //         />
        //         <input
        //             type="text"
        //             name="lastName"
        //             onChange={(e) => setLastName(e.target.value)}
        //             placeholder={"last name"}
        //         />
        //         <br />
        //         <input type="submit" value="Update" />
        //     </form>
        // </div>
        <>
            <main >
                <section>
                    <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md space-y-8">
                            <div>
                                <h2 className="font-heading sm:text-lg text-center text-base tracking-tight text-gray-900">
                                    Edit Profile
                                </h2>
                            </div>
                            <form onSubmit={handleSubmit} className="mt-8 space-y-6" >
                                <div className=" space-y-6 rounded-md shadow-sm">
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">
                                            first name
                                        </label>
                                        <input
                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            type="text"
                                            name="firstName"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder={"first name"}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="sr-only">
                                            last name
                                        </label>
                                        <input
                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            type="text"
                                            name="lastName"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder={"last name"}
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main >
        </>
    );
}

export default EditProfile;