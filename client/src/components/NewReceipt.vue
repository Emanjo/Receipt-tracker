<template>
  <div>
    <div class="container">
      <h1>New receipt</h1>

      <form action="post" class="form">

        <div class="form__group">
          <label for="item">Item:</label>
          <input type="text" name="item" id="item">
        </div>

        <div class="form__group">
          <label for="price">Price:</label>
          <input type="text" name="price" id="price">
        </div>

        <input class="form__button form__button--submit" type="submit" value="Add"/>
      </form>

    </div>

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="scss">

.form {
  display: flex;
  width: 70%;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
  margin-top: 40px;

  input[type=text] {
    border-radius: 5px;
    border: 1px solid black;
    padding: 3px;
  }

  &__group {
    margin: 0 10px;
    label {
      margin-right: 5px;
    }
  }

  &__button {
    border-radius: 5px;
    margin-top: 15px;
    background: white;
    border: 1px solid black;
    padding: 5px;

    &--submit {
      background: green;
      color: white;
      width: 150px;
      flex-basis: 100%;
    }
  }

}

</style>