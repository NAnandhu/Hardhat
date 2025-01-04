const{loadFixture}=require('@nomicfoundation/hardhat-toolbox/network-helpers')
const {expect}=require('chai');
const {ethers}=require('hardhat');

describe('Certi',function(){
    async function deployContract(){
       const [admin,other]= await ethers.getSigners();
       const cert = await ethers.getContractFactory('CertiApp');
       const Cert=await cert.deploy();
       return{Cert,admin,other}

    }
    it("Should be deployed only by admin",async function(){
        const {Cert,admin}=await loadFixture(deployContract)
        // console.log(admin.address);
        expect(Cert.deploymentTransaction().from).to.equal(admin.address)
        
    })
    it("Able to issue & read certificate",async function(){
        const{Cert,admin}=await loadFixture(deployContract);
        await Cert.setCertificate(1,"Anandhu","Cs","A","1/12/2024");
        const Certi=await Cert.certificates(1)
        console.log(Certi[0]);
        expect(Certi[0]).to.equals("Anandhu");
        expect(Certi[1]).to.equals("Cs");
        expect(Certi[2]).to.equals("A");
        expect(Certi[3]).to.equals("1/12/2024");
        
    })
    it("Only admin can issue the Certificate",async function(){
        const {Cert,other}=await loadFixture(deployContract);
        await expect(Cert.connect(other).setCertificate(2,"Aneesh","Cs","A","12/12/2024")).to.be.revertedWith("Unauthorized Access")

    })

})