import dayjs from "dayjs";

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
      processedResults: [],
      searchedCityName: "",
      searchedCityObject: null,
      selectedClassId: "",
      isEventModalOpen: false,
      uploadedProfileImageUrl: "",
    },
    actions: {
      setEventModalOpen: () => {
        setStore({ isEventModalOpen: true });
      },
      setEventModalClosed: () => {
        setStore({ isEventModalOpen: false });
      },
      setProcessedResults: (filteredEvents) => {
        setStore({ processedResults: filteredEvents });
      },
      setSearchedCityName: (city) => {
        setStore({ searchedCityName: city });
      },
      setSearchedCityObject: (city) => {
        setStore({ searchedCityObject: city });
      },
      setSelectedClassId: (selectedClassId) => {
        setStore({ selectedClassId: selectedClassId });
      },
      resetSelectedClassId: () => {
        setStore({ selectedClassId: "" });
      },
      resetGivenClass: () => {
        setStore({ givenClass: null });
      },
      syncTokenFromLocalStore: () => {
        const token = localStorage.getItem("token");
        const store = getStore();
        setStore({ token: token });
        // if (store.token && store.token != "" && store.token != undefined) {
        //   setStore({ token: token });
        // }
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
            process.env.BACKEND_URL + "/api/all_activities",
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
      getGivenTrainer: async (id) => {
        const store = getStore();
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
        const opts = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/activity/" + id,
            opts
          );
          const data = await resp.json();
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
      registerTrainer: async ({
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
        uploadedProfileImageUrl,
      }) => {
        const store = getStore();
        try {
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
                uploadedProfileImageUrl,
              }),
            }
          );
          if (resp.status === 200) {
            const data = await resp.json();
            console.log(data, "new trainer registered after register fetch");
            return true;
          } else return false;
        } catch (error) {
          console.error("There was an error on register trainer fetch", error);
          return false;
        }
      },
      registerTrainee: async ({
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
      }) => {
        const store = getStore();
        try {
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
          console.log(data, "new trainee registered after register fetch");
          return true;
        } catch (error) {
          console.error("There was an error on register trainee fetch", error);
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
        location,
        trainerProfileImageUrl
      ) => {
        const store = getStore();
        const eventDate = date?.toISOString();
        const hour = date?.hour();
        const minutes = date?.minute();
        const lat = location?.lat;
        const lng = location?.lng;
        const address = location?.address;

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/register/activity",
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
                address,
                trainerProfileImageUrl,
              }),
            }
          );
          const data = await resp.json();
          await getActions().verify();
          console.log(data, "New class registered after register fetch");
          return true;
        } catch (error) {
          console.error("There was an error on class register fetch", error);
          return false;
        }
      },
      deleteClass: async (id) => {
        const store = getStore();
        try {
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
          console.log(data, "Class sucessfully deleted !");
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
          const userRole = data["user"].user_role;
          localStorage.setItem("userRole", userRole);
          localStorage.setItem("userName", data["user"].firstName);
          localStorage.setItem("userId", data["user"].id);
          setStore({ user: data["user"] });
          if (userRole == "trainer") {
            localStorage.setItem("trainerId", data["user"].trainer.id);
          } else if (userRole == "trainee") {
            localStorage.setItem("traineeId", data["user"].trainee.id);
          }
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
        localStorage.removeItem("userId");
        localStorage.removeItem("trainerId");
        localStorage.removeItem("traineeId");
        setStore({ token: null });
        setStore({ user: null });
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

          // await getActions().verify();
          return true;
        } catch (error) {
          console.error(
            "There was an error on getAllTypesActivities fetch!!! It was caught by flux.js",
            error
          );
        }
      },
      bookClass: async ({ id, traineeId, traineeName }) => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/book_class`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                activity_id: id,
                trainee_id: traineeId,
                trainee_name: traineeName,
              }),
            }
          );
          const data = await response.json();
          window.alert("Class Sucessfully Booked");
          await getActions().verify();
          return data;
        } catch (error) {
          window.alert("There was an error booking this class.");
        }
      },
      unbookClass: async (activity_id) => {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/unbook_class`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              activity_id,
            }),
          }
        );
        const data = await response.json();
        await getActions().verify();
        return data;
      },
      editTrainee: async ({
        traineeId,
        email,
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
      }) => {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/edit/trainee/${traineeId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              traineeId,
              email,
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
        const data = await response.json();
        await getActions().verify();
        return data;
      },
      editTrainer: async ({
        trainerId,
        email,
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
        uploadedProfileImageUrl,
      }) => {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/edit/trainer/${trainerId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
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
              uploadedProfileImageUrl,
            }),
          }
        );
        const data = await response.json();
        await getActions().verify();
        return data;
      },
      editClass: async ({
        activityId,
        name,
        description,
        duration,
        price,
        eventDate: eventDateFromProps,
        city,
        location,
      }) => {
        const store = getStore();
        const finalDate =
          typeof eventDateFromProps === "string"
            ? dayjs(eventDateFromProps)
            : eventDateFromProps;
        const eventDate = finalDate?.toISOString();
        const hour = finalDate?.hour();
        const minutes = finalDate?.minute();
        const lat = location?.lat;
        const lng = location?.lng;
        const address = location?.address;
        const finalName = store.allTypesActivities.find(
          (el) => el.id === name
        )?.name;
        const finalId = store.allTypesActivities.find(
          (el) => el.id === name
        )?.id;

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + `/api/edit/activity/${activityId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                name: finalName,
                activityCategoryId: finalId,
                description,
                duration,
                price,
                eventDate,
                hour,
                minutes,
                city,
                lat,
                lng,
                address,
              }),
            }
          );
          const data = await resp.json();
          await getActions().verify();
          console.log(data, "new class edited after register fetch");
          return true;
        } catch (error) {
          console.error(
            "There was an error on class edit fetch!!! It was caught by flux.js",
            error
          );
          return false;
        }
      },
      uploadImage: async (file) => {
        let body = new FormData();
        body.append("profile_image", file[0]);
        const opts = {
          method: "POST",
          body,
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/upload",
            opts
          );
          const data = await resp.json();
          setStore({ uploadedProfileImageUrl: data.profile_image_url });
          return data, true;
        } catch (error) {
          console.error("An error occurred fetching the image", error);

          return false;
        }
      },
    },
  };
};

export default getState;
