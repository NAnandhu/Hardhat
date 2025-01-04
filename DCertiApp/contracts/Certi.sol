// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract CertiApp {
    struct certificate{
        string name;
        string course;
        string grade;
        string date;
    }
    
    address admin;
    constructor(){
        admin=msg.sender;
    }
    modifier onlyadmin{
        require(msg.sender==admin,"Unauthorized Access");
        _;
    }
    mapping(uint256=>certificate) public certificates;

    function setCertificate(uint _id,
            string memory _name,
            string memory _course,
            string memory _grade,
            string memory _date) public onlyadmin{
            certificates[_id]=certificate(_name,_course,_grade,_date);

            }
       

}

    
