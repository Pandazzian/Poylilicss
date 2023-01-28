<template>
    <div>
        <div class="row">
            <div class="col-12 mt-5 mb-5"></div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="ml-2 mr-2 card">
                    <div class="card-body">
                        <h5 class="card-title">Create</h5>
                        <p class="card-text"> Create a room to play with your friends</p>
                        <button type="submit" class="col-12 btn btn-light" @click="createRoom">Create</button>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="ml-2 mr-2 card">
                    <div class="card-body">
                        <h5 class="card-title">join</h5>
                        <p class="card-text"> enter room code and play with your friends</p>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Enter Code</label>
                            <input v-model="roomCode" type="text" class="form-control" id="exampleFormControlInput1" placeholder="put the room code here">
                        </div>
                        <button type="submit" class="col-12 btn btn-light" @click="join">Join</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            roomCode:'',
        }
    },
    methods:{
        join(){
            console.log("join room")
        },
        createRoom(){
            console.log("create Room")
        }
    }
}
</script>