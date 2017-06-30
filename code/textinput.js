
import React , {Component} from 'react';
import {View , Text , TextInput} from 'react-native'

export default class Input extends Component {
	constructor(props){
		super(props);
		let data = this.props.savings;
		data = data.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		
		this.state = {
			savings:data,
		}

	}
	
	componentWillReceiveProps(nextProps){
		console.log(nextProps);
		let data = nextProps.savings;
		data = data.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		this.setState({
			savings:data,
		})
	}
	check(data){
			let len = data.length;
		    let z = 0;
		    let string1="";
		    let string2="";

		    data=data.trim();
		    data=data.replace(/\,/g,'');
		    z = data.length - 1;
		    if(len===0){
		          this.setState({
						savings:data,
					});
		    }
		    
		  
		    else if(data.charAt(z)==='.')
		        {
		   
		            data=data.substring(0,z);
			         
			          data = data.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
			          this.setState({
						savings:data,
					});
		          
		       	}

		    else if(data.charAt(z)==='-')
		        {
		              data=data.substring(0,z);
			          data = data.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
			          this.setState({
						savings:data,
					});
		        }
		        else
		        {
		        	data = data.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		          this.setState({
						savings:data,
					});
		        }
		        
	}

	submit(value){
		
		console.log(typeof(value));
		this.props.handle_savings(value);
	}

	render(){
		let savings = this.props.savings;
		return(
			<View>
				<TextInput 
				style = {{width:90,textAlign:'center',fontSize:16,fontWeight:'bold',color:'#595959'}}
				value = { (this.state.savings).toString() }
				keyboardType='numeric'
				onChangeText = {(value) => {this.check(value)}}
				onEndEditing= {(event) =>{ this.submit(event.nativeEvent.text)}}

				/>
			</View>

			)
	}
}