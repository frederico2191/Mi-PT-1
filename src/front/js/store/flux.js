const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      users: [],
      trainers: [],
      token: null,
      givenClass: null,
      givenTrainer: [],
      givenTrainee: null,
      allClasses: [],
      user: null,
      allTypesActivities: null,
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
      syncTokenFromLocalStore: () => {
        const token = localStorage.getItem("token");
        const store = getStore();
        setStore({ token: token });
        // if (store.token && store.token != "" && store.token != undefined) {
        //   setStore({ token: token });
        // }
      },
      getMessage: async () => {
        const store = getStore();
        console.log(store.token, "I am store.token inside hello_user API ");
        const opts = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/hello_user",
            opts
          );
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

      fetchActivityPerTrainer: async (activity_per_trainer_id) => {
        const store = getStore();
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/activity_per_trainer",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await resp.json();
          setStore({ givenClass: data });
          return true;
        } catch (error) {
          console.error(
            "There was an error on activity per trainer fetch!!! It was caught by flux.js",
            error
          );
        }
      },

      fetchTrainers: async () => {
        const store = getStore();
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/trainers", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
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
      getAllClasses: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/activity_per_trainer",
            opts
          );
          const data = await resp.json();
          setStore({ allClasses: data });

          return true;
        } catch (error) {
          console.error(
            "There was an error on getAllClasses fetch!!! It was caught by flux.js",
            error
          );
        }
      },

      fetchDetail: ({ type, id }) => {
        console.log(type, id, "TYPE AND ID INSIDE");
        fetch(`https://www.swapi.tech/api/${type}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setStore({ detail: data.result.properties });
          })
          .then(() => console.log(getStore(), "getStore"));
      },

      getGivenTrainer: async (id) => {
        const store = getStore();
        console.log(id, "trainerId INSIDE FLUX!!!!!");

        const opts = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/trainer/" + id,
            opts
          );

          const data = await resp.json();
          setStore({ givenTrainer: data });
          return true;
        } catch (error) {
          console.error(
            "There was an error on getGivenTrainer fetch!!! It was caught by flux.js",
            error
          );
        }
      },
      getGivenTrainee: async (id) => {
        const store = getStore();
        console.log(id, "traineeId INSIDE FLUX!!!!!");

        const opts = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/trainee/" + id,
            opts
          );

          const data = await resp.json();
          setStore({ givenTrainee: data });
          return true;
        } catch (error) {
          console.error(
            "There was an error on getGivenTrainee fetch!!! It was caught by flux.js",
            error
          );
        }
      },
      getGivenClass: async ({ id }) => {
        const store = getStore();
        console.log(id, "trainerId INSIDE FLUX!!!!!");

        const opts = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/activity_per_trainer/" + id,
            opts
          );
          const data = await resp.json();
          console.log("DATA!!!", data);
          setStore({ givenClass: data });

          return true;
        } catch (error) {
          console.error(
            "There was an error on a givenClass fetch!!! It was caught by flux.js",
            error
          );
        }
      },
      register: async (email, password, gender) => {
        const store = getStore();
        try {
          console.log("in try");
          const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, gender }),
          });
          const data = await resp.json();
          console.log(data, "new user registered after register fetch");
          return true;
        } catch (error) {
          console.error(
            "There was an error on register fetch!!! It was caught by flux.js",
            error
          );
          return false;
        }
      },
      searchCity: async (name) => {
        const store = getStore();
        try {
          const resp = await fetch(
            "https://api.api-ninjas.com/v1/city?name=" + name,
            {
              headers: {
                "Content-Type": "application/json",
                "X-Api-Key": process.env.CITIES_API_API_KEY,
              },
            }
          );
          const data = await resp.json();
          return data;
        } catch (error) {
          console.error("City not found FLUX", name, error);
        }
      },
      registerTrainer: async (
        email,
        password,
        gender,
        about,
        experience_level,
        specialty,
        coaching_style,
        age,
        first_name,
        last_name,
        height,
        weight,
        city
      ) => {
        const store = getStore();
        try {
          console.log("in try");
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/register/trainer",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                gender,
                about,
                experience_level,
                specialty,
                coaching_style,
                age,
                first_name,
                last_name,
                height,
                weight,
                city,
              }),
            }
          );
          if (resp.status === 200) {
            const data = await resp.json();
            console.log(data, "new user registered after register fetch");
            return true;
          } else return false;
        } catch (error) {
          console.error(
            "There was an error on register fetch!!! It was caught by flux.js",
            error
          );
          return false;
        }
      },
      registerTrainee: async (
        email,
        password,
        gender,
        age,
        first_name,
        last_name,
        height,
        weight,
        body_type,
        goal,
        fitness_experience,
        city
      ) => {
        const store = getStore();
        try {
          console.log("in try");
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/register/trainee",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                gender,
                age,
                first_name,
                last_name,
                height,
                weight,
                body_type,
                goal,
                fitness_experience,
                city,
              }),
            }
          );
          const data = await resp.json();
          console.log(
            data,
            "new user (trainee) registered after register fetch"
          );
          return true;
        } catch (error) {
          console.error(
            "There was an error on register trainee fetch!!! It was caught by flux.js",
            error
          );
          return false;
        }
      },

      registerClass: async (
        name,
        description,
        duration,
        price,
        date,
        trainerId,
        city,
        trainerName,
        location
      ) => {
        const store = getStore();
        // console.log("date in flux 2", date?.toDate());
        const eventDate = date?.toISOString();
        const hour = date?.hour();
        const minutes = date?.minute();
        const lat = location?.lat;
        const lng = location?.lng;
        // const address = location?.address;
        console.log("hello", { eventDate, hour, minutes });

        try {
          console.log("in try");
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/register/class",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                name,
                description,
                duration,
                price,
                eventDate,
                hour,
                minutes,
                trainerId,
                city,
                lat,
                lng,
                trainerName,
              }),
            }
          );
          const data = await resp.json();
          console.log(data, "new class registered after register fetch");
          return true;
        } catch (error) {
          console.error(
            "There was an error on class register fetch!!! It was caught by flux.js",
            error
          );
          return false;
        }
      },
      deleteClass: async (id) => {
        const store = getStore();
        try {
          console.log("in try deleting class###", id, "ID");
          const resp = await fetch(
            process.env.BACKEND_URL + `/api/activity/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          const data = await resp.json();
          console.log(data, "Class sucessufully deleted !");
          await getActions().verify();
          return true;
        } catch (error) {
          console.error(
            "There was an error on class DELETE fetch!!! It was caught by flux.js",
            error
          );
          return false;
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
            process.env.BACKEND_URL + "/api/token",
            opts
          );
          const data = await resp.json();
          // console.log("DATA INSIDE FETCH %%%%%%%%%%%%%%%%%%%%", data);
          localStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          await getActions().verify();
          return true;
        } catch (error) {
          console.error("Invalid email or password format", error);
          return false;
        }
      },
      verify: async () => {
        const opts = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/verify",
            opts
          );
          const data = await resp.json();
          localStorage.setItem("userRole", data["user"].user_role);
          localStorage.setItem("userName", data["user"].firstName);
          setStore({ user: data["user"] });
          return true;
        } catch (error) {
          console.error("Invalid email or password format", error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        console.log("logging out");
        setStore({ token: null });
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

      getAllTypesActivities: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/all_types_activities",
            opts
          );
          const data = await resp.json();
          setStore({ allTypesActivities: data });

          return true;
        } catch (error) {
          console.error(
            "There was an error on getAllTypesActivities fetch!!! It was caught by flux.js",
            error
          );
        }
      },
      bookClass: async ({ id, trainee_id, trainee_name }) => {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/book_class`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming you are storing JWT in localstorage
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              trainee_id,
              trainee_name,
            }),
          }
        );
        const data = await response.json();
        return data;
      },

      // const handleSubmit = async (e) => {
      //   e.preventDefault();
      //   const eventWithTime = {
      //     ...eventDate,
      //     time: `${eventDate.hour}:${eventDate.minutes}`,
      //   };

      //   try {
      //     const response = await axios.post('/api/events', eventWithTime);
      //     console.log('Event saved with ID:', response.data.id);
      //     setEvents([...events, { ...eventWithTime, id: response.data.id }]);
      //     setShowModal(false);
      //   } catch (error) {
      //     console.error('Error adding event:', error);
      //   }
      // };

      // getFavorites: async () => {
      //   const store = getStore();
      //   try {
      //     const resp = await fetch(
      //       process.env.BACKEND_URL + "/api/favorites",

      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
      //     //   const resp = await fetch(
      //     //     process.env.BACKEND_URL + "/api/hello",
      //     //     opts
      //     //   );
      //     const data = await resp.json();
      //     setStore({ favorites: data.favorites });
      //     return true;
      //   } catch (error) {
      //     console.error(
      //       "There was an error on favorites fetch!!! It was caught by flux.js",
      //       error
      //     );
      //   }
      // },
    },
  };
};

export default getState;
