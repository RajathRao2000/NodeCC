const fetch = require("node-fetch");

module.exports = {
    metadata: () => ({
        name: 'postData',
        properties: {

            "CName": { "type": "string", "required": true },
            "CEmail": { "type": "string", "required": true },
            "CContact": { "type": "string", "required": true },
            "CAddress": { "type": "string", "required": true },
            "CPassword": { "type": "string", "required": true }
        },
        supportedActions: []
    }),
    invoke: async (conversation, done) => {
        var data,CName,CEmail,CContact,CAddress,CPassword;
        CName = conversation.properties().CName;
        CEmail = conversation.properties().CEmail;
        CContact = conversation.properties().CContact;
        CAddress = conversation.properties().CAddress;
        CPassword = conversation.properties().CPassword;
        conversation.logger().info(CName);
        conversation.logger().info(CEmail);
        conversation.logger().info(CContact);
        conversation.logger().info(CAddress);
        conversation.logger().info(CPassword);


        const response = await fetch("https://ga85834a6daed8b-omfysadw.adb.ap-mumbai-1.oraclecloudapps.com/ords/db300/demo/rajaht?NAME="+CName+"&EMAIL="+CEmail+"&PHONE="+CContact+"&ADDRESS="+CAddress+"&PASSWORD="+CPassword, {
        method: 'post',
        headers: {}

    }).then(response => {
        if (response.ok) {
            console.log("Success")
            conversation.logger().info("Data post Successfully.");
            conversation.keepTurn("true");
            conversation.transition("success");
            done();
        } else {
          console.log("Failed")
          conversation.logger().info("Error ");
          conversation.keepTurn("true");
          conversation.transition("fail");
          done();
        }
      }).catch(error => {
          console.log(error);
      });
    }
};