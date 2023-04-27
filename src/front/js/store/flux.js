const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      favorites: [],
      users: [],
      trainers: [],
      token: [],
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMessage: async () => {
        const store = getStore();
        // const opts = {
        //   headers: {
        //     Authorization: "Bearer " + store.token,
        //   },
        // };
        try {
          const resp = await fetch(
            "https://3001-frederico2191-mipt1-dy65wpjy9p3.ws-eu95.gitpod.io/api/hello_user",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          //   const resp = await fetch(
          //     process.env.BACKEND_URL + "/api/hello",
          //     opts
          //   );
          const data = await resp.json();
          setStore({ message: data.message });
          return true;
        } catch (error) {
          console.error(
            "There was an error welcome message fectch!!! It was caught by flux.js",
            error
          );
        }
      },
      getFavorites: async () => {
        const store = getStore();
        try {
          const resp = await fetch(
            "https://3001-frederico2191-mipt1-dy65wpjy9p3.ws-eu95.gitpod.io/api/favorites",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          //   const resp = await fetch(
          //     process.env.BACKEND_URL + "/api/hello",
          //     opts
          //   );
          const data = await resp.json();
          setStore({ favorites: data.favorites });
          return true;
        } catch (error) {
          console.error(
            "There was an error on favorites fetch!!! It was caught by flux.js",
            error
          );
        }
      },
      fetchUsers: async () => {
        const store = getStore();
        try {
          const resp = await fetch(
            "https://3001-frederico2191-mipt1-dy65wpjy9p3.ws-eu95.gitpod.io/api/users",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await resp.json();
          console.log(data, "data after data");
          setStore({ users: data });
          return true;
        } catch (error) {
          console.error(
            "There was an error on users fetch!!! It was caught by flux.js",
            error
          );
        }
      },

      fetchTrainers: async () => {
        const store = getStore();
        try {
          const resp = await fetch(
            "https://3001-frederico2191-mipt1-dy65wpjy9p3.ws-eu95.gitpod.io/api/trainers",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await resp.json();
          setStore({ trainers: data });

          return true;
        } catch (error) {
          console.error(
            "There was an error on trainers fetch!!! It was caught by flux.js",
            error
          );
        }
      },
      register: async (email, password) => {
        const store = getStore();
        try {
          console.log("in try");
          const resp = await fetch(
            "https://3001-frederico2191-mipt1-dy65wpjy9p3.ws-eu95.gitpod.io/api/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            }
          );
          const data = await resp.json();
          console.log(data, "new user registered after register fetch");
          return true;
        } catch (error) {
          console.error(
            "There was an error on register fetch!!! It was caught by flux.js",
            error
          );
        }
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            "https://3001-frederico2191-mipt1-dy65wpjy9p3.ws-eu95.gitpod.io/api/token",
            opts
          );
          if (!resp.ok) throw Error("There was a problem in the login request");

          if (resp.status === 401) {
            throw "Invalid credentials";
          } else if (resp.status === 400) {
            throw "Invalid email or password format";
          }
          const data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error(
            "There was an error!!! It was caught by flux.js",
            error
          );
        }
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
