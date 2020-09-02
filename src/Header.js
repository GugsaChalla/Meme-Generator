import React, {Component} from 'react';


class Header extends Component{
    
    constructor(){
        super();
        this.state={
            defaultImg: "http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png" 
        };
    }
    
    render(){
        return(
            <header>
                <img src={this.state.defaultImg} alt=""></img>
                <p>Meme Generator</p>
            </header>
            
        )
    }
}

export default Header;