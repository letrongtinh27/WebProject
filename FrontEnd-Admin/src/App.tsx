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
// import MovieShow from "./components/movie/MovieShow";

const App = () => {
  return (
    <Admin title="Admin" dataProvider={dataProvider}>
      {/* <Resource name={'movies'}
                    list={MovieList}
                    edit={MovieShow}
                    options={{label: 'Movies'}}
                    recordRepresentation={(movies) => movies.id }
          /> */}
      {/*<Resource name="users" list={MovieList} show={ShowGuesser} recordRepresentation="name" />*/}
      <Resource
        name="theatres"
        list={TheatreList}
        options={{ label: "Theatres" }}
      />
      <Resource
        name="show_time"
        list={ShowTimeList}
        options={{ label: "Show Time" }}
      />
    </Admin>
  );
};

export default App;

// export const App = () => <Admin></Admin>;
