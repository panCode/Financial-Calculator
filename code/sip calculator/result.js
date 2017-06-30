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
		const savings = this.props.savings.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		const period = this.props.period.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		const sip_amount = this.props.sip_amount.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		//const sip_amount = (this.props.sip_amount - this.props.sip_delay).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		return(
			<ScrollView>
			<View >
				<Animated.View style = {{transform:transform1}}>
					<View style = {{flexDirection:'row',justifyContent:'center'}}>
						<Text style = {styles.text}>If you invest Rs. </Text>					
						<Animated.View style = {{opacity}}>
							<Text style = {styles.value}>{savings}/- </Text>
						</Animated.View>
						<Text style = {styles.text}> per month for </Text>
					</View>
				</Animated.View>

				<Animated.View style = {{transform:transform2}}>
					<View style = {{flexDirection:'row',justifyContent:'center'}}>
						<Text style = {styles.text}>a period of </Text>					
						<Animated.View style = {{opacity}}>
							<Text style = {styles.value}>{period} </Text>
						</Animated.View>
						<Text style = {styles.text}>years your SIP amount </Text>
					</View>
				</Animated.View>

				<Animated.View style = {{transform:transform3}}>
					<View style = {{flexDirection:'row',justifyContent:'center'}}>
						<Text style = {styles.text}>will grow to Rs. </Text>	
						<Animated.View style = {{opacity}}>
							<Text style = {[styles.value]}>{sip_amount}/- </Text>
						</Animated.View>
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