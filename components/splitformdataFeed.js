module.exports = {

    metadata: () => ({
        "name": "splitformDataFeedback",
        "properties": {
            "Info": { "type": "string", "required": true },
            "CName": { "type": "string", "required": true },
            "CEmail": { "type": "string", "required": true },
            "CContact": { "type": "string", "required": true },
            "CTypeofFeed": { "type": "string", "required": true },
            "CEnquiryOn": { "type": "string", "required": true },
            "CFeedback": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),
    invoke: async (conversation, done) => {
        var data,Info,CName,CEmail,CContact,CTypeofFeed,CEnquiryOn,CFeedback,fn,mn,mail,toe,eo,feed;
       // C_stdt,C_contact,C_etdt
        Info = conversation.properties().Info;
        CName = conversation.properties().CName;
        CEmail = conversation.properties().CEmail;
        CContact = conversation.properties().CContact;
        CTypeofFeed = conversation.properties().CTypeofFeed;
        CEnquiryOn = conversation.properties().CEnquiryOn;
        CFeedback = conversation.properties().CFeedback;
        data = Info.split("|");
		//qqqqqqq|a@mail.com|1234567890|Complaint|DTH
        fn = data[0];
        mn = data[2];
        mail = data[1];
        toe = data[3];
        eo = data[4];
        feed=data[5];
        //con = data[5];
        conversation.variable(CName, fn);
        conversation.variable(CEmail, mail);
        conversation.variable(CContact, mn);
        conversation.variable(CTypeofFeed, toe);
        conversation.variable(CEnquiryOn, eo);
        conversation.variable(CFeedback, feed);
        conversation.done(true);
        conversation.keepTurn(true);
        done();

    //     const response = await fetch("https://ga85834a6daed8b-omfysadw.adb.ap-mumbai-1.oraclecloudapps.com/ords/db300/demo/rajaht?NAME="+CName+"&EMAIL="+CEmail+"&PHONE="+CContact+"&ADDRESS="+CAddress+"&PASSWORD="+CPassword, {
    //     method: 'post',
    //     headers: {
    //     }

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
    }
};