const fetch = require("node-fetch");

module.exports = {
    metadata: () => ({
        name: 'postFeedback',
        properties: {

            "CName": { "type": "string", "required": true },
            "CEmail": { "type": "string", "required": true },
            "CContact": { "type": "string", "required": true },
            "CTypeofFeed": { "type": "string", "required": true },
            "CEnquiryOn": { "type": "string", "required": true },
            "CFeedback": { "type": "string", "required": true }
        },
        supportedActions: []
    }),
    invoke: async (conversation, done) => {
        var CName,CEmail,CContact,CTypeofFeed,CEnquiryOn,CFeedback;
        CName = conversation.properties().CName;
        CEmail = conversation.properties().CEmail;
        CContact = conversation.properties().CContact;
        CTypeofFeed = conversation.properties().CTypeofFeed;
        CEnquiryOn = conversation.properties().CEnquiryOn;
        CFeedback = conversation.properties().CFeedback;
        conversation.logger().info(CName);
        conversation.logger().info(CEmail);
        conversation.logger().info(CContact);
        conversation.logger().info(CTypeofFeed);
        conversation.logger().info(CEnquiryOn);
        conversation.logger().info(CFeedback);


    //     const response = await fetch("https://ga85834a6daed8b-omfysadw.adb.ap-mumbai-1.oraclecloudapps.com/ords/db300/demo/rajaht?NAME="+CName+"&EMAIL="+CEmail+"&PHONE="+CContact+"&ADDRESS="+CAddress+"&PASSWORD="+CPassword, {
    //     method: 'post',
    //     headers: {}

    // }).then(response => {
    //     if (response.ok) {
    //         console.log("Success")
    //         conversation.logger().info("Data post Successfully.");
    //         conversation.keepTurn("true");
    //         conversation.transition("success");
    //         done();
    //     } else {
    //       console.log("Failed")
    //       conversation.logger().info("Error ");
    //       conversation.keepTurn("true");
    //       conversation.transition("fail");
    //       done();
    //     }
    //   }).catch(error => {
    //       console.log(error);
    //   });

    const body = {
        "users": [
          {
            "name": CName,
            "email": CEmail,
            "phone": CContact,
            "TypeOfFeedback": CTypeofFeed,
            "TypeOfEnquiry": CEnquiryOn,
            "Feedback": CFeedback
          }
        ]
      };
    
    const response = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key' : '$2b$10$GE754JYRloKsrmMpFtUi3..CTNJ1N/yMA9bwtqjq/plrr0215sw3q'
        }
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
    // const data = await response.json();
    
    // console.log(data);
    }
};
