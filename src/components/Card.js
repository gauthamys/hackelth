import { Component } from "react";

class Card extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='ml-4 mr-4 resize relative bg-gradient-to-tl from-pink-500 to-red-600 h-16 mt-6 text-2xl text-white p-5'>
                Devices with least health scores : 
            </div>
            
        )
    }
}

export default Card;