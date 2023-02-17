import React from "react";
//lets add some bootstrap
import { Container, ListGroup, Button } from "react-bootstrap";
class Cats extends React.Component {
  render() {
    console.log(this.props.cats);
//Cat is a nested component
    let cats = this.props.cats.map((cat) => 
    <Cat cat={cat} key={cat._id} deleteCats={this.props.deleteCats}/>
  );

    return (
      <Container>
        <ListGroup>{cats}</ListGroup>
      </Container>
    );
  }
}

//two components in the same file they belong together and Cats can only use Cat
class Cat extends Cats {
  render() {
    return (
      <ListGroup.Item>
        {this.props.cat.name} is {this.props.cat.color}
        <Button variant="success" onClick={() => this.props.deleteCats(this.props.cat._id)}>Delete</Button>

      </ListGroup.Item>
    );
  }
}

export default Cats;
