import {
  Admin, CustomRoutes, defaultTheme, Logout, radiantDarkTheme, radiantLightTheme,
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
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import StadiumOutlinedIcon from '@mui/icons-material/StadiumOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import Dashboard from "./components/dashboard/Dashboard";

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
import {ProfileEdit, ProfileProvider} from "./Layout/ProfileEdit";
import {LayoutCustom} from "./Layout/LayoutCustom";
import Cookies from "js-cookie";

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
const role = Cookies.get("role");
console.log(role)

const App = () => {
  return ( role === "admin" ?
          <>
      <Admin
          dashboard={Dashboard}
          title="Admin" dataProvider={dataProvider} authProvider={authProvider}
          theme={radiantDarkTheme}
          darkTheme={radiantLightTheme}
          layout={LayoutCustom}

      >
        <CustomRoutes>
          <Route path="/profile/*" element={<ProfileProvider>
            <ProfileEdit/></ProfileProvider>}/>
        </CustomRoutes>

        <Resource name={'movies'}
                  icon={SlideshowOutlinedIcon}
                  list={MovieList}
                  edit={MovieEdit}
                  create={MovieCreate}
                  show={MovieShow}
                  options={{label: 'Movies'}}
        />
        <Resource name="theatres"
                  icon={StadiumOutlinedIcon}
                  list={TheatreList}
                  edit={TheatreEdit}
                  show={TheatreShow}
                  options={{label: 'Theatres'}}
                  create={TheatreCreate}
        />
        <Resource name="shows"
                  icon={VisibilityOutlinedIcon}
                  list={ShowTimeList}
                  edit={ShowTimeEdit}
                  show={ShowTimeShow}
                  create={ShowTimeCreate}
                  options={{label: 'Show Time'}} />
        <Resource name="users"
                  icon={PersonOutlineOutlinedIcon}
                  list={UserList}
                  show={UserShow}
                  create={UserCreate}
                  options={{label: 'Users'}} />
        <Resource name="tickets"
                  icon={ConfirmationNumberOutlinedIcon}
                  list={TicketList}
                  show={TicketShow}
                  options={{label: 'Tickets'}} />
      </Admin> </>
          : <>
            <Admin
                dashboard={Dashboard}
                title="Admin" dataProvider={dataProvider} authProvider={authProvider}
                theme={radiantDarkTheme}
                darkTheme={radiantLightTheme}
                layout={LayoutCustom}
            >
              <CustomRoutes>
                <Route path="/profile/*" element={<ProfileProvider>
                  <ProfileEdit/></ProfileProvider>}/>
              </CustomRoutes>

              <Resource name={'movies'}
                        icon={SlideshowOutlinedIcon}
                        list={MovieList}
                        show={MovieShow}
                        options={{label: 'Movies'}}
              />
              <Resource name="theatres"
                        icon={StadiumOutlinedIcon}
                        list={TheatreList}
                        show={TheatreShow}
                        options={{label: 'Theatres'}}
              />
              <Resource name="shows"
                        icon={VisibilityOutlinedIcon}
                        list={ShowTimeList}
                        show={ShowTimeShow}
                        options={{label: 'Show Time'}} />
              <Resource name="users"
                        icon={PersonOutlineOutlinedIcon}
                        list={UserList}
                        show={UserShow}
                        options={{label: 'Users'}} />
              <Resource name="tickets"
                        icon={ConfirmationNumberOutlinedIcon}
                        list={TicketList}
                        show={TicketShow}
                        options={{label: 'Tickets'}} />
            </Admin>
          </>
  )
}

export default App;

