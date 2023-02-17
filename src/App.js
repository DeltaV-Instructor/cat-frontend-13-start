import React from "react";
import axios from "axios";
import Cats from "./components/Cats.js";
import CreateCat from "./components/CreateCat";
import Nav from "./components/Nav";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";


let SERVER = process.env.REACT_APP_SERVER;
//today we are going to add some UI components to build out our functionality and to do that today we are going to modualize our cats

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
    };
  }

  getCats = async () => {
    // console.log(SERVER);
    try {
      let results = await axios.get(`${SERVER}/cats`);
      console.log("results from api", results);
      this.setState({
        cats: results.data,
      });
    } catch (error) {
      console.log("we have an error: ", error.response.data);
    }
  };

  handleCatSubmit = async (event) => {
    event.preventDefault();
    let newCat = {
      name: event.target.name.value,
      color: event.target.color.value,
      spayNeuter: event.target.spayNeuter.checked,
      location: event.target.location.value,
    };
    this.postCat(newCat);
  };

  // make api call for our new cat
  postCat = async (newCatObject) => {
    //so we can post to our db
    try {
      //we need a url route
      let url = `${SERVER}/cats`;
      let createdCat = await axios.post(url, newCatObject);
      console.log("Back from the server the new cat: ", createdCat);
      // this.getCats(); // why is this not great.
      //do this to show the updated state right after the add without having to refresh the page
      //OR better cause REACT
      this.setState({
        cats: [...this.state.cats, createdCat.data],
      });
    } catch (error) {
      console.log("we hav an error: ", error.response.data);
    }
  };

  //create a way to delete our cats
  deleteCats = async (id) => {
    try {
      //create our route to server
      let url = `${SERVER}/cats/${id}`;
      //call the server and delete the cat, now it will be gone from our db
      await axios.delete(url);
      //then we should remove it from our local state.
      let updatedCats = this.state.cats.filter((cat) => cat._id !== id);
      this.setState({
        cats: updatedCats,
      });
    } catch (error) {
      console.log("we have an error: ", error.response.data);
    }
  };

  //net effect is that when the site loads (I should say this specific componenet loads), the data will be displayed the getCats will be invoked when component mounts after all its tasks.
  componentDidMount() {
    this.getCats();
  }

  render() {
    return (
      <>
      <Nav />
        <Container className="mt-5">
              <h1>World of Cats</h1>
                <div>
                  {this.state.cats.length > 0 && (
                    <>
                      <Cats
                        cats={this.state.cats}
                        deleteCats={this.deleteCats}
                      />
                    </>
                  )}
                </div>
                <CreateCat handleCatSubmit={this.handleCatSubmit} />
        </Container>
        <Outlet />
      </>
    );
  }
}

export default App;
