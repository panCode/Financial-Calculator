'use strict'
import React, { Component } from 'react';
import {View,Text,Animated ,ScrollView,TextInput ,Dimensions,Slider ,AppRegistry,Easing,TouchableOpacity,LayoutAnimation ,StyleSheet} from 'react-native'

import   Input  from '../textinput.js';
import Result from './result.js'


export default class Animation extends Component{
    constructor(props){
      super(props);
      this.state = {
        sip: new Animated.Value(300),
        delay_amount: new Animated.Value(215),
        loss: new Animated.Value(90),
        opacity: new Animated.Value(1-19495/26667),
        savings: 1000,
        period:2,
        ror:10,
        delay:6,
        sip_amount:26667,
        sip_delay:19495,
        
      }
    }
    componentWillMount(){
      const width = Dimensions.get('window').width;
      const amount = 26667;
      const delay = 19495;
      
      const n = amount/(width-width/4.3);
      
      this.state.sip.setValue(0);
      this.state.delay_amount.setValue(0);
      this.state.loss.setValue(0);
      this.state.opacity.setValue(0);
      Animated.parallel([
        Animated.timing(
        this.state.sip , 
        {
          toValue: n===0? 0: (amount/n),
          //friction:3,
          duration:1500,
          //useNativeDriver: true,
        }
        ),

        Animated.timing(
        this.state.delay_amount , 
        {
          toValue:(n===0 ? 0: (delay/n)),
          //friction:3,
          duration:1500,
          //useNativeDriver: true,
        }
        ),

        Animated.timing(
        this.state.loss , 
        {
          toValue: n===0 ? 0: (amount/n)-(delay/n),
          //friction:3,
          duration:1500,
          //useNativeDriver: true,
        }
        ),
        Animated.timing(
          this.state.opacity,
          {
            toValue: n===0?0 : (1-(delay/amount)),
            //friction:3,
            duration:1500,
            //useNativeDriver: true,
          }
        ),
        ]).start();
    }
    componentWillUnmount(){
      const {params} = this.props.navigation.state;
      params.handle_flag();
    }
    handle_period(value){
        const a = this.state.savings;
        const b = (Number(value))*12;
        const c = this.state.ror;
        const d = this.state.delay;
        let sum = 0;
        for(var i=1;i<=b;++i){
          sum+=(a*Math.pow((1+c/(12*100)),i));
        }
        sum=sum.toFixed();
        let dsum =0;
        for(var i=1;i<=(b-d);++i){
          dsum+=Number(a*Math.pow((1+c/(12*100)),i));
        }
        dsum=dsum.toFixed();
        this.setState({
          period: Number(value),
          sip_amount:sum,
          sip_delay:dsum,
        })

        this.handle(sum,dsum);
      
    }

    handle_ror(value){
        
        const a = this.state.savings;
        const b = this.state.period*12;
        const c = Number(value);
        const d = this.state.delay;
        let sum = 0;
        for(var i=1;i<=b;++i){
          sum+=(a*Math.pow((1+c/(12*100)),i));
        }
        sum=sum.toFixed();
        let dsum =0;
        for(var i=1;i<=(b-d);++i){
          dsum+=Number(a*Math.pow((1+c/(12*100)),i));
        }
        dsum=dsum.toFixed();
        this.setState({
          ror: c,
          sip_amount:sum,
          sip_delay:dsum,
        })

        this.handle(sum,dsum);
      }
    
    handle_delay(value){
        const a = this.state.savings;
        const b = this.state.period*12;
        const d = Number(value);
        const c = this.state.ror;
        let sum = 0;
        for(var i=1;i<=b;++i){
          sum+=(a*Math.pow((1+c/(12*100)),i));
        }
        sum=sum.toFixed();
        let dsum =0;
        for(var i=1;i<=(b-d);++i){
          dsum+=Number(a*Math.pow((1+c/(12*100)),i));
        }
        dsum=dsum.toFixed();
        this.setState({
          delay: d,
          sip_amount:sum,
          sip_delay:dsum,
        })

        this.handle(sum,dsum);
    }
    handle_savings(value){
        //console.log(value);
        value=value.toString().replace(/\,/g,'');
       
        if(value === '')value = 0;
        const a = Number(value);
        const b = this.state.period*12;
        const c = this.state.ror;
        const d = this.state.delay;
        let sum = 0;
        for(var i=1;i<=b;++i){
          sum+=(a*Math.pow((1+c/(12*100)),i));
        }
        sum=Number(sum.toFixed()); //toFixed() function returns the formatted number inn the form of string
        let dsum =0;
        for(var i=1;i<=(b-d);++i){
          dsum+=Number(a*Math.pow((1+c/(12*100)),i));
        }
        dsum=Number(dsum.toFixed());
        this.setState({
          savings: a,
          sip_amount:sum,
          sip_delay:dsum,
        })

        this.handle(sum,dsum);
      }

    handle(amount,delay){
      
      const width = Dimensions.get('window').width;
      
      
      const n = amount/(width-width/3.5);
      
      this.state.sip.setValue(0);
      this.state.delay_amount.setValue(0);
      this.state.loss.setValue(0);
      this.state.opacity.setValue(0);
      Animated.parallel([
        Animated.timing(
        this.state.sip , 
        {
          toValue: n===0? 0: (amount/n),
          //friction:3,
          duration:1500,
          //useNativeDriver: true,
        }
        ),

        Animated.timing(
        this.state.delay_amount , 
        {
          toValue:(n===0 ? 0: (delay/n)),
          //friction:3,
          duration:1500,
          //useNativeDriver: true,
        }
        ),

        Animated.timing(
        this.state.loss , 
        {
          toValue: n===0 ? 0: (amount/n)-(delay/n),
          //friction:3,
          duration:1500,
          //useNativeDriver: true,
        }
        ),
        Animated.timing(
          this.state.opacity,
          {
            toValue: n===0?0 : (1-(delay/amount)),
            //friction:3,
            duration:1500,
            //useNativeDriver: true,
          }
        ),
        ]).start();
    }

  render () {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height -width/5;
    
    var sip_amount = this.state.sip_amount;
    sip_amount = sip_amount.toString();
    sip_amount = sip_amount.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

    var delay_amount = this.state.sip_delay;
    delay_amount = delay_amount.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

    var loss = this.state.sip_amount - this.state.sip_delay ;
    loss = loss.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    
    var savings = Number(this.state.savings);
    savings = savings.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

   

   return (
    <ScrollView >
    <View style = {{height:height}}>
    <View style={styles.container}>
     <View style = {{flex:1,flexDirection:'column',backgroundColor:'#ffffff',borderRadius:5}}>
        <View style = {{flex:1}}>
          <Text style = {styles.view1}>SIP Amount (start today)</Text>
        </View>
        <View style = {{flex:3,flexDirection:'row',alignItems:'center'}}>
          <Animated.View style = {{marginRight:0,height:15,width:this.state.sip,backgroundColor:'#009900',borderRadius:8}} />
          <Text style = {styles.text}>{sip_amount}</Text>
        </View>
      </View>
    


      <View  style = {{flex:1,flexDirection:'column',backgroundColor:'#ffffff',borderRadius:5,marginTop:7}}>
        <View style = {{flex:1}}>
          <Text style = {styles.view1} >SIP Amount (Delayed Start)</Text>
        </View>
        <View style = {{flex:3,flexDirection:'row',alignItems:'center'}}>
          <Animated.View style = {[styles.circle,{height:15,width:this.state.delay_amount,backgroundColor:'#1a53ff'}]}/>
          <Text style = {styles.text}>{delay_amount}</Text>
        </View>
      </View>

      <View  style = {{flex:1,flexDirection:'column',backgroundColor:'#ffe6e6',borderRadius:5,marginTop:7}}>
        <View style = {{flex:1}}>
          <Text style = {styles.view1}>Loss</Text>
        </View>
        <View style = {{flex:3,flexDirection:'row',alignItems:'center'}}>
          <Animated.View style = {[styles.circle,{height:15,width:this.state.loss,opacity:this.state.opacity}]}/>
          <Text style = {styles.text}>{loss}</Text>
        </View>
      </View>

      {/* ---------------Result Box--------------------- */}
      <View style = {{flex:1.1,backgroundColor:'#4d94ff',marginTop:5,borderRadius:5,borderWidth:0.2}}>
        <Result sip_amount = {this.state.sip_amount} sip_delay = {this.state.sip_delay} period = {this.state.period} delay = {this.state.delay}/>
      </View>
    {/*-------------------------------*/}

      <View style = {{flex:4,marginTop:0}}>

       <View style = {styles.variables}>
        <View style = {styles.sview}>
          <Text style = {styles.view2}>Savings(Monthly in Rs.)</Text>
        </View>
        <View style = {styles.slider1}>
          <Slider
            style = {{width:width/1.36}}
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

      <View style = {styles.variables}>
        <View style = {styles.sview}>
          <Text style = {styles.view2}>Period (years)</Text>
        </View>
        <View style = {styles.slider}>
          <Slider
            style = {{width:width/1.36}}
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

      <View style = {styles.variables}>
        <View style = {styles.sview}>
          <Text style = {styles.view2}>Expected Rate of Return (%)</Text>
        </View>
        <View style = {styles.slider}>
          <Slider
            style = {{width:width/1.36}}
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

      <View style = {styles.variables}>
        <View style = {styles.sview}>
          <Text style = {styles.view2}>Delay in Investment(Months)</Text>
        </View>
        <View style = {styles.slider}>
        <Slider
          style = {{width:width/1.36}}
          step = {1}
          minimumValue = {6}
          maximumValue = {this.state.period < 10 ? 12*this.state.period : 120}
          value = {this.state.delay}
          maximumTrackTintColor = '#ff1a1a'
          minimumTrackTintColor = '#66ff99'
          //onValueChange = { (value)=>this.handle_savings(value) }
          onSlidingComplete = { (value)=>this.handle_delay(value)}
        />
        
        <Text style = {styles.text1}>{this.state.delay}</Text>
        
        </View>
      </View>
      </View>

    </View>
    </View>
   </ScrollView>
   )
  }
}
const styles = StyleSheet.create({
  variables:{
    flex:1,
    backgroundColor:'#ffffff',
    justifyContent:'center',
    borderRadius:5,
    marginTop:1
  },
  textinput:{
    backgroundColor:'#cce6ff',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:1,
    marginTop:1,
    marginBottom:2
  },
  view1:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    fontFamily:"serif",

  },
  view2:{
    fontSize:15,
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
  slider:{
    flex:2, 
    flexDirection:'row',
    alignItems:'center',
    //justifyContent:'flex-e'
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
  text:{
    fontWeight:'bold',
    //marginLeft:30
  },
  text1:{
    fontWeight:'bold',
    marginLeft:30
  },
  container: {
    flexDirection: 'column',
    marginTop: 6,
    flex:1,
    padding:1,
    backgroundColor:'#f2f2f2'
  },
  circle:{
    backgroundColor:'#cc0000',
    borderRadius:8,
    
    
  },
  item: {
    flex:10,
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10,
    marginTop:20

  },
  label: {
    color: '#CBCBCB',
    flex: 10,
    fontSize: 12,
    backgroundColor:'red',
    //position: 'relative',
    top: 2
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 11
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    marginRight: 5
  },
  points: {
    backgroundColor: '#F55443'
  },
   container1: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
})