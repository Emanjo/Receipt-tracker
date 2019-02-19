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
      addItem() { //Button for adding item field in form
        this.tableRowInputs.push({description: '<input name="item">', 
                          price: '<input type="number">',
                          count: '<input type="number">'});
      },
      removeItem() { //Button for removing item field in form
        if (this.tableRowInputs.length <= 1) {
          this.addItem();
        }
        this.tableRowInputs.splice(-1,3);
      }
    }  
  }
</script>

<style scoped lang="scss">



</style>