import React, { Component } from 'react'
import Elections from '../contracts/Elections.json'
class Election extends  Component{
  render() {
    return (
        <table className="table"> 
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Candidate</th>
            <th scope="col">Vote</th>
            <th scope="col">Vote select</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{this.props.candidates[0]}</td>
            <td>{this.props.votes[0]}</td>
            <td><button type="submit"
            onClick={async()=>{
                const networkId=await window.web3.eth.net.getId()
                const electionData= Elections.networks[networkId]
                const election=new window.web3.eth.Contract(Elections.abi,electionData.address);
                var add= await this.props.voteC()
                var converted=add.toString()
                var bool=await election.methods.voters(converted).call()
                if(bool){
                    window.alert("already voted")
                }else{
                
                election.methods.vote(1).send({from: converted})
                
            }
              }}>
            VOTE
          </button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>{this.props.candidates[1]}</td>
            <td>{this.props.votes[1]}</td>
            <td><button type="submit"
            onClick={async()=>{
                const networkId=await window.web3.eth.net.getId()
                const electionData= Elections.networks[networkId]
                const election=new window.web3.eth.Contract(Elections.abi,electionData.address);
                var add= await this.props.voteC()
                var converted=add.toString()
                var bool=await election.methods.voters(converted).call()
                
                if(bool){
                    window.alert("already voted")
                }else{
                
                election.methods.vote(2).send({from: converted})

                
            }
                  
              }}>
            VOTE
          </button></td>
          </tr>

        </tbody>
      </table>
    );
  }
}

export default Election;
