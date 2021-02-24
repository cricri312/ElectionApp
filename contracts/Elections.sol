pragma solidity >=0.4.22 <0.8.0;

contract Elections{

struct Candidate{
    uint id;
    string name;
    uint vote;
}

mapping(uint=>Candidate) public candidates;
mapping(address=>bool) public voters;
uint public candidateCount;

constructor() public{
 addCandidate("Cristian Boffa");
 addCandidate("Arek Kalandyk");
}

//Add the candidate to the candidate list
function addCandidate(string memory _name) private{
    candidateCount++;
    candidates[candidateCount]= Candidate(candidateCount,_name,0);
}

function vote(uint _candidateId) public{
    
require(!voters[msg.sender]);
require(_candidateId>0 && _candidateId<=candidateCount);
    voters[msg.sender]=true;
     candidates[_candidateId].vote++;
}

}