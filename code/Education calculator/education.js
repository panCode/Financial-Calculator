'use strict'
import React, { Component } from 'react';
import { Text , View ,Image,StyleSheet ,TextInput ,Button, ScrollView,AppRegistry,Dimensions,TouchableOpacity,TouchableHighlight,Alert} from 'react-native';
import { StackNavigator } from 'react-navigation';
import  ModalPicker  from 'react-native-modal-picker';
import renderIf from 'render-if';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
var {height,width} = Dimensions.get('window');


export default class Education extends React.Component{
  static navigationOptions = {
    title: 'Education Calculator',
  };
  constructor(props){
    super(props);
    this.state={
        present_age:2,
        college_age:18,
        education_period:5,
        today_cost:"0",
        sip_rate:12,
        cost:0,
        inflation_rate:7,
        present_age_connector:false,
        college_age_connector:false,
        education_period_connector:false,
        today_cost_connector:false,
        sip_rate_connector:false,
        inflation_rate_connector:false,
        child_information_flip_1:true,
        education_information_flip_2:false,
        rates_flip_3:false,
        result_flip_4:false,
    }
  }

  componentWillUnmount(){
      //console.log('dooo');
      const {params} = this.props.navigation.state;
      params.handle_flag();
    }

  update_present_age(data){
    this.setState({
      present_age:data.label,
      present_age_connector:true,
    });
  }
  update_college_age(data){
    this.setState({
      college_age:data.label,
      college_age_connector:true,
      education_information_flip_2:true,
      child_information_flip_1:false,
    });
  }
  update_education_period(data){
    this.setState({
      education_period:data.label,
      education_period_connector:true,
      rates_flip_3:true,
    });
    if(this.state.today_cost_connector===true)
    {
        this.setState({
            education_information_flip_2:false,
        })
    }
  }
  update_inflation_rate(data){
    this.setState({
      inflation_rate:data.label,
      inflation_rate_connector:true,
      result_flip_4:true,
      child_information_flip_1:false,
      education_information_flip_2:false,
      rates_flip_3:false,
    });
  }
  update_sip_rate(data){
    this.setState({
      sip_rate:data.label,
      sip_rate_connector:true,
    });
  }
  invert_flip_1(){
    let invert=!(this.state.child_information_flip_1)
    this.setState({
        child_information_flip_1:invert,
    });
  }
  invert_flip_2(){
    let invert=!(this.state.education_information_flip_2)
    this.setState({
        education_information_flip_2:invert,
    })
  }
  invert_flip_3(){
    let invert=!(this.state.rates_flip_3)
    this.setState({
        rates_flip_3:invert,
    })
  }
  invert_flip_4(){
    let invert=!(this.state.result_flip_4)
    this.setState({
        result_flip_4:invert,
    })
  }

  
  update_today_cost(data){
            let len =data.length;
            let z=0;
            let string1="";
            let string2="";
            data=data.trim();

            data=data.replace(/\,/g,'');
            z = data.length - 1;

                if(data.charAt(z)==='.')
                {
                  
                    data=data.substring(0,z);
                    let temp=data;
                    data = data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.setState({
                        today_cost:data,
                        today_cost_connector:true,
                        cost:temp,
                    });
                  
                }
               else if(data.charAt(z)==='-')
                {
                  Alert.alert(
                      'Hyphen Not Allowed',
                      'You can enter numbers only',
                      [
                        {

                          text:'OK',onPress:()=>console.log('OK Pressed')
                        }
                      ],
                      {cancelable:false}
                    ) 
                }
                else
                {   
                    let temp=data;
                    data = data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    
                  this.setState({
                        cost:temp,
                        today_cost:(data), 
                        today_cost_connector:true,
                });
                }  
  }

  render (){
    var sip_inflation_rate_data=[];
    var present_age_data=[];
    var college_age_data=[];
    var education_period_data=[];
    for(let i=0;i<=12;++i)
    {
      let object ={};
      object["key"]=i;
      object["label"]=""+i+"";
      sip_inflation_rate_data.push(object);
    }
    for(let i=0;i<=18;++i)
    {
      let object ={};
      object["key"]=i;
      object["label"]=""+i+"";
      present_age_data.push(object);
    }
    for(let i=15;i<=25;++i)
    {
      let object ={};
      object["key"]=i;
      object["label"]=""+i+"";
      college_age_data.push(object);
    }
    for(let i=1;i<=10;++i)
    {
      let object ={};
      object["key"]=i;
      object["label"]=""+i+"";
      education_period_data.push(object);
    }

    let costt=parseInt(this.state.cost);
    let college=parseInt(this.state.college_age);
    let present=parseInt(this.state.present_age);
    let inflation =parseInt(this.state.inflation_rate)/100;
    let education=parseInt(this.state.education_period);
    let sip=parseInt(this.state.sip_rate)/100;

    let years_to_save=college-present;
    let initial_withdrawl=(costt*(Math.pow((1+inflation),years_to_save)));

    let X_previous;
    let X_next=0;
    let w_next=0;
    let k=0;

    while(k<education){
        //We are assuming that College Fees is also increasing with the time.
        w_next=initial_withdrawl*(Math.pow((1+inflation),(education-1-k)));

        X_previous=(X_next+w_next)/(1+sip);
        X_next=X_previous;
        k++;
    }
    
    let p_previous_last=X_next;

    let monthly_savings=(p_previous_last*(sip))/(Math.pow((1+sip),years_to_save)-1);
        monthly_savings=monthly_savings/12;

    return (
        <ScrollView style = {{backgroundColor:'#9ed0e2'}}>

            {/*Child Information*/}
            <View style={{backgroundColor:'#9ed0e2'}}>
                {
                    renderIf(this.state.child_information_flip_1===true)
                    (
                        <View>
                            <View style={{flex:3,flexDirection:'row',backgroundColor:'#5ac2ed',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                                    <TouchableHighlight onPress={()=>this.invert_flip_1()}>
                                        <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#05396E'}}>
                                            Child Information <Octicons name="triangle-right" size={30} color="black"/>
                                        </Text>
                                    </TouchableHighlight>
                            </View>

                            {/*Current Age*/}
                            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
                                <View style = {{flex:10,width:150,height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#d9d9d9',borderRadius:5}}>
                                    <Text style = {styles.view}>Current Age</Text>
                                    <Text>( In Years )</Text>
                                </View>
                                
                                <View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
                                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                        <ModalPicker
                                                data={present_age_data}
                                                onChange={(option)=>{ this.update_present_age(option)}}>
                                                <TextInput
                                                
                                                style={{borderWidth:1, borderColor:'#d9d9d9', padding:10, height:40 , width:90 ,color:'#000000',textShadowRadius:0,fontSize:17}}
                                                editable={false}
                                                placeholder="Select"
                                                //placeholder="       6"
                                                value={this.state.present_age} />    
                                        </ModalPicker>
                                    </View>
                                </View>
                            </View>

                            {/*College Age*/}
                            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
                                <View style = {{flex:10,width:150,height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#d9d9d9',borderRadius:5}}>
                                    <Text style = {styles.view}>College at Age</Text>
                                    <Text>( In Years )</Text>
                                </View>

                                <View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
                                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                        <ModalPicker
                                            data={college_age_data}
                                            onChange={(option)=>{ this.update_college_age(option)}}>
                                                
                                            <TextInput
                                                style={{borderWidth:1, borderColor:'#d9d9d9', padding:10, height:40 , width:90 ,color:'#000000',textShadowRadius:0,fontSize:17}}
                                                editable={false}
                                                placeholder="Select"
                                                //placeholder="       18"
                                                value={this.state.college_age} />  
                                        </ModalPicker>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }

                {
                    renderIf(this.state.child_information_flip_1===false)
                    (
                        <View style={{flex:3,flexDirectiion:'row',backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                            <TouchableHighlight onPress={()=>this.invert_flip_1()}>
                                <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
                                     Child Information <Octicons name="triangle-down" size={30} color="black"/>
                                </Text>
                            </TouchableHighlight>
                        </View>
                    )
                }
            </View>

            {/*Education Information*/}
            <View style={{backgroundColor:'#9ed0e2'}}>
                {
                    renderIf(this.state.present_age_connector===true && this.state.college_age_connector===true)
                    (
                        <View>
                            <View>
                                {
                                    renderIf(this.state.education_information_flip_2===true)
                                    (
                                        <View>
                                            <View style={{flex:3,flexDirectiion:'row',backgroundColor:'#5ac2ed',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                                                <TouchableHighlight onPress={()=>this.invert_flip_2()}>
                                                    <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#05396E'}}>
                                                        Education Information <Octicons name="triangle-right" size={30} color="black"/>
                                                    </Text>
                                                </TouchableHighlight>
                                            </View>

                                            {/*Cost Incurred As of Today*/}
                                            <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center',padding:20}}>
                                                <View style = {{flex:6,backgroundColor:'#d9d9d9',height:60,borderRadius:5,width:70}}>
                                                    <Text style = {styles.view}>Cost Incurred As of Today</Text>
                                                    <Text style={{textAlign:'center'}}>( In Lacs. )</Text>
                                                </View>

                                                <View style ={{flex:6,alignItems:'center',justifyContent:'center'}}>
                                                    <View style={{width:90,height:40,backgroundColor:'#ffffff'}}>   
                                                        <TextInput 
                                                        style={{borderWidth:1, borderColor:'#d9d9d9', padding:10, height:40 , width:90,color:'#000000',textShadowRadius:0,fontSize:17,textAlign:'center'}}
                                                        underlineColorAndroid='white'
                                                        keyboardType='numeric'
                                                        placeholder="Edit"
                                                        //placeholder = "2,00,000"
                                                        editable = {true}
                                                        value = {this.state.today_cost}
                                                        onChangeText={(value)=>this.update_today_cost(value)}
                                                        />
                                                  </View>
                                                </View>
                                            </View>

                                            {/*Education Duration*/}
                                            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
                                                <View style = {{flex:10,width:150,height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#d9d9d9',borderRadius:5}}>
                                                    <Text style = {styles.view}>Education Duration</Text>
                                                    <Text>( In Years )</Text>
                                                </View>

                                                <View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
                                                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                                        <ModalPicker
                                                            data={education_period_data}
                                                            onChange={(option)=>{ this.update_education_period(option)}}>
                                                                                  
                                                            <TextInput
                                                                style={{borderWidth:1, borderColor:'#d9d9d9', padding:10, height:40 , width:90 ,color:'#000000',textShadowRadius:0,fontSize:17}}
                                                                editable={false}
                                                                //placeholder="       4"
                                                                placeholder="Select"
                                                                value={this.state.education_period} 
                                                            />
                                                        </ModalPicker>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        
                                    )
                                }
                            </View>

                            <View>
                                {
                                    renderIf(this.state.education_information_flip_2===false)
                                    (
                                        <View style={{flex:1,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                                            <TouchableHighlight onPress={()=>this.invert_flip_2()}>
                                                <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
                                                    Education Information <Octicons name="triangle-down" size={30} color="black"/>
                                                </Text>
                                            </TouchableHighlight>
                                        </View>
                                    )
                                }
                            </View>
                        </View> 
                    )
                }

                {
                    renderIf(this.state.present_age_connector===false || this.state.college_age_connector===false)
                    (
                        <View style={{flex:1,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                            <TouchableHighlight onPress={()=>Alert.alert('Required Field Empty','Please Fill the Above Details')}>
                                <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
                                      Education Information <Octicons name="triangle-down" size={30} color="black"/>
                                </Text>
                            </TouchableHighlight>
                        </View>
                    )
                }
            </View>

            {/*Rates*/}
            <View style={{backgroundColor:'#9ed0e2'}}>
                {
                    renderIf(this.state.today_cost_connector===true && this.state.education_period_connector===true)
                    (
                        <View>
                            <View>
                                {
                                    renderIf(this.state.rates_flip_3===true)
                                    (
                                        <View>
                                            <View style={{flex:1,backgroundColor:'#5ac2ed',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                                                <TouchableHighlight onPress={()=>this.invert_flip_3()}>
                                                    <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#05396E'}}>
                                                       Rates <Octicons name="triangle-right" size={30} color="black"/>
                                                    </Text>
                                                </TouchableHighlight>
                                            </View>

                                            {/*Return Rate*/}
                                            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
                                                <View style = {{flex:10,width:150,height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#d9d9d9',borderRadius:5}}>
                                                    <Text style = {styles.view}>Return Rate</Text>
                                                    <Text>( In Years )</Text>
                                                </View>

                                                <View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
                                                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                                        <ModalPicker
                                                            data={sip_inflation_rate_data}
                                                            onChange={(option)=>{ this.update_sip_rate(option)}}>
                                                            <TextInput
                                                                style={{borderWidth:1, borderColor:'#d9d9d9', padding:10, height:40 , width:90 ,color:'#000000',textShadowRadius:0,fontSize:17}}
                                                                editable={false}
                                                                placeholder="Select"
                                                                //placeholder="       12"
                                                                value={this.state.sip_rate} 
                                                            />              
                                                        </ModalPicker>
                                                    </View>
                                                </View>
                                            </View>

                                            {/*Inflation Rate*/}
                                            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
                                                <View style = {{flex:10,width:150,height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#d9d9d9',borderRadius:5}}>
                                                    <Text style = {styles.view}>Inflation Rate</Text>
                                                    <Text>( In Years )</Text>
                                                </View>

                                                <View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
                                                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                                        <ModalPicker
                                                            data={sip_inflation_rate_data}
                                                            onChange={(option)=>{ this.update_inflation_rate(option)}}>
                                                            <TextInput
                                                                style={{borderWidth:1, borderColor:'#d9d9d9', padding:10, height:40 , width:90 ,color:'#000000',textShadowRadius:0,fontSize:17}}
                                                                editable={false}
                                                                placeholder="Select"
                                                                // placeholder="       7"
                                                                value={this.state.inflation_rate} 
                                                            />          
                                                        </ModalPicker>
                                                    </View>
                                                </View>
                                            </View>
                                        </View> 
                                    )
                                }
                            </View>

                            <View>
                                {
                                    renderIf(this.state.rates_flip_3===false)
                                    (
                                        <View style={{flex:1,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                                            <TouchableHighlight onPress={()=>this.invert_flip_3()}>
                                                <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
                                                    Rates <Octicons name="triangle-down" size={30} color="black"/>
                                                </Text>
                                            </TouchableHighlight>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    )
                }
                
                {
                    renderIf(this.state.today_cost_connector===false || this.state.education_period_connector===false)
                    (
                        <View style={{flex:50,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                            <TouchableHighlight onPress={()=>Alert.alert('Required Field Empty','Please Fill the Above Details')}>
                                <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
                                    Rates <Octicons name="triangle-down" size={30} color="black"/>
                                </Text>
                            </TouchableHighlight>
                        </View>
                    )
                }
            </View>

            {/*Result*/}
            <View style={{backgroundColor:'#9ed0e2'}}>
                {
                    renderIf(this.state.inflation_rate_connector===true && this.state.sip_rate_connector===true)
                    (
                        <View>
                            <View>
                                {
                                    renderIf(this.state.result_flip_4===true)
                                    (
                                        <View>
                                            <View style={{flex:1,backgroundColor:'#5ac2ed',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                                                <TouchableHighlight onPress={()=>this.invert_flip_4()}>
                                                    <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#05396E'}}>
                                                        Result <Octicons name="triangle-right" size={30} color="black"/>
                                                    </Text>
                                                </TouchableHighlight>
                                            </View>

                                            <View style = {{flexDirection:'column',padding:10}}>
                                                <View style = {{flexDirection:'column'}}>
                                                    <View style = {{flex:1,alignItems:'center'}}>
                                                      <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Amount Required at Start of College </Text>
                                                    </View>

                                                    <View style = {{flex:1,alignItems:'center'}}>
                                                        <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Rs. {(p_previous_last.toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                                                    </View>
                                                </View>

                                                <View style = {{flexDirection:'column'}}>
                                                    <View style = {{flex:1,alignItems:'center'}}>
                                                      <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Monthly Investment </Text>
                                                    </View>

                                                    <View style = {{flex:1,alignItems:'center'}}>
                                                        <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Rs. {(monthly_savings.toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>  
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>

                            <View>
                                {
                                    renderIf(this.state.result_flip_4===false)
                                    (
                                        <View style={{flex:1,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
                                            <TouchableHighlight onPress={()=>this.invert_flip_4()}>
                                                <Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
                                                    Result  <Octicons name="triangle-down" size={30} color="black"/>
                                                </Text>
                                            </TouchableHighlight>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    )
                } 
            </View>

        </ScrollView>
      );
  }
}
const styles = StyleSheet.create({
	text:{
		color:'#000000',
		fontSize:17,
		textShadowRadius:1,
	},
	bigblue:{
		color:'#ffffff',
		fontWeight:'bold',
		fontSize:25,
		includeFontPadding:true,
		fontStyle:'normal',
		textShadowRadius:40
	},
	view:{
		color:'#000000',
		fontWeight:'bold',
		fontSize:16,
		alignItems:'flex-start',
		justifyContent:'flex-end',
		textAlign:'center'		
	},
	container: {
    height:450,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
const stylesbutton = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#87ceeb',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000066'
  },
  welcomePress: {
    fontSize: 20,
    textAlign: 'auto',
    margin: 10,
    color: '#ffffff'
  },
  button: {
    borderColor: '#000066',
    borderWidth: 7,
    borderRadius: 10,
  },
  buttonPress: {
    borderColor: '#000066',
    backgroundColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
  },
});