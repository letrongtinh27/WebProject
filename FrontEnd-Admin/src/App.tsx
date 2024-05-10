import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import MovieList from "./components/movie/MovieList";
import { dataProvider } from "./services/DataProvider";
import TheatreList from "./components/theatre/TheatreList";
import ShowTimeList from "./components/showtime/ShowTimeList";

import Login from "./Layout/Login";
import {authProvider} from "./authProvider";
import UserList from "./components/user/userList";
import TicketList from "./components/ticket/ticketList";
import MovieShow from "./components/movie/MovieShow";

// import MovieShow from "./components/movie/MovieShow";

const App = () => {
  return (
    <Admin title="Admin"
           dataProvider={dataProvider}
           authProvider={authProvider}>
        <Resource name={'movies'}
                  list={MovieList}
                  edit={MovieShow}
                  // recordRepresentation={(movies) => movies.id}
                  options={{label: 'Movies'}}/>
          <Resource name="theatres" list={TheatreList} options={{label: 'Theatres'}} />
          <Resource name="shows" list={ShowTimeList} options={{label: 'Show Time'}} />
          <Resource name="users" list={UserList} options={{label: 'User'}} />
          <Resource name="tickets" list={TicketList} options={{label: 'Ticket'}} />
      </Admin>
  )

}

export default App;

