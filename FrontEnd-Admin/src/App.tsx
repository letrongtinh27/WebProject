import {
  Admin,
  Resource,
} from "react-admin";
import MovieList from "./components/movie/MovieList";
import { dataProvider } from "./services/DataProvider";
import TheatreList from "./components/theatre/TheatreList";
import ShowTimeList from "./components/showtime/ShowTimeList";

import {authProvider} from "./services/authProvider";
import UserList from "./components/user/userList";
import TicketList from "./components/ticket/ticketList";
import MovieShow from "./components/movie/MovieShow";
import TheatreEdit from "./components/theatre/TheatreEdit";
import {ShowTimeEdit} from "./components/showtime/ShowTimeEdit";
import TheatreCreate from "./components/theatre/TheatreCreate";
import {ShowTimeCreate} from "./components/showtime/ShowTimeCreate";
import MovieCreate from "./components/movie/MovieCreate";

const App = () => {
  return (
    <Admin title="Admin"
           dataProvider={dataProvider}
           authProvider={authProvider}>
        <Resource name={'movies'}
                  list={MovieList}
                  edit={MovieShow}
                  create={MovieCreate}
                  // recordRepresentation={(movies) => movies.id}
                  options={{label: 'Movies'}}/>
          <Resource name="theatres"
                    list={TheatreList}
                    edit={TheatreEdit}
                    options={{label: 'Theatres'}}
                    create={TheatreCreate}
          />
          <Resource name="shows"
                    list={ShowTimeList}
                    edit={ShowTimeEdit}
                    create={ShowTimeCreate}
                    options={{label: 'Show Time'}} />
          <Resource name="users" list={UserList} options={{label: 'User'}} />
          <Resource name="tickets"
                    list={TicketList}
                    options={{label: 'Ticket'}} />
      </Admin>
  )

}

export default App;

