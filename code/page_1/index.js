'use strict'
import React , { Component } from 'react';
import { Text , View , Animated , AppRegistry ,StyleSheet ,Dimensions , TouchableOpacity,TouchableWithoutFeedback,TouchableHighlight} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigator,} from 'react-navigation';

const width =Dimensions.get('window').width;
export default class Welcome extends Component{

	static navigationOptions = {
    		title: 'FINANCIAL CALCULATORS',
	};

	constructor(props){
		super(props);
		this.state = {
			position : new Animated.Value(0),
			flag:0,
		}

	}

	componentWillMount(){
		Animated.spring(
			this.state.position,{
				toValue:1,
				//duration:2000,
				friction:3.45,
				tension:1,
			}).start();
	}

	handle(Value){		
		 if(this.state.flag===0)
			{
				const { navigate } = this.props.navigation;
				this.state.flag = 1;
				console.log('flag '+this.state.flag);
				navigate(Value,{handle_flag:this.handle_flag.bind(this)});
			}
	}

	handle_flag(){
		if(this.state.flag===1){
		console.log("///..,,m,.");
		console.log('flagb '+this.state.flag);
			this.setState({
			flag:0,
		})
			console.log('flaga '+this.state.flag);
		}
	}
	
	render(){

		const { navigate } = this.props.navigation;
		//console.log("***"+navigate);
		var translateY = this.state.position.interpolate({
			inputRange:[0,1],
			outputRange:[800,1],
		})
		const transform1 = [{translateY}];
		var translateY = this.state.position.interpolate({
			inputRange:[0,1],
			outputRange:[1000,1],
		})
		const transform2 = [{translateY}];
		var translateY = this.state.position.interpolate({
			inputRange:[0,1],
			outputRange:[1200,1],
		})
		const transform3 = [{translateY}];
		
		var translateY = this.state.position.interpolate({
			inputRange:[0,1],
			outputRange:[1400,1],
		})
		const transform4 = [{translateY}];
		var translateY = this.state.position.interpolate({
			inputRange:[0,1],
			outputRange:[1600,1],
		})
		const transform5 = [{translateY}];
		return(
			<View style = {{flex:1,backgroundColor:'#999999'}}>

				<Animated.View style = {{transform:transform1,flex:1}}>
				
				<TouchableOpacity onPress = {()=> this.handle('sip')} style = {[styles.view]}>
					<View style = {{flexDirection:'row'}}>
						<View style = {{flex:1,alignItems:'center',justifyContent:'center',borderRadius:100}}>
							<Icon name="sentiment-satisfied" size={30} color="#4F8EF7" />
						</View>
						<View style = {{flex:3,justifyContent:'center',alignItems:'center'}}>
							<Text style = {styles.text}>SIP Calculator</Text>
						</View>
						<View style = {{flex:1}}>
							<Icon name="keyboard-arrow-right" size={40} color="#4F8EF7" />
						</View>
					</View>
				</TouchableOpacity>
				
				</Animated.View>

				<Animated.View style = {{transform:transform1,flex:1}}>
				<TouchableOpacity onPress = {()=> this.handle('delay')} style = {[styles.view]}>
					<View style = {{flexDirection:'row'}}>
						<View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
							<Icon name="sentiment-dissatisfied" size={30} color="#4F8EF7" />
						</View>
						<View style = {{flex:3,justifyContent:'center',alignItems:'center'}}>
							<Text style = {styles.text}>Cost of Delay in SIP</Text>
						</View>
						<View style = {{flex:1}}>
							<Icon name="keyboard-arrow-right" size={40} color="#4F8EF7" />
						</View>
					</View>
				</TouchableOpacity>
				</Animated.View>

				<Animated.View style = {{transform:transform1,flex:1}}>
				<TouchableOpacity onPress = {()=> this.handle('Stepup')} style = {[styles.view]}>
					<View style = {{flexDirection:'row'}}>
						<View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
							<Icon name="sentiment-very-satisfied" size={30} color="#4F8EF7" />
						</View>
						<View style = {{flex:3,justifyContent:'center',alignItems:'center'}}>
							<Text style = {styles.text}>Step up SIP Calculator</Text>
						</View>
						<View style = {{flex:1}}>
							<Icon name="keyboard-arrow-right" size={40} color="#4F8EF7" />
						</View>
					</View>
				</TouchableOpacity>
				</Animated.View>

				<Animated.View style = {{transform:transform1,flex:1}}>
				<TouchableOpacity onPress = {()=> this.handle('education')} style = {[styles.view]}>
					<View style = {{flexDirection:'row'}}>
						<View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
							<Icon name="school" size={30} color="#4F8EF7" />
						</View>
						<View style = {{flex:3,justifyContent:'center',alignItems:'center'}}>
							<Text style = {styles.text}>Education Calculator</Text>
						</View>
						<View style = {{flex:1}}>
							<Icon name="keyboard-arrow-right" size={40} color="#4F8EF7" />
						</View>
					</View>
				</TouchableOpacity>
				</Animated.View>

				<Animated.View style = {{transform:transform1,flex:1}}>
				<TouchableOpacity onPress = {()=> this.handle('retirement')} style = {[styles.view]}>
					<View style = {{flexDirection:'row'}}>
						<View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
							<Icon name="whatshot" size={30} color="#4F8EF7" />
						</View>
						<View style = {{flex:3,justifyContent:'center',alignItems:'center'}}>
							<Text style = {styles.text}>Retirement Calculator</Text>
						</View>
						<View style = {{flex:1}}>
							<Icon name="keyboard-arrow-right" size={40} color="#4F8EF7" />
						</View>
					</View>
				</TouchableOpacity>
				</Animated.View>
			</View>
			

		)
	}
}

const styles = StyleSheet.create({
	view:{
		flex:1,
		//padding:10,
		borderWidth:0.15,
		borderRadius:4,
		marginTop:width/40,
		marginLeft:width/10,
		marginRight:width/10,
		marginBottom:width/30,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'#ffffff',
	},
	text:{
		fontWeight:'bold',
		fontSize:17,
	}
})
 

// module.exports = Welcome;