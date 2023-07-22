import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useItemsStore = defineStore("items", () => {
  const userItems = ref([
    {
      id: 1,
      name: "Shoes 1",
    },
    {
      id: 2,
      name: "Shoes 2",
    },
    {
      id: 3,
      name: "Shoes 3",
    },
    {
      id: 4,
      name: "Shoes 4",
    },
    {
      id: 5,
      name: "T-shirt 1",
    },
    {
      id: 6,
      name: "T-shirt 2",
    },
    {
      id: 7,
      name: "T-shirt 3",
    },
    {
      id: 8,
      name: "T-shirt 4",
    },
  ]);

  const customerItems = ref([
    {
      id: 1,
      name: "Shoes 1",
    },
    {
      id: 2,
      name: "Shoes 2",
    },
    {
      id: 3,
      name: "Shoes 3",
    },
    {
      id: 4,
      name: "Shoes 4",
    },
    {
      id: 5,
      name: "T-shirt 1",
    },
    {
      id: 6,
      name: "T-shirt 2",
    },
    {
      id: 7,
      name: "T-shirt 3",
    },
    {
      id: 8,
      name: "T-shirt 4",
    },
  ]);

  const moveItem = (from, to, itemId) => {
    const itemIndex = from.findIndex((item) => item.id === itemId);
    to.push(from[itemIndex]);
    from.splice(itemIndex, 1);
  };

  const userSelectedItems = ref([]);
  const customerSeletedItems = ref([]);

  const selectUserItem = (itemId) => {
    if (userSelectedItems.value.length < 6) {
      moveItem(userItems.value, userSelectedItems.value, itemId);
    }
  };

  const selectCustomerItem = (itemId) => {
    if (customerSeletedItems.value.length < 1) {
      moveItem(customerItems.value, customerSeletedItems.value, itemId);
    }
  };

  const removeSelectedUserItem = (itemId) => {
    moveItem(userSelectedItems.value, userItems.value, itemId);
  };

  const removeSelectedCustomerItem = (itemId) => {
    moveItem(customerSeletedItems.value, customerItems.value, itemId);
  };

  return {
    userItems,
    userSelectedItems,
    customerItems,
    customerSeletedItems,
    selectUserItem,
    removeSelectedUserItem,
    selectCustomerItem,
    removeSelectedCustomerItem,
  };
});
