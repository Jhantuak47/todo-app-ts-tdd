import React, { useEffect } from "react";

type User = {
  id: string;
  name: string;
};
function UserComponent() {
  const url = "https://jsonplaceholder.typicode.com/users";

  const [userList, setUserList] = React.useState([]);

  const randomAplanumeric = (val: any) => {
    let str = "";
    //@ts-ignore
    Array.from({ val }).some(() => {
      Math.random().toString(36).slice(2);
      return str.length >= val;
    });
    console.log("str here", str);
    return str.slice(0, val);
  };
  const getUserData = async () => {
    console.log("api call made");
    const response = await fetch(url);
    const jsonData = await response.json();
    setUserList(jsonData);
    console.log(userList);
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log(userList);
  return (
    <div className="App">
      <h2>User Data</h2>
      <div className="user_list">
        {userList.map((userData) => {
          return (
            //@ts-ignore
            <div className="user_data" key={userData.id}>
              <div className="image">
                <img
                  src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  alt=""
                  width="60"
                  height="60"
                />
              </div>
              <div className="body">
                <p>
                  <strong>Id:</strong> {randomAplanumeric(10)}
                </p>
                <p>
                  <strong>Name:</strong>{" "}
                  {
                    //@ts-ignore
                    userData.name
                  }
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  {
                    //@ts-ignore
                    userData.website
                  }
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {
                    //@ts-ignore
                    userData.email
                  }
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {
                    //@ts-ignore
                    userData.phone
                  }
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserComponent;
