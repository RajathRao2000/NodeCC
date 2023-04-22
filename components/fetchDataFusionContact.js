'use strict';
var credImport=require('./cred.js')

// Documentation for writing custom components: https://github.com/oracle/bots-node-sdk/blob/master/CUSTOM_COMPONENT.md

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch. 
// const fetch = require("node-fetch");
 
module.exports = {
  metadata: () => ({
    name: 'fetchDataFusionContact',
    properties: {
      input: { required: true, type: 'string' },
    },
    supportedActions: ['route1', 'route2']
  }),

  /**
   * invoke methods gets called when the custom component state is executed in the dialog flow
   * @param {CustomComponentContext} context 
   */
  invoke: async (context,done) => {
    let name,email,phone;

    let imageRes,url,imageurl;
    let codeReceived=context.properties().input
    let dataCont;

await fetch(`https://fa-${credImport.server}-saasfademo1.ds-fa.oraclepdemos.com//hcmRestApi/resources/11.13.18.05/emps?q=PersonNumber=${codeReceived}`,{
    method: 'get',
    headers: {
        'Authorization': 'Basic '+btoa(credImport.userName+':'+credImport.password),
    },
})
.then(response=>response.json())
.then(async json=>{
  name=json.items[0].DisplayName
  email=json.items[0].WorkEmail
  phone=json.items[0].WorkPhoneNumber
  //////////
  //take photo
  url = json.items[0].links[17].href
   await fetch(url,{
    method: 'get',
    headers: {
        'Authorization': 'Basic '+btoa(credImport.userName+':'+credImport.password),
    }}).then(response=>response.json())
    .then(async json=>{
      ///////////////
      imageurl=json.items[0].links[3].href;
      context.logger().info(imageurl)

      // fetch(imageurl,{
      //   method: 'get',
      //   headers: {
      //     'Authorization': 'Basic '+btoa(credImport.userName+':'+credImport.password),
      //   }
      // })
      // .then(response=>{
      //   response.text()
      //   // let rawimageRes=response;
      //   // context.logger().info(rawimageRes)
      //   // let b64Response = btoa(rawimageRes);
      //   // context.logger().info(b64Response)
      //   // imageRes=b64Response;

      // }).then(json => {
      //   context.logger().info(json)
      // })
////////////////
var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic dXNlcl9yMTNfYTJmOndJYzhiXjYq");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

await fetch(imageurl, requestOptions)
  .then(response => response.blob())
  .then(result => {
    context.logger().info(result)
    imageRes=result
    context.logger().info(imageRes)
    dataCont=[
      {
          "website": "http://www.sample.com",
          "keywords": "select",
          // "imageUrl": imageRes,
          "name": name,
          "description": "Phone: "+phone+"\n E-mail: "+email
      }
  ] 
  context.variable("dataCont",dataCont)
  context.transition("route1")
  context.keepTurn(true)
context.logger().info(dataCont);
context.reply("dataCont")
  })
  .catch(error => context.logger().info('error', error));
/////////////////
    })
    .catch(error=>{context.logger().info(error)})
  //////////
  // context.logger().info(imageRes)

  // context.reply("Name: <b>"+json.items[0].DisplayName+"</b>\n"+"Phone: "+json.items[0].WorkPhoneNumber+"\n"+"E-mail: "+json.items[0].WorkEmail+"l"+imageRes)
  // context.logger().info(imageRes)
context.logger().info(dataCont);
context.reply("hey")
})
  .catch(error=>{
    context.reply('not found')
    context.keepTurn(true)
    context.transition("route2")
    console.log(error)})

    dataCont=[
      {
          "website": "http://www.sample.com",
          "keywords": "select",
          // "imageUrl": imageRes,
          "name": name,
          "description": "Phone: "+phone+"\n E-mail: "+email
      }
  ] 
  context.variable("dataCont",dataCont)
  context.transition("route1")
  context.keepTurn(true)
context.logger().info(dataCont);
context.reply("dataCont")
  }}

