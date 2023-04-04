<template>
    <div>
        <div class="card-container" ref="cardContainer">
            <div
                v-for="(card, index) in cards"
                :key="card.id"
                class="card-grab"
                :style="{ left: cardLeftPositions[index] + 'px' }"
                @mousedown="onCardMouseDown(index, $event)"
            >
                {{ card.content }}
            </div>
        </div>
        <button @click="printCardLeftpos">
            print
        </button>          
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
          { id: 1, content: 'Card 1' },
          { id: 2, content: 'Card 2' },
          { id: 3, content: 'Card 3' },
          { id: 4, content: 'Card 4' },
          { id: 5, content: 'Card 5' },
        ],
        isDragging: false,
        startIndex: null,
        startLeft: null,
        cardLeftPositions: [],
      };
    },
    mounted() {
    //   this.calculateCardLeftPositions();
    },
    methods: {
        // printCardLeftpos(){
        //     console.log(this.cardLeftPositions)
        // },
        // getCurrentOrder(){
            
        // },
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
    },
  };
  </script>
  
  <style>
  .card-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .card-grab {
    position: absolute;
    top: 0;
    width: 150px;
    height: 100px;
    background-color: #eee;
    border: 1px solid #999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    user-select: none;
    text-align: center;
  }
  </style>
  
<!-- <template>
    <div>
      <h2>Rearrange the following cards:</h2>
      <div class="card-container" ref="cardContainer">
        <div
          class="card"
          v-for="(card, index) in cards"
          :key="index"
          :style="{ transform: `translateX(${card.translateX}px)` }"
          @mousedown.prevent="startDrag(index, $event)"
          @mouseup="stopDrag"
          @mouseleave="stopDrag"
          style="user-select: none"
        >
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </div>
      </div>
      <button @click="submitOrder">Submit Order</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
          {
            title: 'Card 1',
            description: 'This is the description for card 1',
            translateX: 0
          },
          {
            title: 'Card 2',
            description: 'This is the description for card 2',
            translateX: 0
          },
          {
            title: 'Card 3',
            description: 'This is the description for card 3',
            translateX: 0
          },
        ],
        draggingCardIndex: null,
        mouseOffsetX: null,
        isDragging: false
      }
    },
    methods: {
      startDrag(index, event) {
        console.log("startDrag")
        this.isDragging = true;
        this.draggingCardIndex = index;
        this.mouseX = event.clientX;
        this.initialMouseX = this.mouseX;
        this.initialTranslateX = this.cards[index].translateX;
      },
      stopDrag() {
        this.isDragging = false;
        this.draggingCardIndex = null;
        this.mouseOffsetX = null;
      },
      submitOrder() {
        // handle submitting the card order
      }
    },
    mounted() {
      const cardContainer = this.$refs.cardContainer;
      let prevTranslateX = 0;
      let currentTranslateX = 0;
  
      const handleMouseMove = event => {
        
        if (this.isDragging) {
            console.log("move")
          const card = this.cards[this.draggingCardIndex];
          const containerRect = cardContainer.getBoundingClientRect();
          const mouseX = event.clientX - containerRect.left;
          currentTranslateX = mouseX - this.mouseOffsetX - prevTranslateX;
          card.translateX = currentTranslateX;
          
        }
      };
  
      const handleMouseUp = () => {
        
        if (this.isDragging) {
            console.log("mouse up")
          prevTranslateX += currentTranslateX;
          currentTranslateX = 0;
          isDragging = false;
        }
      };
  
      cardContainer.addEventListener('mousemove', handleMouseMove);
      cardContainer.addEventListener('mouseup', handleMouseUp);
      cardContainer.addEventListener('mouseleave', handleMouseUp);
    },
  }
  </script>
  
  <style scoped>
  .card-container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
  
  .card {
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    padding: 16px;
    margin-right: 16px;
    width: 200px;
    box-sizing: border-box;
    cursor: grab;
  }
  </style>
   -->