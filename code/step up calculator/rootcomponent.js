'use strict'
import React , {Component} from 'react';
import { Text, View , Animated , ScrollView ,Dimensions , StyleSheet ,Slider} from 'react-native';

import Input from '../textinput';
import Graph from './graph';
import Result from './result'
export default class Stepup extends Component{
	constructor(props){
		super(props);
		this.state = {
			savings:25000,
			period:10,
			ror:10,
			increment:1000,
			sip_amount:5926353,
		}

	}

	componentWillUnmount(){
      //console.log('dooo');
      const {params} = this.props.navigation.state;
      params.handle_flag();
    }

    handle_savings(value){
    	value=value.toString().replace(/\,/g,'');      
        if(value === '')value = 0;
        const a = Number(value);
		const b = this.state.period*12 ;
		const c = this.state.ror ; 
		const d = this.state.increment;
		let sum = 0;
		var k =-1;
		for(var i=0 ; i < b ; ++i){
			if(i%12===0)++k;
			sum+=Number(( Number(k*d) + Number(a) )*Math.pow((1+c/(12*100)),b-i));
			
		}
		sum=sum.toFixed();
		this.setState({
			savings:a,
			sip_amount:sum,
		})
    }
    handle_period(value){
    	const a = this.state.savings;
		const b = Number(value)*12 ;
		const c = this.state.ror ; 
		const d = this.state.increment;
		let sum = 0;
		var k =-1;
		for(var i=0 ; i < b ; ++i){
			if(i%12===0)++k;
			sum+=Number(( Number(k*d) + Number(a) )*Math.pow((1+c/(12*100)),b-i));
			
		}
		sum=sum.toFixed();
		this.setState({
			period:value,
			sip_amount:sum,
		})
    }
    handle_ror(value){
    	const a = this.state.savings;
		const b = this.state.period*12 ;
		const c = Number(value) ; 
		const d = this.state.increment;
		let sum = 0;
		var k =-1;
		for(var i=0 ; i < b ; ++i){
			if(i%12===0)++k;
			sum+=Number(( Number(k*d) + Number(a) )*Math.pow((1+c/(12*100)),b-i));
			
		}
		sum=sum.toFixed();
		this.setState({
			ror:c,
			sip_amount:sum,
		})
    }
    handle_increment(value){
    	const a = this.state.savings;
		const b = this.state.period*12 ;
		const c = this.state.ror ; 
		const d = Number(value);
		let sum = 0;
		var k =-1;
		for(var i=0 ; i < b ; ++i){
			if(i%12===0)++k;
			sum+=Number(( Number(k*d) + Number(a) )*Math.pow((1+c/(12*100)),b-i));
			
		}
		sum=sum.toFixed();
		this.setState({
			increment:d,
			sip_amount:sum,
		})
    }
	render(){
		const height = Dimensions.get('window').height - 80;
		const width = Dimensions.get('window').width;
		return(
			<ScrollView>
			<View style = {{height:height}}>
		{/*--------------graph----------------*/}
				<View style = {{flex:5.4,backgroundColor:'white'}}>
					<Graph savings = {this.state.savings} period = {this.state.period} ror = {this.state.ror} increment = {this.state.increment} sip_amount ={this.state.sip_amount}/>
				</View>
			{/*----------------------------------*/}
			{/*-------------result----------*/}
				<View style = {styles.result}>
					<Result sip_amount = {this.state.sip_amount}/>
				</View>
			{/*---------------------------*/}
				<View style = {{flex:1,backgroundColor:'#ffffff',justifyContent:'center',borderRadius:5,marginTop:0}}>
			        <View style = {styles.sview}>
			          <Text style = {styles.view2}>Savings(Monthly in Rs.)</Text>
			        </View>
			        <View style = {styles.slider1}>
			          <Slider
			            style = {{width: width/1.36}}
			            step = {1000}
			            minimumValue = {1000}
			            maximumValue = {100000}
			            value = {this.state.savings}
			            //onValueChange = { (value)=>this.setState({ savings:value}) }
			            onSlidingComplete = { (value)=>this.handle_savings(value)}
			          />
			          <View style = {styles.textinput}>
			          {/*------------textInput-------------*/}
			            <Input savings = {this.state.savings} handle_savings = {this.handle_savings.bind(this)} />
			          {/*-------------------------*/}
			          </View>
			        </View>
			    </View>
				<View style = {{flex:1,backgroundColor:'#ffffff',justifyContent:'center',borderRadius:5,marginTop:1}}>
			        <View style = {styles.sview}>
			          <Text style = {styles.view2}>Period (years)</Text>
			        </View>
			        <View style = {styles.slider}>
			          <Slider
			            style = {{width: width/1.36}}
			            step = {1}
			            minimumValue = {1}
			            maximumValue = {30}
			            value = {this.state.period}
			            //onValueChange = { (value)=>this.handle_savings(value) }
			            onSlidingComplete = { (value)=>this.handle_period(value)}
			          />
			          <Text style = {styles.text1}>{this.state.period}</Text>
			        </View>
		     	</View>
				<View style = {{flex:1,backgroundColor:'#ffffff',justifyContent:'center',borderRadius:5,marginTop:1}}>
			        <View style = {styles.sview}>
			          <Text style = {styles.view2}>Expected Rate of Return (%)</Text>
			        </View>
			        <View style = {styles.slider}>
			          <Slider
			            style = {{width: width/1.36}}
			            step = {1}
			            minimumValue = {1}
			            maximumValue = {30}
			            value = {this.state.ror}
			            //onValueChange = { (value)=>this.handle_savings(value) }
			            onSlidingComplete = { (value)=>this.handle_ror(value)}
			          />
			          <Text style = {styles.text1}>{this.state.ror}</Text>
			        </View>
			    </View>
				<View style = {{flex:1,backgroundColor:'#ffffff',justifyContent:'center',borderRadius:5,marginTop:1}}>
			        <View style = {styles.sview}>
			          <Text style = {styles.view2}>Yearly Increment (Rs.)</Text>
			        </View>
			        <View style = {styles.slider1}>
			          <Slider
			            style = {{width: width/1.36}}
			            step = {1000}
			            minimumValue = {1000}
			            maximumValue = {100000}
			            value = {this.state.increment}
			            //onValueChange = { (value)=>this.setState({ savings:value}) }
			            onSlidingComplete = { (value)=>this.handle_increment(value)}
			          />
			          <Text style = {styles.text1}>{(this.state.increment).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}</Text>
			        </View>
			    </View>
			</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
  textinput:{
    backgroundColor:'#cce6ff',
    alignItems:'flex-start',
    justifyContent:'flex-end',
    borderRadius:1,
    marginTop:0,
    marginBottom:0
  },
  view2:{
    fontSize:14,
    fontWeight:'bold',
    color:'black',
    fontFamily:"serif",
  },
  slider1:{
    flex:2, 
    flexDirection:'row',
    alignItems:'center',
    //marginTop:10,
    //backgroundColor:'#ffdd99',
  },
  sview:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    backgroundColor:'#e6f7ff',
    //opacity:0.8
  },
  slider:{
    flex:2, 
    flexDirection:'row',
    alignItems:'center',
    //marginTop:10,
    //backgroundColor:'#ffdd99',
  },
  text1:{
    fontWeight:'bold',
    marginLeft:30
  },
  result:{
  	flex:1.3,
  	backgroundColor:'#4d94ff',
  	//marginTop:5,
  	marginLeft:1,
  	marginRight:1,
  	borderRadius:5,

  }
})