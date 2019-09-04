'use strict';
const AWS = require('aws-sdk')

module.exports = {
  create: async(event, context) => {
    let bodyObj ={};
    try{
      console.log("start: ",event.body);
      bodyObj = JSON.parse(event.body);
    }catch (jsonError) {
      console.log('There was an error parsing the body', jsonError);
      return{
        statusCode: 400
      }
    }

    console.log("after parse"); //delete after

    if(typeof bodyObj.name === 'undefined'|| typeof bodyObj.age === 'undefined'){
      console.log('Missing parameters')
      return{
        statusCode: 400
      }
    }else {
      console.log("default");
    }

    console.log(bodyObj.name);
    console.log(bodyObj.age);

    console.log("end");
    
    let putParams = {
      TableName: process.env.DYNAMODB_USER_TABLE,
      Item:{
        name: bodyObj.name,
        age: bodyObj.age
      }
    }

    let putResults = {};
    try{
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      putResults = await dynamodb.put(putParams).promise();
    }catch (putError){
      console.log('There was a problem putting the user');
      console.log(putParams);
      return{
        statusCode: 500
      }
    }

    return{
      statusCode: 201
    }
  },
  get: async(event, context) => {
    console.log(event.pathParameters.name)  //delete after
    let getParams = {
      TableName: process.env.DYNAMODB_USER_TABLE,
      Key: {
        name: event.pathParameters.name
      }
    }

    let getResult ={};
    try{
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      getResult = await dynamodb.get(getParams).promise();
    }catch (scanError){
      console.log('There was a problem scanning the user');
      console.log('scanError',scanError);
      return{
        statusCode: 500
      }
    }

    console.log(getResult.Item) //delte after

    if(getResult.Item === null){
      return{
        statusCode: 404
      }
    }

    return{
      statusCode: 200,
      body: JSON.stringify({
        name: getResult.Item.name,
        age: getResult.Item.age
      })
    }

  },
  delete: async(event, context) => {
    console.log(event.pathParameters.name)  //delete after
    
    let deleteParams = {
      TableName: process.env.DYNAMODB_USER_TABLE,
      Key: {
        name: event.pathParameters.name
      }
    }

    try{
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      await dynamodb.delete(deleteParams).promise();
    }catch (deleteError){
      console.log('There was a problem deleting the user');
      console.log('deleteError',deleteError);
      return{
        statusCode: 500
      }
    }

    return{
      statusCode: 200,  
    }
  }

}