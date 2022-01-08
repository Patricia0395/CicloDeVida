import { Component } from 'react'
import Gif from './components/Gif';
import NavBar from './components/NavBar';
import './App.css';


export default class App extends Component {

  constructor(){
    super();

    this.state = {
      gifs : []
    }
    this.addGif = this.addGif.bind(this)

  }
  
  componentDidMount(){
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=6jo1aqZ0lrquWym83jeWWFUvGIKawqjx&limit=4&rating=g')
    .then(response => response.json())
    .then(info => this.setState({
      gifs : info.data
    }))
    .catch(error => console.log(error))
  }

  componentDidUpdate(){
    console.log('El componente se a actualizado');
  }

  addGif(){
    fetch('https://api.giphy.com/v1/gifs/random?api_key=6jo1aqZ0lrquWym83jeWWFUvGIKawqjx&tag=&rating=g')
    .then(response => response.json())
    .then(info => {
      this.setState({
      gifs : [
        ...this.state.gifs,
        info.data
      ]
    })
  })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <>
      <NavBar addGif = {this.addGif} />
      <div className="container mt-4">
  
      <div className="row text-center">

        {
           this.state.gifs.length === 0
           ?
           <p>cargando...</p>
           :
          this.state.gifs.map(gif => <Gif key={gif.id} image ={gif.images.original.url} title = {gif.title} />)
        }
  
      </div>
    </div>
  
    </>
    )
  }
}
