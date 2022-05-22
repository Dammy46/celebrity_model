import React, { Component } from 'react';

import FaceRecognition from './components/Image__/image';
import Navigation from './components/Navbar__/navigation';
import SignIn from './components/Signin__/sign';
import Register from './components/Register__/register';
import Logo from './components/Logo__/logo';
import ImageLinkForm from './components/Input__/input';
import Rank from './components/Rank__/rank';

import './App.css';

const clearState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = clearState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const faceModel = data.outputs[0].data.regions[0].region_info.bounding_box;
    const output = data.outputs[0].data.regions[0].data.concepts;
    const image = document.getElementById('inputImg');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceModel.left_col * width,
      topRow: faceModel.top_row * height,
      rightCol: width - faceModel.right_col * width,
      bottomRow: height - faceModel.bottom_row * height,
      concept__name: output[0].name,
      concept__value: output[0].value,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPicture = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://rocky-fjord-74712.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          fetch('https://rocky-fjord-74712.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, count));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(res));
      })
      .catch((err) => console.log(err));
  };


  routeChng = (page) => {
    if (page === 'signout') {
      this.setState(clearState);
    } else if (page === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: page });
  };

  toggleModal = () => {
    this.setState((state) => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  };
  render() {
    const { isSignedIn, imageUrl, route, box,  } = this.state;
    return (
      <div className="App">
        

        {route === 'home' ? (
          <div>
            <Navigation validate={isSignedIn} routeChange={this.routeChng} />

            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onPicture}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <SignIn
            loadUser={this.loadUser}
            routeChange={this.routeChng}
          />
        ) : (
          <Register loadUser={this.loadUser} routeChange={this.routeChng} />
        )}
      </div>
    );
  }
}

export default App;
