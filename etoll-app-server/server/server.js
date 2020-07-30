const etollacc = require('./data/etollacc.json'); 
const express = require('express');
const bodyParser = require('body-parser'); 
const server = express();
const cors = require('cors'); 


server.use(cors()); 
server.use(express.json()); 
server.use(bodyParser.json()); 

// server.get('/api/info',(request,response)=>{

//     response.send('it works'); 
// })

server.get('/api/info',(request,response)=>{

    response.json(etollacc)
})
server.post('/api/info',(request,response)=>{
    try{
        let firstName = request.body.customer.firstName.trim(); 
        let lastName = request.body.customer.lastName.trim(); 
        let companyName = request.body.customer.companyName.trim(); 
        let accountType = request.body.accountType.trim(); 
        let tagAmount = request.body.tagAmount.trim(); 
        let topUpAmount = request.body.topUpAmount.trim(); 
        let businessHours = request.body.contactNumbers.businessHours.trim(); 
        let afterBusinessHours = request.body.contactNumbers.afterBusinessHours.trim(); 
        let mobile = request.body.contactNumbers.mobile.trim(); 
              
        let highest = 0; 
        for(let i =0;i<etollacc.length;i++){
            if(etollacc[i].id > highest){
                highest = etollacc[i].id; 
            }
        }
        let customer = {firstName,lastName,companyName}
        let contactNumbers = {businessHours,afterBusinessHours,mobile}
        let u = {id:++highest,customer,accountType,tagAmount,topUpAmount,contactNumbers}; 
        etollacc.push(u); 
        response.json({data:u,status:200}); 
    }
    catch(error){
        response.json({status:500}); 
    }
 
})

const PORT = process.env.PORT || 4000; 
server.listen(PORT,()=>{
    console.log('The server is up and running and listening on port ' + PORT); 
})