<script setup>
import { useItemsStore } from "./stores/items";
import Item from "./components/Item.vue";

const itemsStore = useItemsStore();
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <div class="column">
        <div class="top-box">
          <div class="top-box-items">
            <Item
              v-for="item in itemsStore.userSelectedItems"
              :key="item.id"
              :id="item.id"
              :name="item.name"
              @item-click="itemsStore.removeSelectedUserItem"
            ></Item>
          </div>
          <div class="top-box-amount">
            selected: {{ itemsStore.userSelectedItems.length }} / 6
          </div>
        </div>
        <div class="bottom-box">
          <Item
            v-for="item in itemsStore.userItems"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            @item-click="itemsStore.selectUserItem"
          ></Item>
        </div>
      </div>
      <div class="column column-right">
        <div class="top-box">
          <Item
            v-for="item in itemsStore.customerSeletedItems"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            @item-click="itemsStore.removeSelectedCustomerItem"
          ></Item>
        </div>
        <div class="bottom-box">
          <Item
            v-for="item in itemsStore.customerItems"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            @item-click="itemsStore.selectCustomerItem"
          ></Item>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
}
.content {
  display: flex;
  gap: 50px;
  padding: 50px;
  height: 100%;
}
.column {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.column-right {
  align-items: flex-end;
}
.column-right .top-box .item {
  width: 100%;
  height: 100%;
}
.top-box {
  border: 2px solid black;
  width: 50%;
  height: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.top-box-items {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.bottom-box {
  border: 2px solid black;
  width: 100%;
  height: 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
}
.top-box-amount {
  margin-top: 10px;
  text-align: center;
}
</style>
