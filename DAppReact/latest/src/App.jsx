import {useState} from 'react'
import React from 'react'
import {ethers} from 'ethers'
import ABI from './assets/CertiApp.json'
import address from './assets/deployed_addresses.json'


const App = () => {
  
  const[fromData,setformData]= useState({
    id:0,
    name:'',
    course:'',
    grade:'',
    date:''
  })
  const [Output,SetOutput]=useState('')
  function handleChange(event){
    console.log(event.target)
    const{name,value}= event.target;
    console.log(name);
    setformData((preState)=>({...preState,[name]:value}))
    console.log(fromData);
        
  }
 async function connectMetemask(){
    const provider= new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer.address);
    alert(`${signer.address} is successfully logged in`)   

  }
  async function handleSubmit(event){
    event.preventDefault()
    const provider= new ethers.BrowserProvider(window.ethereum);    
    const signer = await provider.getSigner();
    const cAbi=ABI.abi;
    const cAddress=address['CertiAppModule#CertiApp'];
    console.log(cAddress);
    const certiInstance= new ethers.Contract(cAddress,cAbi,signer)
    console.log(certiInstance);
    const txnRecepit= await certiInstance.setCertificate(
      fromData.id,
      fromData.name,
      fromData.course,
      fromData.grade,
      fromData.date
    )
    console.log(txnRecepit);
    
  }
  async function getCertificate(){

    const id=document.getElementById('ID').value
    const provider= new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer); 
    const cAbi=ABI.abi;
    const cAddress=address['CertiAppModule#CertiApp'];
    console.log(cAddress);
    const certiInstance= new ethers.Contract(cAddress,cAbi,signer)
    const txtvalue= await certiInstance.certificates(id)
    console.log(txtvalue[0]);
    SetOutput(`Name:${txtvalue[0]},Course:${txtvalue[1]},Grade:${txtvalue[2]},Date:${txtvalue[3]}`)
    
  }

  return (
    <>
        <div>App</div>
        <div>
          <button onClick={connectMetemask}>Connect Metamask</button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label >Id</label>
            <input type="number" name='id' id='id'onChange={handleChange}/><br></br>
            <label >Name</label>
            <input type="text" name='name' id='name' onChange={handleChange}/><br></br>
            <label >Course</label>
            <input type="text" name='course' id='course' onChange={handleChange}/><br></br>
            <label >Grade</label>
            <input type="text" name='grade' id='grade' onChange={handleChange}/><br></br>
            <label >Date</label>
            <input type="date" name='date' id='date'onChange={handleChange}/><br></br>
          
          {/* <div> */}
            <div >
              <button>Submit</button>
            </div>
            {/* <div>
              <button>Reset</button>
            </div> */}
        </form>
            <div>
              <input type="text" name='ID' id='ID'/><button onClick={getCertificate}>Get Certificate</button>
              <div>
              </div>
            </div>
          </div>
          <div>
            <p>{Output}</p>
          </div>
       

    </>
  )
 }

export default App