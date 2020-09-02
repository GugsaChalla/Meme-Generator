import React,{Component} from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

class MemeGenerator extends Component {
    
    constructor(){
        super();
        this.state={
            topText:"",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            newImg: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    async componentDidMount(){
        let response = await fetch("https://api.imgflip.com/get_memes");
        let data = await response.json();
        const{memes} = data.data;

        this.setState({newImg:memes});
    }

    handleChange(event){
        const{name,value} = event.target;
        this.setState({
            [name]:value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        let num = Math.round(Math.random()*100);
        const {url} = this.state.newImg[num];
        this.setState({randomImg:url});
    }

     handleClick(e){
        e.preventDefault();
        domtoimage.toBlob(document.getElementById("photo"),{height:999,width:999}).then(function(blob){
            saveAs(blob, "meme.png");
        })
        
        
        
    }

    render(){
        return(
            <div>
                <div className="meme" id="photo">
                   
                        <h2 className="top">{this.state.topText}</h2>
                        <img id= "original"src={this.state.randomImg} alt="" onClick={this.handleClick}></img>
                        <h2 className="bottom">{this.state.bottomText}</h2>
                  
                </div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                    type="text"
                    name="topText"
                    value={this.state.topText}
                    onChange={this.handleChange}
                    placeholder="Enter top text here"
                    ></input>

                    <input
                    type="text"
                    name="bottomText"
                    value={this.state.bottomText}
                    onChange={this.handleChange}
                    placeholder="Enter bottom text here"
                    ></input>

                    <button>Create</button>
                </form>
                <h1>Click Meme to Download!</h1>
            </div>
        )
    }
}

export default MemeGenerator;