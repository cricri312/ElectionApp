import React, { Component } from "react";
import Web3 from 'web3'
import '../css/App.css';
import Navbar from './Navbar'
import Elections from '../contracts/Elections.json'
import Election from './Election'
class App extends Component {

async timeout(number) {
    return new Promise( res => setTimeout(res, number) );
}
async componentDidMount(){
  await this.loadWeb3()
  await this.loadBlockchainData()
 
}
async loadWeb3(){
  if(window.etherum){
    window.web3=new Web3(window.etherum)
    await window.etherum.enable()
  }
  else if(window.web3){
    window.web3=new Web3(window.web3.currentProvider)
  }
  else window.alert("No etherum detected")
}
async initContract(){
  const networkId=await window.web3.eth.net.getId()
  const electionData= Elections.networks[networkId]
  if(electionData){
    return new window.web3.eth.Contract(Elections.abi,electionData.address);

  } else {window.alert("No contract are deployed on this network sorry")}
}

async loadBlockchainData(){
  var elinstance
const web3=window.web3
const accounts=await web3.eth.getAccounts()
await this.timeout(2200)
this.setState({account:accounts[0]})
console.log(accounts[0])

this.initContract().then(async (instance)=>{
  elinstance=instance;
  return await elinstance.methods.candidateCount().call()
}).then((candidateCount)=>{
  var name=[];
  var vote=[];
  console.log(candidateCount);
  for (let index = 1; index <= candidateCount; index++) {
         elinstance.methods.candidates(index).call().then((candidate)=>{
            name.push(candidate[1]);
            this.setState({candidates:name})
            vote.push(candidate[2])
            console.log(vote);
            this.setState({votes:vote})
          })
          
        }
})
await this.timeout(1500)
this.setState({loading:false})
}

voteCandidate=async()=>{
const web3=window.web3;
const accounts=await web3.eth.getAccounts();
return accounts;
//initContract().then(async (instance)=>{
//   return await instance.methods.vote(cand)
// })
 }
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates:[],
      votes:[],
      loading:true
    }
  }
  render() {
    let content
    if (this.state.loading) {
      content =<div className="text-center">
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
  <div> <strong>Loading all blockchain Data</strong></div>
</div>

    }else content=<Election
    candidates={this.state.candidates}
    voteC={this.voteCandidate}
    votes={this.state.votes}
    initC={this.initContract}
    />


    return (
      <div>
      <Navbar account={this.state.account} />
      
          
                
                {content}

      </div>
      
    );
  }
}

export default App;
