'use strict'
import React , { Component } from 'react';
import { Text , View , Animated ,StyleSheet , ScrollView} from 'react-native';


export default class Result extends Component{
	constructor(props){
		super(props);
		this.state = {
			text:new Animated.Value(0),
			opac:new Animated.Value(1),
			text2:new Animated.Value(0),
			text3:new Animated.Value(0),
		}
	}
	componentWillMount(){
		Animated.stagger(1200,[
			Animated.timing(
			this.state.text,
			{
				toValue:1,
				duration:2000,
			}
		),

		Animated.timing(
			this.state.text2,
			{
				toValue:1,
				duration:2000,
			}
		),
		Animated.timing(
			this.state.text3,
			{
				toValue:1,
				duration:2000,
			}
		),]).start();
		
		// Animated.timing(
		// 	this.state.opac,{
		// 		toValue:1,
		// 		duration:2000,
		// 	}).start();
	}
	componentWillUpdate(){
		this.state.opac.setValue(0);

		Animated.timing(
			this.state.opac,{
				toValue:1,
				duration:2000,
			}).start();
		
	}

	render(){
		var translateX = this.state.text.interpolate({
			inputRange:[0,1],
			outputRange:[600,1]
		});
		const transform1 = [{translateX}];
		var translateX = this.state.text2.interpolate({
			inputRange:[0,1],
			outputRange:[600,1]
		});
		const transform2 = [{translateX}];

		var translateX = this.state.text3.interpolate({
			inputRange:[0,1],
			outputRange:[600,1]
		});
		const transform3 = [{translateX}];

		var opacity = this.state.opac.interpolate({
			inputRange:[0,1],
			outputRange:[0,1]
		});

		const loss_sip_amount = (this.props.sip_amount - this.props.sip_delay).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		//const color = "rgba(0,0,0,"+opacity+")";
		return(
			<ScrollView>
			<View >
				<Animated.View style = {{transform:transform1}}>
					<View style = {{flexDirection:'row',justifyContent:'center'}}>
						<Text style = {styles.text}>Delay of  </Text>					
						<Animated.View style = {{opacity}}>
							<Text style = {styles.value}>{this.props.delay} </Text>
						</Animated.View>
						<Text style = {styles.text}> months in starting your SIP will </Text>
					</View>
				</Animated.View>

				<Animated.View style = {{transform:transform2}}>
					<View style = {{flexDirection:'row',justifyContent:'center'}}>
						<Text style = {styles.text}>cause a notional Loss of Rs. </Text>					
						<Animated.View style = {{opacity}}>
							<Text style = {styles.value}>{loss_sip_amount}/- </Text>
						</Animated.View>
						<Text style = {styles.text}> </Text>
					</View>
				</Animated.View>

				<Animated.View style = {{transform:transform3}}>
					<View style = {{flexDirection:'row',justifyContent:'center'}}>
						<Text style = {styles.text}>in the final value of your investment</Text>	
					</View>
				</Animated.View>
			</View>
			</ScrollView>
			)
	}
}
 
const styles = StyleSheet.create({
	text:{
		fontSize:17,
		fontWeight:'normal',
		color:'white',
		fontStyle:'italic'
	},
	value:{
		fontSize:19,
		fontWeight:'bold',
		color:'#0000b3',
	}
})