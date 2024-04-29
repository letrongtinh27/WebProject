import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import MovieList from "./components/movie/MovieList";
import {dataProvider} from "./services/DataProvider";
import TheatreList from "./components/theatre/TheatreList";
import ShowTimeList from "./components/showtime/ShowTimeList";
import Login from "./Layout/Login";
import {authProvider} from "./authProvider";
import UserList from "./components/user/userList";
import TicketList from "./components/ticket/ticketList";
// import MovieShow from "./components/movie/MovieShow";

const App = () => {
  return (
      <Admin
          loginPage={Login}
          title="Admin"
          dataProvider={dataProvider}
          authProvider={authProvider}
          disableTelemetry
      >
          <Resource name={'movies'}
                    list={MovieList}
                    // edit={MovieShow}
                    options={{label: 'Movies'}}
                    recordRepresentation={(movies) => movies.id }
          />
          {/*<Resource name="users" list={MovieList} show={ShowGuesser} recordRepresentation="name" />*/}
          <Resource name="theatres" list={TheatreList} options={{label: 'Theatres'}} />
          <Resource name="show_time" list={ShowTimeList} options={{label: 'Show Time'}} />
          <Resource name="users" list={UserList} options={{label: 'User'}} />
          <Resource name="tickets" list={TicketList} options={{label: 'Ticket'}} />
      </Admin>
  )

}

export default App;

// export const App = () => <Admin></Admin>;
