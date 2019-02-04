<template>
  <div>
    <div class="container">
      <h1>New receipt</h1>

      <form action="post" class="form">

        <div class="form__group form__group--items">
          <table>
            <tr>
              <th><label for="retailer">Retailer:</label></th>
            </tr>
            <tr>
              <td><input class="margin-bottom" name="item" id="retailer"></td>
            </tr>
            <tr>
              <th><label for="description">Description:</label></th>
              <th><label for="price">Price per item:</label></th>
              <th><label for="count">Count:</label></th>
            </tr>
            <tr v-for="input in tableRowInputs">
              <td v-html="input.description"></td>
              <td v-html="input.price"></td>
              <td v-html="input.count"></td>
            </tr>
          </table>
        </div>
        
        <div class="form__group">
          <button type="button" v-on:click="removeItem" class="form__button form__button--modifier form__button--minus">-</button>
          <button type="button" v-on:click="addItem" class="form__button form__button--modifier form__button--plus">+</button>
        </div>

        <input class="form__button form__button--submit" type="submit" value="Add"/>
      </form>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableRowInputs: [{description: '<input name="item">', 
                          price: '<input type="number">',
                          count: '<input type="number">'}]
      }
    },
    methods: {
      addItem() {
        this.tableRowInputs.push({description: '<input name="item">', 
                          price: '<input type="number">',
                          count: '<input type="number">'});
      },
      removeItem() {
        if (this.tableRowInputs.length <= 1) {
          this.addItem();
        }
        this.tableRowInputs.splice(-1,3);
      }
    },
    mounted() {
      console.log(this.tableRowInputs.length);
      
    }
    
  }
</script>

<style scoped lang="scss">

.form {
  display: flex;
  width: 70%;
  flex-wrap: wrap;
  margin: auto;
  justify-content: space-around;
  margin-top: 40px;

  &__group {
    margin: 10px 0px;
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &--items {
      width: 100%;
      label {
        display: block;
      }
      td {
        padding: 10px;
        text-align: center;
      }
    }

  }

  &__button {
    border-radius: 5px;
    margin-top: 15px;
    background: white;
    border: 1px solid black;
    padding: 5px;

    &--submit {
      background: #0190019e;
      border: 1px solid #019001;
      color: white;
      flex-basis: 70%;
    }

    &--modifier {
      width: 40px;
      margin: 0 10px;
      color: white;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      &:active {
        transform:scale(0.9);
      }
    }

    &--minus {
      background: #a20000b8;
      border: 1px solid #da0000;
    }

    &--plus {
      background: #0190019e;
      border: 1px solid #019001;
    }
  }

  .margin-bottom {
    margin-bottom: 50px;
  }

}

</style>