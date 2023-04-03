<template>
    <div style="height:100%">
        <div class="row" style="height:100%">
            <div class="col-3">
                <div class="col-12 mt-2 mb-2" v-for="player in players" :key="player.playerId">
                    <div class="card" v-if="!player.isCurrentPlayer">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png" height="auto" width="100%">
                                </div>
                                <div class="col-8">
                                    <h5 class="card-title">{{player.playerName}}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">votes:{{player.votes}}</h6>
                                    <p v-if="player.isVoter" style="color: green">*Voter*</p>
                                </div>
                            </div>
                            
                            <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                        </div>
                    </div>          
                </div>
            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col align-self-end">

                    </div>
                </div>
            </div>

            <div class="my-div">
                <div class="row">
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png" height="auto" width="100%">
                                    </div>
                                    <div class="col-8">
                                        <h5 class="card-title">{{getCurrentPlayer().playerName}}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">votes:{{getCurrentPlayer().votes}}</h6>
                                        <p v-if="getCurrentPlayer().isVoter" style="color: green">*Voter*</p>
                                    </div>
                                </div>
                                
                                <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="row">
                            <!-- <mdb-card class="col-3">
                                <mdb-card-img src="/path/to/image.jpg" alt="Image" top />
                                <mdb-card-body>
                                <h4 class="card-title">Title</h4>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ante ac felis ornare facilisis.</p>
                                </mdb-card-body>
                            </mdb-card> -->
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    data(){
        return{
            turnIndicator: 0,
            playerCount: 4,
            table:[],
            currentProblemCard: {id:-1,text:"place holder"},
            policyDeck:[
                {
                    id: 0,
                    text: "legalize weed."
                },
                {
                    id: 1,
                    text: "legalize meth."
                },
                {
                    id: 2,
                    text: "legalize cocain."
                },
                {
                    id: 3,
                    text: "legalize opiode."
                },
                {
                    id: 4,
                    text: "legalize weed."
                },
                {
                    id: 5,
                    text: "follow bhudda's teching"
                },
                {
                    id: 6,
                    text: "construct communal flat"
                },
                {
                    id: 7,
                    text: "จำนำข้าว"
                },
                {
                    id: 8,
                    text: "don't knowๆๆๆ"
                },
                {
                    id: 9,
                    text: "collective farm"
                },
                {
                    id: 10,
                    text: "we travel togther"
                },
                {
                    id: 11,
                    text: "place hoder"
                },
                {
                    id: 12,
                    text: "place hoder"
                },
                {
                    id: 13,
                    text: "place hoder"
                },
                {
                    id: 14,
                    text: "place hoder"
                },
                {
                    id: 15,
                    text: "place hoder"
                },
                {
                    id: 16,
                    text: "place hoder"
                },
                {
                    id: 17,
                    text: "place hoder"
                },
                {
                    id: 18,
                    text: "place hoder"
                },
                {
                    id: 19,
                    text: "place hoder"
                },
                {
                    id: 20,
                    text: "place hoder"
                },
                {
                    id: 21,
                    text: "place hoder"
                },
                {
                    id: 22,
                    text: "place hoder"
                },
                {
                    id: 23,
                    text: "place hoder"
                },
                {
                    id: 24,
                    text: "place hoder"
                },
                {
                    id: 25,
                    text: "place hoder"
                },
                {
                    id: 26,
                    text: "place hoder"
                },
                {
                    id: 27,
                    text: "place hoder"
                },
                {
                    id: 28,
                    text: "place hoder"
                },
                {
                    id: 29,
                    text: "place hoder"
                },
                {
                    id: 30,
                    text: "place hoder"
                },
                {
                    id: 31,
                    text: "place hoder"
                },
                {
                    id: 32,
                    text: "place hoder"
                },
                {
                    id: 33,
                    text: "place hoder"
                },
                {
                    id: 34,
                    text: "place hoder"
                },
                {
                    id: 35,
                    text: "place hoder"
                },
                {
                    id: 36,
                    text: "place hoder"
                },
                {
                    id: 37,
                    text: "place hoder"
                },
                {
                    id: 38,
                    text: "place hoder"
                },
                {
                    id: 39,
                    text: "place hoder"
                },
                {
                    id: 40,
                    text: "place hoder"
                },
                {
                    id: 41,
                    text: "place hoder"
                },
                {
                    id: 42,
                    text: "place hoder"
                },
                {
                    id: 43,
                    text: "place hoder"
                },
                {
                    id: 44,
                    text: "place hoder"
                },
                {
                    id: 45,
                    text: "place hoder"
                },
                {
                    id: 46,
                    text: "place hoder"
                },
                {
                    id: 47,
                    text: "place hoder"
                },
                {
                    id: 48,
                    text: "place hoder"
                },
            ],
            problemsDeck:[
                {
                    id:0,
                    text:"the homeless filled the streets.",
                },
                {
                    id:1,
                    text:"there are not enough demand for rice farmers are starving.",
                },
                {
                    id:2,
                    text:"people are living in slums.",
                },
                {
                    id:3,
                    text:"workers are on strike they don't get hospital compensation from the company.",
                },
                {
                    id:4,
                    text:"pm2.5: cities are filled with smog from diesel trucks and burning down farmlands.",
                },
                {
                    id:5,
                    text:"crime rate keeps increasing",
                },
                {
                    id:6,
                    text:"the country is in deep debt.",
                },
                {
                    id:7,
                    text:"the country is running out of oil.",
                },
                {
                    id:8,
                    text:"immigrants are taking over the population",
                },
                {
                    id:9,
                    text:"birth rate is going through the roof.",
                },
            ],
            players:[
                {
                    playerId: 0,
                    playerName: "player1",
                    isCurrentPlayer: true,
                    isVoter:false,
                    votes: 0,
                    cards: [],
                },
                {
                    playerId: 1,
                    playerName: "player2",
                    isCurrentPlayer: false,
                    isVoter:false,
                    votes: 0,
                    cards: [],
                },
                {
                    playerId: 2,
                    playerName: "player3",
                    isCurrentPlayer: false,
                    isVoter:false,
                    votes: 0,
                    cards: [],
                },
                {
                    playerId: 3,
                    playerName: "player4",
                    isCurrentPlayer: false,
                    isVoter:true,
                    votes: 0,
                    cards: [],
                },
            ],
        }
    },
    methods:{
        getCurrentPlayer(){
            for(let i = 0;i<this.playerCount;i++){
                // console.log(this.players[i])
                if(this.players[i].isCurrentPlayer){
                    return this.players[i]
                }
            }
            return {
                    playerId: -1,
                    playerName: "playerx",
                    isCurrentPlayer: false,
                    isVoter:false,
                    votes: 0,
                    cards: [],
            }
            // return this.players.forEach(player=>{
            //     if(player.isCurrentPlayer){
            //         return player
            //     }
            // })
        },
        // getVoter(){
        //     for(player in this.players){
        //         if(player.isVoter){
        //             return player
        //         }
        //     }
        // },
    }
}
</script>

<style scoped>
.my-div {
  position: absolute;
  bottom: 0;
}
</style>