// import "../src/app.css";



import { default as Web3} from 'web3';
import {default as contract} from 'truffle-contract'

import voting_artifacts from "../../build/contracts/Voting.json";
var Voting= contract(voting_artifacts);
var accounts;
var account;

var candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}
window.App = {
  start: function() {
    var self=this;

  Voting.setProvider(web3.currentProvider);
  web3.eth.getAccounts(function(err , accs){
if (err !=null) {
  alert("there was an error fetching your acc");
  return;
}
  if (accs.length ==0) {
    alert("coud not get any acc sure ur eth client is con.....");
    return;
  }
  accounts=accs;
  account=accounts[0];
});

  self.loadCandidatesAndVotes();
},

loadCandidatesAndVotes: function() {
  var candidateNames = Object.keys(candidates);

  for(var i=0; i<candidateNames.length; i++) {
    let name =candidateNames[i];
    Voting.deployed().then(function(f){
      f.totalVotesFor.call(name).then(function(f) {
        $("#" + candidates[name]).html(f.toNumber());
      })
     })
     }

     }

     };


window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.warn(".......................................")
    window.Web3 =new Web3(web3.currentProvider);
  } else {
    console.warn("no web 3 detected 2nd line ");
    window.web3 = new Web3(new Web3.provider.HttpProvider("http://127.0.0.1:8545"));
  }
  App.start();
});