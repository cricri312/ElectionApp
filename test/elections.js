const { assert } = require('chai')

const Elections= artifacts.require("Elections")
require('chai')
.use(require('chai-as-promised'))
.should()


contract('Elections',(accounts)=>{
    var elinstance;
    //Check if the contract is initialized with 2 candidates
describe("Elections deployment tests",async()=>{
    it("initialized with 2 candidates",async()=>{
       // const candidate=await Elections.deployed();
        //assert.equal(candidate.candidateCount(),2);
        return Elections.deployed().then(function(instance){
            return instance.candidateCount();
        }).then((count)=>{
            assert.equal(count,2)
        })

    })

    //Test if the candidate is initialized by correct value
    it("test correct initial candidate value",async()=>{
        return Elections.deployed().then((instance)=>{
            elinstance=instance;
            return elinstance.candidates(1);
            
        }).then((candidate)=>{
            assert.equal(candidate[0],1,"correct id")
            assert.equal(candidate[1],"Cristian Boffa","correct name")
            assert.equal(candidate[2],0,"0 votes for start")
            return elinstance.candidates(2);
        }).then((candidate)=>{
            assert.equal(candidate[0],2,"correct id")
            assert.equal(candidate[1],"Arek Kalandyk","correct name")
            assert.equal(candidate[2],0,"0 votes for start")
        })
     })
     it("possibility to vote",async()=>{
        return Elections.deployed().then((instance)=>{
            elinstance=instance;
            candidateId=1;
            return elinstance.vote(candidateId,{from : accounts[0]});
     }).then( ()=>{
            return elinstance.voters(accounts[0]);
     }  ).then((voted)=>{
         assert(voted,"Marked as voted");
         return elinstance.candidates(candidateId);
     }).then((candidate)=>{
         assert.equal(candidate[2],1);
     })
})


})



})