import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/img/ImageLinkForm";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/face/FaceRecognition";
import Particles from "react-tsparticles";
import React, { Component } from "react";
import Clarifai from "clarifai";
import Signin from "./components/signin/Signin";
import Register from "./components/Register/Register";
const app = new Clarifai.App({
  apiKey: "eea96e5f4d384cf5902e3ea8e92049b6",
});
const particlesInit = (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};

const particlesLoaded = (container) => {
  console.log(container);
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: "",
      box: {},
      route: "signin ",
      isSignedIn: false
    };
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };
  OnInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };
  onRouteChange = (route) => {
    if (route==='signout'){
      this.setState({isSignedIn: false})
    } else if(route==='home'){
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
  };
  //change the route when u click on submit to the home page
  render() {
   const {isSignedIn,imgUrl,route ,box}=this.state;
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "",
              },
            },
            fpsLimit: 100,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 300,
                  duration: 2,
                  opacity: 0.6,
                  size: 10,
                },
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 100,
                enable: true,
                opacity: 0.6,
                width: 1,
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 600,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "square",
              },
              size: {
                random: true,
                value: 3,
              },
            },
            detectRetina: true,
          }}
        />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              OnInputChange={this.OnInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imgUrl={imgUrl} />
          </div>
        ) : route === "signin" 
         ? <Signin onRouteChange={this.onRouteChange} />
         : <Register onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
