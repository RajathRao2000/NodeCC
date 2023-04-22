module.exports = {

    metadata: () => ({
        "name": "splitformData",
        "properties": {
            "Info": { "type": "string", "required": true },
            "CName": { "type": "string", "required": true },
            "CEmail": { "type": "string", "required": true },
            "CContact": { "type": "string", "required": true },
            "CAddress": { "type": "string", "required": true },
            "CPassword": { "type": "string", "required": true }
        },
        "supportedActions": ["correctIP","wrongIP","true"]
    }),
    invoke: async (conversation, done) => {
        var data,Info,CName,CEmail,CContact,CAddress,CPassword,fn,mn,mail,address,pss;
       // C_stdt,C_contact,C_etdt
        Info = conversation.properties().Info;
        CName = conversation.properties().CName;
        CEmail = conversation.properties().CEmail;
        CContact = conversation.properties().CContact;
        CAddress = conversation.properties().CAddress;
        CPassword = conversation.properties().CPassword;
        if(Info=="true"){

            conversation.transition("true");
            conversation.keepTurn(true);
            done();
            
        }else if(Info.indexOf('|') > -1){
        data = Info.split("|");
		//ghgh|7410749513|shradha.gomare18@omfysgroup.com|2022-04-07|2022-04-19
        fn = data[0];
        mn = data[2];
        mail = data[1];
        address = data[3];
        pss = data[4];
        //con = data[5];
        conversation.variable(CName, fn);
        conversation.variable(CEmail, mail);
        conversation.variable(CContact, mn);
        conversation.variable(CAddress, address);
        conversation.variable(CPassword, pss);
        conversation.done(true);
        conversation.keepTurn(true);
        done();
        }else{
            conversation.transition("wrongIP");
            conversation.keepTurn(true);
            done();
        }

    }
};