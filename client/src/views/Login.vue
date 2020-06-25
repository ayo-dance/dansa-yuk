<template>
  <div>
    <body>
      <div id="icon-arrow">
        <div class="icon-img">
          <i class="fa fa-arrow-right arrow1" aria-hidden="true"></i>
          <i class="fa fa-arrow-up arrow2" aria-hidden="true"></i>
          <i class="fa fa-arrow-left arrow1" aria-hidden="true"></i>
          <i class="fa fa-arrow-down arrow2" aria-hidden="true"></i>
        </div>
      </div>
      <div class="game-container">
        <i class="fa fa-gamepad title" aria-hidden="true">Ayo Dance</i>
        <form>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your name"
            />
          </div>
          <button type="submit" class="btn btn-primary">Enter Room</button>
        </form>
        <form>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Create room"
            />
          </div>
          <button type="submit" class="btn btn-primary">Create Room</button>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Room's list</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Room 1</th>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </body>
  </div>
</template>

<script>
export default {};
</script>

<style>
.title {
  margin-top: 5vh;
  font-size: 40px;
  cursor: default;
  /* color: #36a2eb; */
  color: #ff6384;
}
.arrow1 {
  font-size: 100px;
  cursor: default;
  color: #36a2eb;
  /* color: #ff6384; */
}
.arrow2 {
  font-size: 100px;
  cursor: default;
  /* color: #36a2eb; */
  color: #ff6384;
}
.game-container {
  width: 100vw;
  height: 100vh;
  text-align: center;
  padding: 10px;
}
body {
  font-family: 'Roboto Mono', monospace;
  background-color: #edf492;
  color: #333;
}
#icon-arrow {
  width: 100%;
  height: 100px;
  margin: 0 auto;
}
form {
  margin: 0 auto;
  width: 18rem;
  padding-top: 3%;
}
.icon-img {
  width: 50%;
  text-align: center;
  margin: 0 auto;
}
.table {
  margin-top: 20px;
}
</style>
