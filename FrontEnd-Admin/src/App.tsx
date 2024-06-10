import {
  Admin, CustomRoutes, Logout,
  Resource, UserMenu,
} from "react-admin";
import MovieList from "./components/movie/MovieList";
import { dataProvider } from "./services/DataProvider";
import TheatreList from "./components/theatre/TheatreList";
import ShowTimeList from "./components/showtime/ShowTimeList";
import {authProvider} from "./services/authProvider";
import UserList from "./components/user/userList";
import TicketList from "./components/ticket/ticketList";
import MovieEdit from "./components/movie/MovieEdit";
import TheatreEdit from "./components/theatre/TheatreEdit";
import {ShowTimeEdit} from "./components/showtime/ShowTimeEdit";
import TheatreCreate from "./components/theatre/TheatreCreate";
import {ShowTimeCreate} from "./components/showtime/ShowTimeCreate";
import MovieCreate from "./components/movie/MovieCreate";
import UserEdit from "./components/user/UserEdit";
import UserCreate from "./components/user/UserCreate";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import TicketShow from "./components/ticket/ticketShow";
import UserShow from "./components/user/UserShow";
import React from "react";
import MovieShow from "./components/movie/MovieShow";
import {ShowTimeShow} from "./components/showtime/ShowTimeShow";
import TheatreShow from "./components/theatre/ThetreShow";
import {Route} from "react-router-dom";
import {ProfileEdit} from "./Layout/ProfileEdit";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpVYv95S1VXJQmSapueenEfllvrOcSKo8",
  authDomain: "admin-a7c28.firebaseapp.com",
  projectId: "admin-a7c28",
  storageBucket: "admin-a7c28.appspot.com",
  messagingSenderId: "298063824418",
  appId: "1:298063824418:web:5fbcc67c48a916870b2c7b",
  measurementId: "G-8HYVVGZYC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App = () => {
  return (
      <Admin title="Admin" dataProvider={dataProvider} authProvider={authProvider}
             // layout={MyLayout}
      >
        <CustomRoutes>
          <Route
              key="my-profile"
              path="/my-profile"
              element={<ProfileEdit/>}
          />
        </CustomRoutes>

        <Resource name={'movies'}
                  list={MovieList}
                  edit={MovieEdit}
                  create={MovieCreate}
                  show={MovieShow}
                  options={{label: 'Movies'}}/>
        <Resource name="theatres"
                  list={TheatreList}
                  edit={TheatreEdit}
                  show={TheatreShow}
                  options={{label: 'Theatres'}}
                  create={TheatreCreate}
        />
        <Resource name="shows"
                  list={ShowTimeList}
                  edit={ShowTimeEdit}
                  show={ShowTimeShow}
                  create={ShowTimeCreate}
                  options={{label: 'Show Time'}} />
        <Resource name="users"
                  list={UserList}
                  show={UserShow}
                  create={UserCreate}
                  options={{label: 'User'}} />
        <Resource name="tickets"
                  list={TicketList}
                  show={TicketShow}
                  options={{label: 'Ticket'}} />
      </Admin>
  )

}

export default App;

