'use strict'
import React, { Component } from 'react';
import { Text , 
  View ,
  StyleSheet ,
  TextInput ,
  Button, 
  ScrollView,
  AppRegistry,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Alert} from 'react-native';
import renderIf from 'render-if';
import { StackNavigator } from 'react-navigation';
import  ModalPicker  from 'react-native-modal-picker';
//import {Switch} from 'react-native-switch';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
var {height,width} = Dimensions.get('window');
//console.disableYellowBox=true;

export default class Retirement extends React.Component{
  static navigationOptions = {
    title: 'Retirement Calculator',
  };

  constructor(props){
    super(props);
    this.state={
      present_age:30,
      retirement_age:60,
      monthly_expenses:"0",
      monthly_expenses_calculate:0,
      monthly_savings:"0",
      monthly_savings_calculate:0,
      inflation_rate:7,
      pre_retirement_sip:12,
      post_retirement_sip:7,
      life_expectancy:70,
      personal_information_flip_1:true,
      income_details_flip_2:false,
      rates_flip_3:false,
      result_flip_4:false,
      present_age_connector:false,
      retirement_age_connector:false,
      life_expectancy_connector:false,
      monthly_savings_connector:false,
      monthly_expenses_connector:false,
      inflation_rate_connector:false,
      pre_retirement_sip_connector:false,
      post_retirement_sip_connector:false,
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
  update_retirement_age(data){
    this.setState({
      retirement_age:data.label,
      retirement_age_connector:true,
    });
  }
  update_inflation_rate(data){
    this.setState({
      inflation_rate:data.label,
      inflation_rate_connector:true,
    });
  }
  
  update_pre_retirement_sip(data){
    this.setState({
      pre_retirement_sip:data.label,
      pre_retirement_sip_connector:true,
    });
  }
  update_post_retirement_sip(data){
    this.setState({
      post_retirement_sip:data.label,
      post_retirement_sip_connector:true,
      result_flip_4:true,
      personal_information_flip_1:false,
      income_details_flip_2:false,
      rates_flip_3:false,
    });
  }
  update_life_expectancy(data){
    this.setState({
      life_expectancy:data.label,
      life_expectancy_connector:true,
      income_details_flip_2:true,
      personal_information_flip_1:false,
    });
  }

  invert_personal_information_flip_1(){
  	let invert=!(this.state.personal_information_flip_1);
  	this.setState({
  		personal_information_flip_1:invert,
  	});
  }

  invert_income_details_flip_2(){
  	let invert=!(this.state.income_details_flip_2);
  	this.setState({
  		income_details_flip_2:invert,
  	});
  }

  invert_rates_flip_3(){
  	let invert=!(this.state.rates_flip_3);
  	this.setState({
  		rates_flip_3:invert,
  	})
  }
  invert_result_flip_4(){
  	let invert=!(this.state.result_flip_4);
  	this.setState({
  		result_flip_4:invert,
  	})
  }

  	check_monthly_expenses(data){
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
	                    let temp=parseInt(data);
	                    data = data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	                    this.setState({
	                    	monthly_expenses_calculate:temp,
	                        monthly_expenses:(data),
	                        monthly_savings_connector:true,
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
	                {	let temp=parseInt(data);
	                    data = data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	                  this.setState({
	                  		monthly_expenses_calculate:temp,
	                        monthly_expenses:(data),
	                        monthly_savings_connector:true,
	                });
	                }  
	}

	  check_monthly_savings(data){
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
		                    let temp =data;
		                    data = data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		                    this.setState({
		                    	monthly_savings_calculate:temp,
		                        monthly_savings:(data),
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
		                	let temp =data;
		                    data = data.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		                  this.setState({
		                  		monthly_savings_calculate:temp,
		                        monthly_savings:(data),
		          				
		                });
		                }  
		}
	update_monthly_expenses(value){
		this.setState({
			monthly_expenses:(value),
			monthly_expenses_connector:true,
		})
	}
	update_monthly_savings(value){
		this.setState({
			monthly_savings:(value),
			monthly_savings_connector:true,
		    rates_flip_3:!(this.state.rates_flip_3),
		})
		if(this.state.monthly_expenses_connector===true)
		{
			this.setState({
				income_details_flip_2:false,
			})
		}
	}


  render (){
    //Current Age 
    var current_age_data=[];
    for(let i=25;i<=45;++i)
    {
      let object ={};
      object["key"]=i;
      object["label"]=""+i+"";
      current_age_data.push(object);
    }
     //Retirement Age
    var retirement_age_data=[];
    for(let i=55;i<=66;++i)
    {
      let object ={};
      object["key"]=i;
      object["label"]=""+i+"";
      retirement_age_data.push(object);
    }
    //Inflation Rate & Post Retirement 
    var inflation_and_post_rate_data=[];
    for(let i=1;i<=12;++i)
    {
      let object ={};
      object["key"]=i;
      object["label"]=""+i+"";
      inflation_and_post_rate_data.push(object);
    }
    //Pre Retirement
    var pre_retirement_rate_data=[];
    for(let i=1;i<=15;++i)
    {
      let object ={};
      object["key"]=i;
      object["label"]=""+i+"";
      pre_retirement_rate_data.push(object);
    }
    //Life expectancy
    var life_expectancy_data=[];
    for(let i=70;i<=100;++i)
    {
      let object ={};
      object["key"]=i;
      object["label"]=""+i+"";
      life_expectancy_data.push(object);
    }

    let present=parseInt(this.state.present_age);
    let retirement=parseInt(this.state.retirement_age);
    let expectancy=parseInt(this.state.life_expectancy);
    let expense=parseInt(this.state.monthly_expenses_calculate);
    let saving=parseInt(this.state.monthly_savings_calculate);
    let pre_sip=parseInt(this.state.pre_retirement_sip)/100;
    let post_sip=parseInt(this.state.post_retirement_sip)/100;
    let inflation=parseInt(this.state.inflation_rate)/100;

    let years_to_retirement=(retirement-present);
    let i=0;
    let total=0;
    //Savings Corpus
    while(i<years_to_retirement){
    	total=(total+saving*12)*(1+pre_sip);
    	i++;
    }
    let savings=total;
    
    let toDie_years=(expectancy - retirement);
    let expenses=expense;
    let count1=0;
    //Expenses just after the Retirement
    while(count1<years_to_retirement){
      expenses=expenses*(1+inflation);
      count1++;
    }

    //Withdrawl just after the retirement for the whole year
    let initial_withdrawl=(expenses*12);
    let X_previous;
    let X_next=0;
    let w_next=0;
    let k=0;

    while(k<toDie_years){
    	w_next=initial_withdrawl*(Math.pow((1+inflation),(toDie_years-1-k)));
    	X_previous=(X_next+w_next)/(1+post_sip);
    	X_next=X_previous;
    	k++;
    }
    
    let p_previous_last=X_next;
    let shortfall_corpus=p_previous_last-savings;
    let extra_yearly_savings=(shortfall_corpus*pre_sip)/(Math.pow((1+pre_sip),years_to_retirement)-1);
    extra_yearly_savings=extra_yearly_savings/12;

	let monthly_investment_should_be=p_previous_last*(pre_sip)/((Math.pow((1+pre_sip),years_to_retirement)-1)*(1+pre_sip)*12);

    return (
		<ScrollView style = {{backgroundColor:'#9ed0e2'}}>

			{/*Personal Information*/}
			<View style={{backgroundColor:'#9ed0e2'}}>
		      	{
		      		renderIf(this.state.personal_information_flip_1===true)
		      		(
		      			<View>
			      			<View style={{flex:3,flexDirection:'row',backgroundColor:'#5ac2ed',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
				     				<TouchableHighlight onPress={()=>this.invert_personal_information_flip_1()}>
					     				<Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#05396E'}}>
					     					Personal Information <Octicons name="triangle-right" size={30} color="black"/>
					     				</Text>
				     				</TouchableHighlight>
			     			</View>

			     			<View>
							    {/*Current Age*/}
							    <View style = {{ flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
							        <View style = {{
							        	flex:10,
							          	height:60,
							          	alignItems:'center',
							          	justifyContent:'center',
							          	backgroundColor:'#d9d9d9',
							          	borderRadius:5
							        }}>
							          	<Text style = {styles.view}>Current Age</Text>
							          	<Text>( In Years )</Text>
							        </View>

							        <View style ={{flex:10,alignItems:'center',justifyContent:'flex-start'}}>
							          	<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
							                <ModalPicker
							                        data={current_age_data}
							                        onChange={(option)=>{ this.update_present_age(option)}}>
							                        
							                    <TextInput
							                        style={{
							                        borderWidth:1,
							                        borderColor:'#d9d9d9',
							                        padding:10,
							                        height:40 ,
							                        width:90 ,
							                        color:'#000000',
							                        textShadowRadius:0,
							                        fontSize:17,
							                        textAlign:'center',
							                        }}
							                        editable={false}
							                        placeholder="Select"
							                        value={this.state.present_age} 
							                    />           
							                </ModalPicker>
							          </View>
							        </View>

							    </View>

							    {/*Retirement Age*/}
							    <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
							        <View style = {{flex:10,
							          	width:150,
							          	height:60,
							          	alignItems:'center',
							          	justifyContent:'center',
							          	backgroundColor:'#d9d9d9',
							          	borderRadius:5
							        }}>
							          	<Text style = {styles.view}>Retirement Age</Text>
							          	<Text>( In Years )</Text>
							        </View>
							        <View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
							          	<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
							                <ModalPicker
							                    data={retirement_age_data}
							                    onChange={(option)=>{ this.update_retirement_age(option)}}>
							                        
							                    <TextInput
							                        style={{
							                        borderWidth:1,
							                        borderColor:'#d9d9d9',
							                        padding:10,
							                        height:40 ,
							                        width:90 ,
							                        color:'#000000',
							                        textShadowRadius:0,
							                        textAlign:'center',
							                        fontSize:17
							                        }}
							                        editable={false}
							                        placeholder="Select"
							                        value={this.state.retirement_age}
							                    />
							                </ModalPicker>
							          </View>

							        </View>
							    </View>

								{/*Life Expectancy*/}
					            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
					                <View style = {{flex:10,width:150,height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#d9d9d9',borderRadius:5}}>
					                  <Text style = {styles.view}>Life Expectancy </Text>
					                  <Text>(in Years)</Text>
					                </View>

					                <View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
					                  	<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
					                        <ModalPicker
					                            data={life_expectancy_data}
					                            onChange={(option)=>{ this.update_life_expectancy(option)}}>

					                            <TextInput
					                                style={{
					                                borderWidth:1,
					                                borderColor:'#d9d9d9',
					                                padding:10,
					                                height:40 ,
					                                width:90 ,
					                                color:'#000000',
					                                textShadowRadius:0,
					                                fontSize:17,
					                                textAlign:'center',
					                                }}
					                            editable={false}
					                            placeholder="Select"
					                            value={this.state.life_expectancy} 
					                            />           
					                        </ModalPicker>
					                  	</View>
					                </View>
					            </View>
							</View>
						</View>
		      		)
				}

				{
					renderIf(this.state.personal_information_flip_1===false)
					(
						<View style={{flex:3,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
			     			<TouchableHighlight onPress={()=>this.invert_personal_information_flip_1()}>
			     				<Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
			     					Personal Information  <Octicons name="triangle-down" size={30} color="black"/>
			     				</Text>
			     			</TouchableHighlight>
		     			</View>
					)

		      	}	
		    </View> 

			{/*Income Details*/}
			<View style={{backgroundColor:'#9ed0e2'}}>
				{
					renderIf(this.state.present_age_connector===true && this.state.retirement_age_connector===true && this.state.life_expectancy_connector===true)
					(
						<View>
							<View>
								{
									renderIf(this.state.income_details_flip_2===true)
									(
										<View style={{flexDirection:'column'}}>

									      	<View style={{flex:1,backgroundColor:'#5ac2ed',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
										     	<TouchableHighlight onPress={()=>this.invert_income_details_flip_2()}>
										     		<Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#05396E'}}>
										     			Income Details <Octicons name="triangle-right" size={30} color="black"/>
										     		</Text>
										     	</TouchableHighlight>
									      	</View>

									      	<View style={{alignItems:'center',flexDirection:'row',justifyContent:'center',padding:20}}>
										      
											    <View style = {{flex:6,backgroundColor:'#d9d9d9',height:60,borderRadius:5,width:70}}>
											        <Text style = {styles.view}>Currently Monthly Expenses</Text>
											        <Text style={{textAlign:'center'}}>( In Rs. )</Text>
											    </View>

										        <View style ={{flex:6,alignItems:'center',justifyContent:'center'}}>
										          	<View style={{width:90,height:40,backgroundColor:'#ffffff'}}>   
										            	<TextInput 
										                style={{
										                  borderWidth:1,
										                  borderColor:'#d9d9d9',
										                   padding:10,
										                    height:40 ,
										                     width:90,
										                     color:'#000000',
										                     textShadowRadius:0,
										                     fontSize:17,
										                     textAlign:'center'
										                   }}
										                underlineColorAndroid='white'
										                keyboardType='numeric'
										                placeholder="Edit"
										                editable = {true}
										                value = {this.state.monthly_expenses}
										                onChangeText={(value)=>this.check_monthly_expenses(value)}
										                onEndEditing={(event)=>{this.update_monthly_expenses(event.nativeEvent.text)}}
										            	/>
										          	</View>
										        </View>

									      	</View>

									      	<View style={{flex:1,alignItems:'center',flexDirection:'row',justifyContent:'center',padding:20}}>
										        <View style = {{flex:6,backgroundColor:'#d9d9d9',height:60,borderRadius:5,width:70}}>
										              <Text style = {styles.view}>Currently Monthly Savings</Text>
										              <Text style={{textAlign:'center'}}>( In Rs.)</Text>
										        </View>

										        <View style ={{flex:6,alignItems:'center',justifyContent:'center'}}>
											        <View style={{width:90,height:40,backgroundColor:'#ffffff'}}>   
											            <TextInput 
											            style={{
											            borderWidth:1,
											            borderColor:'#d9d9d9',
											           	padding:10,
											            height:40 ,
											            width:90,
											            color:'#000000',
											            textShadowRadius:0,
											            fontSize:17,
											            textAlign:'center'
											              }}
											            underlineColorAndroid='white'
											            keyboardType='numeric'
											            placeholder="Edit"
											            editable = {true}
											            value = {this.state.monthly_savings}
											            onChangeText={(value)=>this.check_monthly_savings(value)}
											            onEndEditing={(event)=>{this.update_monthly_savings(event.nativeEvent.text)}}
											            />
											        </View>
										        </View>

									      	</View>
									      
									    </View>
									)

								}
							</View>

							<View>
								{
									renderIf(this.state.income_details_flip_2===false)
									(
										<View style={{flex:1,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
										    <TouchableHighlight onPress={()=>this.invert_income_details_flip_2()}>
										     	<Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
										     		Income Details <Octicons name="triangle-down" size={30} color="black"/>
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
					renderIf(this.state.present_age_connector===false || this.state.retirement_age_connector===false || this.state.life_expectancy_connector===false)
					(
					    <View style={{flex:1,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
						    <TouchableHighlight onPress={()=>Alert.alert('Required Field Empty','Please Fill the Above Details')}>
						     	<Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
						     		Income Details <Octicons name="triangle-down" size={30} color="black"/>
						     	</Text>
						    </TouchableHighlight>
					    </View>
					)
				}
			</View>

			{/*Ratessssssssssssss*/}
			<View style={{backgroundColor:'#9ed0e2'}}>
				{
					renderIf(this.state.monthly_savings_connector===true && this.state.monthly_expenses_connector===true)
					(
						<View>
							<View>
								{
									renderIf(this.state.rates_flip_3===true)
									(
										<View>
											<View style={{flex:50,backgroundColor:'#5ac2ed',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
							     				<TouchableHighlight onPress={()=>this.invert_rates_flip_3()}>
							     					<Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#05396E'}}>
							     						Rates <Octicons name="triangle-right" size={30} color="black"/>
							     					</Text>
							     				</TouchableHighlight>
				     						</View>

				     						<View >
							     				{/*Pre Retirement SIP*/}

										        <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
											        <View style = {{flex:10,width:150,height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#d9d9d9',borderRadius:5}}>
											          	<Text style = {styles.view}>Expected Pre-Retirement Rate </Text>
											          	<Text >( % per Year )</Text>
											        </View>

										        	<View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
										          		<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
										                    <ModalPicker
										                        data={pre_retirement_rate_data}
										                        onChange={(option)=>{ this.update_pre_retirement_sip(option)}}>
										                        
										                        <TextInput
										                            style={{
										                              borderWidth:1,
										                               borderColor:'#d9d9d9',
										                                padding:10,
										                                 height:40 ,
										                                  width:90 ,
										                                  color:'#000000',
										                                  textShadowRadius:0,
										                                  fontSize:17,
										                                  textAlign:'center',
										                                }}
										                            editable={false}
										                            placeholder="Select"
										                            value={this.state.pre_retirement_sip} 
										                        />
										                            
										                    </ModalPicker>
										          		</View>
										        	</View>
										      	</View>

										      	{/*Inflation Rate*/}

								            	<View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
								                	<View style = {{flex:10,width:150,height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#d9d9d9',borderRadius:5}}>
								                  		<Text style = {styles.view}>Expected Inflation Rate</Text>
								                  		<Text>( % per Year )</Text>
								                	</View>
									                <View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
									                  	<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
									                        <ModalPicker
									                            data={inflation_and_post_rate_data}
									                            onChange={(option)=>{ this.update_inflation_rate(option)}}>
									                                
									                            <TextInput
									                                style={{
									                                borderWidth:1,
									                                borderColor:'#d9d9d9',
									                                padding:10,
									                                height:40 ,
									                                width:90 ,
									                                color:'#000000',
									                                textShadowRadius:0,
									                                fontSize:17,
									                                textAlign:'center',
									                                }}
									                            editable={false}
									                            placeholder="Select"
									                            value={this.state.inflation_rate} 
									                            />      
									                        </ModalPicker>
									                  	</View>
									                </View>
								              	</View>

								              	{/*Post Retirement Rate */}

								              	<View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:20}}>
									                <View style = {{flex:10,width:150,height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#d9d9d9',borderRadius:5}}>
									                  	<Text style = {styles.view}>Expected Post-Retirement Rate </Text>
									                  	<Text>(% per Year)</Text>
									                </View>

									                <View style ={{flex:10,width:200,alignItems:'center',justifyContent:'flex-start'}}>
									                  <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
									                        <ModalPicker
									                            data={inflation_and_post_rate_data}
									                            onChange={(option)=>{ this.update_post_retirement_sip(option)}}>
									                                
									                            <TextInput
									                                style={{
									                                borderWidth:1,
									                                borderColor:'#d9d9d9',
									                                padding:10,
									                                height:40 ,
									                                width:90 ,
									                                color:'#000000',
									                                textShadowRadius:0,
									                                fontSize:17,
									                                textAlign:'center',
									                                }}
									                            editable={false}
									                            placeholder="Select"
									                            value={this.state.post_retirement_sip} 
									                            />
									                                    
									                        </ModalPicker>
									                  </View>
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
										<View style={{flex:50,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
							     			<TouchableHighlight onPress={()=>this.invert_rates_flip_3()}>
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
					renderIf(this.state.monthly_expenses_connector==false || this.state.monthly_savings_connector==false)
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
					renderIf(this.state.pre_retirement_sip_connector===true && this.state.post_retirement_sip_connector===true && this.state.inflation_rate_connector===true)
					(
						<View>
							<View>
								{
									renderIf(this.state.result_flip_4===true)
									(
										<View>
											<View style={{flex:50,backgroundColor:'#5ac2ed',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
								     			<TouchableHighlight onPress={()=>this.invert_rates_flip_3()}>
								     				<Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#05396E'}}>
								     					Result <Octicons name="triangle-right" size={30} color="black"/>
								     				</Text>
								     			</TouchableHighlight>
				     						</View>

											{/*Years To Retirement*/}
											<View style = {{flexDirection:'column'}}>
												<View style = {{flex:1,alignItems:'center'}}>
												    <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Years To Retirement </Text>
												</View>

												<View style = {{flex:1,alignItems:'center'}}>
												    <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>{((years_to_retirement).toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
												</View>
											</View>

											{/*Monthly Expenses Just After Retirement*/}
											<View style = {{flexDirection:'column'}}>
												<View style = {{flex:1,alignItems:'center',backgroundColor:'#bab6b6',borderRadius:4}}>
												    <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Monthly Expenses Just After Retirement </Text>
												</View>

												<View style = {{flex:1,alignItems:'center'}}>
												    <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Rs. {(expenses.toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
												</View>
											</View>

											{/*Corpus Accumulated Due To Savings*/}
											<View style = {{flexDirection:'column'}}>
													<View style = {{flex:1,alignItems:'center'}}>
												        <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Corpus Accumulated due to Savings</Text>
												    </View>

												    <View style = {{flex:1,alignItems:'center'}}>
												        <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Rs. {(savings.toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
												    </View>
											</View>

											{/*Corpus Required at Retirement*/}
											<View style = {{flexDirection:'column'}}>
												<View style = {{flex:1,alignItems:'center'}}>
												    <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Corpus Required at Retirement</Text>
												</View>

												<View style = {{flex:1,alignItems:'center'}}>
												    <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Rs. {p_previous_last.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
												</View>
											</View>
											
											<View>
												{
													renderIf(shortfall_corpus>0)
													(
														<View>
															{/*Shortfall Corpus*/}
															<View style = {{flexDirection:'column'}}>
																<View style = {{flex:1,alignItems:'center'}}>
																    <Text style = {{fontWeight:'normal',fontSize:17,color:'black'}}>Shortfall Corpus</Text>
																</View>

																<View style = {{flex:1,alignItems:'center'}}>
																    <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Rs. {(shortfall_corpus.toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
																</View>
															</View>

															{/*Extra Monthly Savings*/}
															<View style = {{flexDirection:'column'}}>
																<View style = {{flex:1,alignItems:'center'}}>
																    <Text style = {{fontWeight:'normal',fontSize:17,color:'black'}}>Extra Monthly Savings Needed</Text>
																</View>

																<View style = {{flex:1,alignItems:'center'}}>
																    <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Rs. {(extra_yearly_savings.toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
																</View>
															</View>
														</View>
													)		
												}        			
											
												{
													renderIf(shortfall_corpus<0)
													(
														
														<View style = {{flex:1,flexDirection:'column'}}>
															<View style = {{flex:1,alignItems:'center'}}>
																<Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Appropriate Savings Instead of the Input Value </Text>
															</View>

															<View style = {{flex:1,alignItems:'center'}}>
															    <Text style = {{fontWeight:'normal',fontSize:17,color:'#1a1a1a'}}>Rs. {(monthly_investment_should_be.toFixed()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
															</View>
														</View>
													)
												}		
											</View>
										</View>
									)
								}
							</View>
							<View>
								{
									renderIf(this.state.result_flip_4===false)
									(
										<View style={{flex:50,backgroundColor:'#EAEDEF',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'black',borderRadius:5}}>
							     			<TouchableHighlight onPress={()=>this.invert_result_flip_4()}>
							     				<Text style={{fontSize:30,fontWeight:'bold',justifyContent:'center',color:'#798791'}}>
							     					Result <Octicons name="triangle-down" size={30} color="black"/>
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
	view:{
		color:'#000000',
		fontWeight:'bold',
		fontSize:16,
		alignItems:'flex-start',
		justifyContent:'flex-end',
		textAlign:'center'		
	},
});
