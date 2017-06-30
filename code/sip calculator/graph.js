'use strict'
import React , {Component} from 'react';
import {Text,View,ScrollView,Dimensions,StyleSheet} from 'react-native';
import { SmoothLine } from 'react-native-pathjs-charts';

export default class Graph extends Component{
	constructor(props){
		super(props);

	}

	render(){
		const {width , height } = Dimensions.get('window');
		let {savings , period , ror , sip_amount} = this.props;
		let graph_data =[];
		let invested_data = [];
		let sip_data = [];

		for(let i=0;i<=period;++i)
	 	{
	 		let coordinate = {};
	 		coordinate["x"] = i;
	 		
	 		coordinate["y"] = 12*i*(savings);
	 		invested_data.push(coordinate);
	 		
	 	}
	
	 	for(let i=0;i<=period;++i)
	 	{
	 		let coordinate = {};
	 		coordinate["x"] = i;
	 		let sum = 0;
	 		for(let j =1;j<=i*12;++j)
	 		{
	 			sum+=(savings*Math.pow((1+ror/(12*100)),j));
	 		}

	 		coordinate["y"] = sum;
	 		sip_data.push(coordinate);	
	 	}

	 	
	 	graph_data.push(invested_data,sip_data);

	 	let options = {
					    width: width/1.5,
					    height: height/2.7,
					    color: '#2980B9',
					    margin: {
					      top: 0,
					      left: width/100,
					      bottom: height/40,
					      right: width/60
					    },
					    animate: {
					      type: 'delayed',
					      duration: 200
					    },
					    axisX: {
					      showAxis: true,
					      showLines: true,
					      showLabels: true,
					      showTicks: true,
					      zeroAxis: false,
					      orient: 'bottom',
					      label: {
					        fontFamily: 'Arial',
					        fontSize: 10,
					        fontWeight: true,
					        fill: '#34495E'
					      }
					    },
					    axisY: {
					      showAxis: true,
					      showLines: true,
					      showLabels: true,
					      showTicks: true,
					      zeroAxis: false,
					      orient: 'right',
					      label: {
					        fontFamily: 'Arial',
					        fontSize: 10,
					        fontWeight: true,
					        fill: '#34495E'
					      }
					    },
					 }

		return(
			<ScrollView>
			<View style = {{alignItems:'center'}}>
				<View style = {{alignItems:'center'}}>
					<Text style={{fontWeight:'bold',fontSize:20,color:'#000000'}}>Growth Chart</Text>
				</View>
				<View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
					<View style = {{alignItems:'flex-end',justifyContent:'center',height:80,width:50}}>
						<Text style = {{transform: [{ rotate: '270deg'}],color:'#000000',textAlign:'center'}}>Amount (Rs)</Text>
					</View>
					<View style={styles.container}>
						<SmoothLine data={graph_data} options={options} xKey='x' yKey='y' />
						<Text style = {{fontWeight:'normal',color:'#000000'}}>Period in Years</Text>
					</View>
				</View>
			</View>
			</ScrollView>

			)
	}
} 

const styles = StyleSheet.create({
	container: {
    //height:450,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});