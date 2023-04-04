<template>
    <div style="height:100%">
        <div class="row" style="height:100%" v-if="isStarted&&winner==null">
            <div class="col-3">
                <div class="col-12 mt-2 mb-2" v-for="player in players" :key="player.playerId">
                    <div class="card" v-if="isVoterTurn?!player.isVoter:!player.isCurrentPlayer ">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-4">
                                    <img src="@/assets/images/dog.jpg" height="auto" width="100%">
                                </div>
                                <div class="col-8">
                                    <h5 class="card-title">{{player.playerName}}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">votes:{{player.votes}}K</h6>
                                    <p v-if="player.isVoter" style="color: green">*Voter*</p>
                                </div>
                            </div>   
                        </div>
                    </div>          
                </div>
            </div>
            <div class="col-9">
                <div class="row justify-content-md-center">
                    <div class="col-3">

                    </div>
                    <div class="col-6">
                        <div class="card" >
                            <div class="card-body" style="background-color:black">
                                <h5 style="color: antiquewhite;">your problem(s): </h5>
                                <h6 class="card-subtitle mb-2" style="color:white">{{ currentProblemCard.text }}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-3" style="align-self: center;text-align: -webkit-center;">
                        <h5>{{ daysLeft }} days</h5>
                        <h5>before election</h5>
                    </div>
                    <div class="col-12 mt-3 mb-2">
                        <h5 style="text-align: center;">
                            {{ isVoterTurn?"Rank the cards you like the most\n from 1st, 2nd, to, 3rd respectively":"on the table:" }}
                        </h5>
                    </div>
                    <div class="col-12 mt-2">
                        <div class="card-container" ref="cardContainer">
                            <b-card
                                v-b-tooltip.hover 
                                :title="card.reasoning"
                                v-for="(card, index) in table"
                                :key="card.card.id"
                                class="card-grab card "
                                :style="{ left: cardLeftPositions[index] + 'px' }"
                                style="padding-top: 8rem;padding-bottom: 8rem;align-items: center;"
                                @mousedown="onCardMouseDown(index, $event)"
                                text="Tooltip"
                            >   
                                {{ isVoterTurn?card.card.text:card.player.playerName+"'s card'" }}
                                <!-- <div v-if="showText && isVoterTurn">
                                    This text will be displayed on hover.
                                </div> -->
                            </b-card>
                        </div>
                        <!-- <div class="row">
                            <div class="col-3" v-for="card in table" :key="card.id">
                                <div class="card" style="padding-top: 10rem;padding-bottom: 10rem;align-items: center;">
                                    <h6 class="card-subtitle mb-2 text-muted">{{ card.card.text }}</h6>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="my-div">
                <div class="row">
                    <div class="col-3" style="align-self: flex-end;">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png" height="auto" width="100%">
                                    </div>
                                    <div class="col-8">
                                        <h5 class="card-title">{{getCurrentPlayer().playerName}}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">votes:{{getCurrentPlayer().votes}}K</h6>
                                        <p v-if="getCurrentPlayer().isVoter" style="color: green">*Voter*</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-9 card-carousel" v-if="!isVoterTurn">
                        <div class="cards">
                            <div v-for="card in getCurrentPlayer().cards" :key="card.id">
                                <div class="card" style="height: 120px; width: 100px;">
                                    <div @click="tempCard=card; showModal = true" class="card-body" style="display: flex;justify-content: center; align-items: center;cursor: pointer;">
                                        <p class="card-subtitle text-muted" style="font-size: 0.5rem;">{{ card.text }}</p>
                                    </div>
                                    <!-- <button class="btn btn-primary" @click="showModal = true">Activate Modal</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-9" v-else style="display: flex;justify-content: flex-end; align-items: center;">
                        <div >
                            <button @click="onConfirmRanking" type="button" class="btn btn-primary">
                                Confirm
                            </button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div class="container" v-else>
            <div class="row">
                <div class="col-12" v-if="winner!=null" style="text-align: -webkit-center;">
                    <h1>All Hail New Priminister: {{ winner.playerName }}</h1>
                    <button @click="$nuxt.$router.go()" class="btn btn-primary btn-lg">New Game</button>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center" v-else style="height: 300px;">
                    <button @click="dealCards" class="btn btn-primary btn-lg">Start</button>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">U sure?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal = false">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                    <label for="inputText">explaination/reasoning:</label>
                    <input type="text" class="form-control" id="inputText" v-model="reasoning">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="choseCard(tempCard)">Confirm</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="showModal = false">Close</button>
                </div>
                </div>
            </div>
        </div>
        <!-- <div v-else>
            <button @click="dealCards">Click me</button>
        </div> -->
    </div>
</template>

<script>
import { MdbCard, MdbCardHeader, MdbCardBody } from 'mdbvue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    components: {
        MdbCard,
        MdbCardHeader,
        MdbCardBody
    },
    mounted(){
        this.problemsDeck = this.shuffleArray(this.problemsDeck)
    },
    data(){
        return{
            winner:null,
            runningNumberForProblems:0,
            daysLeft:3,
            showModal: false,
            reasoning:"",
            isDragging: false,
            startIndex: null,
            startLeft: null,
            cardLeftPositions: [],
            isVoterTurn: false,
            isStarted:false,
            turnIndicator: 0,
            playerCount: 4,
            table:[],
            tempCard:{},
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
                    text: "Every Monday is \"Pajama Day,\" where all citizens are encouraged to wear their favorite sleepwear to work."
                },
                {
                    id: 12,
                    text: "All public buildings must have a mandatory slide next to every staircase for faster and more fun transportation."
                },
                {
                    id: 13,
                    text: "The national currency will be replaced with a system of high-fives, with the value of the high-five determined by the quality of the gesture."
                },
                {
                    id: 14,
                    text: "Citizens must have at least one silly dance move that they can perform on command."
                },
                {
                    id: 15,
                    text: "Every year, the entire country will shut down for a week-long holiday dedicated to celebrating ice cream."
                },
                {
                    id: 16,
                    text: "Citizens will be encouraged to take naps in the middle of the day to increase productivity and happiness."
                },
                {
                    id: 17,
                    text: "All pets will be required to wear cute and fashionable outfits."
                },
                {
                    id: 18,
                    text: "All citizens must have a \"happy hour\" every day, where they spend at least an hour doing something that brings them joy."
                },
                {
                    id: 19,
                    text: "A \"no frown\" policy will be enforced, where anyone caught frowning will be required to attend a mandatory tickle party."
                },
                {
                    id: 20,
                    text: "All citizens will have access to free popcorn and cotton candy at all times."
                },
                {
                    id: 21,
                    text: "All cars must have a clown nose attached to the front bumper."
                },
                {
                    id: 22,
                    text: "The national sport will be a game of dodgeball played on trampolines."
                },
                {
                    id: 23,
                    text: "All public restrooms will have a mandatory karaoke machine for entertainment."
                },
                {
                    id: 24,
                    text: "All restaurants must serve their food in waffle cones to encourage a more portable and fun eating experience."
                },
                {
                    id: 25,
                    text: "All official government documents must be written in rhyme."
                },
                {
                    id: 26,
                    text: "A mandatory daily \"joke hour\" will be held on all public transportation to boost morale and reduce stress."
                },
                {
                    id: 27,
                    text: "All citizens must have a secret handshake that they can use to identify each other in public."
                },
                {
                    id: 28,
                    text: "A mandatory \"happy thoughts\" session will be held every morning to start the day on a positive note."
                },
                {
                    id: 29,
                    text: "The national anthem will be rewritten to include lyrics about unicorns and rainbows."
                },
                {
                    id: 30,
                    text: "All parks will have at least one giant inflatable bounce house for citizens to enjoy."
                },
                {
                    id: 31,
                    text: "Every citizen will be assigned a personal jester to make them laugh whenever they're feeling down."
                },
                {
                    id: 32,
                    text: "All public transportation will be replaced with giant inflatable balls that citizens can hop inside and roll around in."
                },
                {
                    id: 33,
                    text: "Every year, the entire country will have a massive pillow fight to release stress and promote a sense of community."
                },
                {
                    id: 34,
                    text: "All government buildings will be required to have a ball pit in the lobby for citizens to play in."
                },
                {
                    id: 35,
                    text: "A mandatory \"silly hat\" policy will be enforced, where all citizens must wear a ridiculous hat in public."
                },
                {
                    id: 36,
                    text: "All streetlights will be replaced with giant lollipops for a sweeter and more whimsical cityscape."
                },
                {
                    id: 37,
                    text: "The national bird will be a penguin, even if the country is nowhere near the poles."
                },
                {
                    id: 38,
                    text: "A mandatory \"compliment hour\" will be held every day, where citizens must compliment at least 10 people they encounter."
                },
                {
                    id: 39,
                    text: "All public restrooms will be decorated to look like a fairy tale forest to encourage creativity and imagination."
                },
                {
                    id: 40,
                    text: "All police officers will be required to wear superhero costumes to inspire confidence and heroism."
                },
                {
                    id: 41,
                    text: "A national \"hug day\" will be celebrated every week to promote physical and emotional connection between citizens."
                },
                {
                    id: 42,
                    text: "All government meetings will be held in a giant ball pit to encourage creative thinking and playfulness."
                },
                {
                    id: 43,
                    text: "Every citizen will have a \"funny name\" assigned to them, which they must use in all official documents and interactions."
                },
                {
                    id: 44,
                    text: "A mandatory \"silly walk\" policy will be enforced, where citizens must walk in a goofy and ridiculous manner in public."
                },
                {
                    id: 45,
                    text: "All public parks will have a section dedicated to bounce houses and inflatable obstacle courses for citizens to enjoy."
                },
                {
                    id: 46,
                    text: "A national holiday will be dedicated to the celebration of bad puns and cheesy jokes."
                },
                {
                    id: 47,
                    text: "All public libraries will have a mandatory nap time every day for citizens to rest and recharge."
                },
                {
                    id: 48,
                    text: "A national \"paint your pet\" day will be celebrated every year, where citizens must paint or draw their pets in creative and silly ways."
                },
                {
                    id: 49,
                    text: "All public transportation will be required to have a DJ booth for citizens to play their favorite music and dance during their commute."
                },
                {
                    id: 50,
                    text: "A mandatory \"silly hat\" day will be celebrated every month, where citizens must wear a unique and ridiculous hat to work or school."
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
                {
                    id:10,
                    text:"lack of access to education",
                },
                {
                    id:11,
                    text:"poor infrastructure",
                },
                {
                    id:12,
                    text:"malnutrition",
                },
                {
                    id:13,
                    text:"poor health",
                },
                {
                    id:14,
                    text:"lack of basic necessities such as clean water and sanitation",
                },
                {
                    id:15,
                    text:"high rates of disease and death.",
                },
                {
                    id:16,
                    text:"lack of funding, resources, and trained medical professionals.",
                },
                {
                    id:17,
                    text:"deforestation",
                },
                {
                    id:18,
                    text:"soil erosion",
                },
                {
                    id:19,
                    text:"desertification",
                },
                {
                    id:20,
                    text:"decreased agricultural productivity",
                },
                {
                    id:21,
                    text:"Limited access to clean water",
                },
                {
                    id:22,
                    text:"drought",
                },
                {
                    id:23,
                    text:"crop failures",
                },
                {
                    id:24,
                    text:"lack of roads",
                },
                {
                    id:25,
                    text:"lack of bridges",
                },
                {
                    id:26,
                    text:"lack of transportation systems",
                },
                {
                    id:27,
                    text:"Women have limited access to education",
                },
                {
                    id:28,
                    text:"lack access to reliable sources of energy",
                },
                {
                    id:29,
                    text:"Corruption",
                },
                {
                    id:30,
                    text:"lack access to formal financial services",
                },
                {
                    id:31,
                    text:"Lack of affordable housing",
                },
                {
                    id:32,
                    text:"unsanitary living conditions",
                },
                {
                    id:33,
                    text:"limited access to internet",
                },
                {
                    id:34,
                    text:"Child labor",
                },
                {
                    id:35,
                    text:"floods",
                },
                {
                    id:36,
                    text:"hurricanes",
                },
                {
                    id:37,
                    text:"earthquakes ",
                },
                {
                    id:38,
                    text:"racism",
                },
                {
                    id:39,
                    text:"lack of legal representation",
                },
            ],
            players:[
                {
                    playerId: 0,
                    playerName: "player1",
                    played:false,
                    isCurrentPlayer: true,
                    isVoter:false,
                    votes: 0,
                    voted:false,
                    cards: [],
                },
                {
                    playerId: 1,
                    playerName: "player2",
                    played:false,
                    isCurrentPlayer: false,
                    isVoter:false,
                    votes: 0,
                    voted:false,
                    cards: [],
                },
                {
                    playerId: 2,
                    playerName: "player3",
                    played:false,
                    isCurrentPlayer: false,
                    isVoter:false,
                    votes: 0,
                    voted:false,
                    cards: [],
                },
                {
                    playerId: 3,
                    playerName: "player4",
                    played:false,
                    isCurrentPlayer: false,
                    isVoter:true,
                    voted:false,
                    votes: 0,
                    cards: [],
                },
            ],
        }
    },
    methods:{
        onConfirmRanking(){
            const sortedArray = [...this.cardLeftPositions].sort((a, b) => a - b);
            const lowestValues = sortedArray.slice(0, 3);
            const _players = lowestValues.map(value => this.table[this.cardLeftPositions.indexOf(value)].player);
            _players[0].votes += 25
            _players[1].votes += 18
            _players[2].votes += 15
            this.nextTurn()
        },
        nextTurn(){
            this.currentProblemCard = this.problemsDeck[this.runningNumberForProblems++]
            this.table = []
            let temp = this.getCurrentPlayer()
            this.isVoterTurn=false
            temp.voted=true
            temp.isVoter = false
            for(let i = 0; i < this.playerCount; i++){
                this.players[i].played=false;
            }
            for(let j = 0; j < this.playerCount; j++){
                if(!this.players[j].voted){
                    this.players[j].isVoter = true
                    for (let i = 0; i < this.playerCount; i++) {
                        if(!this.players[i].played && !this.players[i].isVoter){
                            this.players[i].isCurrentPlayer = true;
                            return
                        }
                    }
                }
            }
            this.nextDay()
        },
        nextDay(){
            this.daysLeft--
            if(this.daysLeft>0){
                for(let i = 0; i < this.playerCount; i++){
                    this.players[i].voted = false
                    this.players[i].played = false
                    this.players[i].isCurrentPlayer = false
                    this.players[i].isVoter = false
                    this.players[i].cards = []
                }
                this.players[0].isCurrentPlayer = true
                this.players[3].isVoter = true
                this.dealCards()
            }
            else {
                let temp = this.players[0]
                for(let i = 0; i < this.playerCount; i++){
                    if(temp.votes<this.players[i].votes){
                        temp = this.players[i]
                    }
                }
                this.winner = temp
            }
        },
        onCardMouseDown(index, event) {
            event.preventDefault();
            this.isDragging = true;
            this.startIndex = index;
            this.startLeft = event.clientX - event.currentTarget.offsetLeft;
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        },
        onMouseMove(event) {
            if (this.isDragging) {
            const newLeftPositions = [...this.cardLeftPositions];
            newLeftPositions[this.startIndex] = event.clientX - this.startLeft;
            this.cardLeftPositions = newLeftPositions;
            }
        },
        onMouseUp() {
            this.isDragging = false;
            this.startIndex = null;
            this.startLeft = null;
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        },
        calculateCardLeftPositions() {
            const cardElements = this.$refs.cardContainer.children;
            const cardLeftPositions = [];
            for (let i = 0; i < cardElements.length; i++) {
            cardLeftPositions.push(cardElements[i].offsetLeft);
            }
            this.cardLeftPositions = cardLeftPositions;
        },
        dealCards(){
            this.currentProblemCard = this.problemsDeck[this.runningNumberForProblems++]
            let shuffleed = this.shuffleArray(this.policyDeck)
            let running = 0
            for (let i = 0;i<this.playerCount;i++) {
                for (let index = 0; index < 10; index++) {
                    this.players[i].cards.push(shuffleed[running++])
                }

            }
            this.isStarted= true;
        },
        getCurrentPlayer(){
            if(this.isVoterTurn){
                for(let i = 0;i<this.playerCount;i++){
                    // console.log(this.players[i])
                    if(this.players[i].isVoter){
                        return this.players[i]
                    }
                }
            }
            else{
                for(let i = 0;i<this.playerCount;i++){
                    // console.log(this.players[i])
                    if(this.players[i].isCurrentPlayer){
                        return this.players[i]
                    }
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
        },
        choseCard(card){
            this.showModal=false;
            this.table.push({card:card,player:this.getCurrentPlayer(),reasoning:this.reasoning})
            this.reasoning=""
            this.getCurrentPlayer().cards = this.getCurrentPlayer().cards.filter(obj => obj !== card)
            this.nextPlayer()
        },
        nextPlayer(){
            let allPlayed = true;
            for (let i = 0; i < this.playerCount; i++) {
                if(this.players[i].isCurrentPlayer){
                    this.players[i].isCurrentPlayer = false;
                    this.players[i].played = true;
                }
                // if(!this.players[i].played && !this.players[i].isVoter){
                //     this.players[i].isCurrentPlayer = true;
                //     allPlayed = false;
                // }
            }
            for (let i = 0; i < this.playerCount; i++) {
                if(!this.players[i].played && !this.players[i].isVoter){
                    this.players[i].isCurrentPlayer = true;
                    allPlayed=false;
                    return
                }
            }
            if(allPlayed){
                this.isVoterTurn = true;
            }
            // console.log(this.players)
        },
        shuffleArray(array) {
            // Copy the original array to avoid modifying the original
            const shuffledArray = [...array];

            for (let i = shuffledArray.length - 1; i > 0; i--) {
                // Generate a random index from 0 to i
                const j = Math.floor(Math.random() * (i + 1));
                // Swap the elements at i and j
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }

            return shuffledArray;
            }
        
    }
}
</script>

<style scoped>
.my-div {
  position: absolute;
  bottom: 0;
}

.cards {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.5rem;
  padding: 1rem;
}
.card-carousel {
  /* set container styles */
  margin: 1rem 0;
}
</style>