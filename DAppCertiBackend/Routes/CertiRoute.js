import { Router , } from "express";
import {ethers} from 'ethers';
import ABI from './CertiApp.json'with {type:'json'}
import address from './deployed_addresses.json'with {type:'json'}

const CertRoute=Router();


const provider =new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
const signer = await provider.getSigner();
console.log(signer);
// const provider =new ethers.JsonRpcProvider('http://dja4imG3_cFbzawaIDXQ0-rJ4s8MTe6-')
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY,provider)
const certInstance = new ethers.Contract(address["CertiAppModule#CertiApp"],ABI.abi,signer);

CertRoute.get('/',(req,res)=>{

  res.send("Hello Welcome to CertiApp");
})

CertRoute.post('/setCertificate',async(req,res)=>{

    try {
        const {id,name,course,grade,date}=req.body
        const txnReceipt = await certInstance.setCertificate(id,name,course,grade,date);
        console.log(txnReceipt);
        if(txnReceipt){
            res.send(txnReceipt.hash)
    
        }else{
            res.status(400).json({message:"you transaction failed"})
        }
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
   
    
})
CertRoute.get('/getcertificate/:id',async(req,res)=>{    
    // try {
        const id =req.params.id       
        console.log(id);
        const txnvalue = await certInstance.certificates(id);
        console.log(txnvalue);
   
})


export{CertRoute}