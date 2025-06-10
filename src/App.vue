<template>
  <div class="wrapper">
    <div class="current-message">
      <template v-if="activeMessages.length > 0">
        <button @click="handleDeleteMessage" class="current-message__delete">
          <img src="/times-green.svg" alt="" />
        </button>
        <span class="current-message__text">
          {{ activeMessages[currentMessageIndex].text }}
        </span>
      </template>
      <template v-else>
        <span class="current-message__text"> Нет активных сообщений </span>
      </template>
    </div>
    <div class="messages">
      <div v-for="message in messages" :key="message.id" class="messages__item">
        <img
          class="messages__item-times"
          :class="{ active: message.deleted }"
          @click="message.deleted = true"
          src="/times-black.svg"
          alt=""
        />
        <span class="messages__item-text">{{ message.text }}</span>
      </div>
    </div>
    <form class="form" @submit.prevent="handleAddMessage">
      <label class="form__input-group">
        <input
          class="form__input"
          type="text"
          placeholder=""
          v-model="newMessageText"
        />
        <span class="form__input-label">Введите сообщение</span>
      </label>
      <button class="form__button" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const messages = ref([
  {
    id: 1,
    text: "Сообщение 1",
    deleted: false,
  },
  {
    id: 2,
    text: "Сообщение 2",
    deleted: false,
  },
  {
    id: 3,
    text: "Сообщение 3",
    deleted: false,
  },
  {
    id: 4,
    text: "Сообщение 4",
    deleted: false,
  },
  {
    id: 5,
    text: "Сообщение 5",
    deleted: false,
  },
]);

const currentMessageIndex = ref(
  messages.value.findIndex((message) => !message.deleted),
);
let intervalId = null;
const newMessageText = ref("");

const activeMessages = computed(() => {
  return messages.value.filter((message) => !message.deleted);
});

function nextMessage() {
  currentMessageIndex.value =
    (currentMessageIndex.value + 1) % activeMessages.value.length;
}

function handleAddMessage() {
  const text = newMessageText.value.trim();
  if (text === "") return;

  messages.value.push({
    id: messages.value.length + 1,
    text,
    deleted: false,
  });

  newMessageText.value = "";

  if (activeMessages.value.length === 0) {
    currentMessageIndex.value = 0;
    startMessageRotation();
  }
}

function handleDeleteMessage() {
  const currentMessageId = activeMessages.value[currentMessageIndex.value].id;
  const messageIndex = messages.value.findIndex(
    (message) => message.id === currentMessageId,
  );
  messages.value[messageIndex].deleted = true;
}

function startMessageRotation() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (activeMessages.value.length > 0) {
      nextMessage();
    }
  }, 2000);
}

watch(activeMessages, (newMessages) => {
  if (newMessages.length === 0) {
    clearInterval(intervalId);
  } else if (currentMessageIndex.value >= newMessages.length) {
    currentMessageIndex.value = 0;
  }
});

onMounted(() => {
  startMessageRotation();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2b312c;
  padding-top: 20px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
}

.wrapper {
  box-shadow: 0 5px 42px 0 rgba(33, 35, 37, 0.12);
  background: #fff;
  padding: 32px;
  border-radius: 8px;
  width: 666px;
  min-height: 541px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    margin: 0 auto;
    padding: 16px;
    gap: 18px;
  }
}

.current-message {
  padding: 24px 16px;
  border-radius: 6px;
  background: #e4f0ed;
  font-size: 14px;
  display: flex;
  gap: 12px;
  align-items: center;

  &__delete {
    background: transparent;
    border: none;
    cursor: pointer;

    img {
      display: block;
    }
  }
}

.messages {
  background: #f6f8fa;
  padding: 16px;
  flex-grow: 1;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__item {
    display: flex;
    padding-top: 4px;
    padding-bottom: 4px;
    gap: 8px;

    &-text {
      line-height: 150%;
      font-size: 14px;
    }

    &-times {
      display: block;
      opacity: 0;

      &.active {
        opacity: 1;
      }
    }
  }
}

.form {
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 567px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  &__button {
    height: 50px;
    min-width: 180px;
    padding: 15px 12px;
    background: linear-gradient(90deg, #04694b 0%, #11a87b 100%);
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: white;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
  }

  &__input {
    height: 50px;
    width: 100%;
    border: 1px solid #dee2e8;
    border-radius: 8px;
    padding: 0 12px;
    outline: none;
    font-size: 14px;
    color: #2b312c;

    &-group {
      position: relative;
      flex-grow: 1;
    }

    &-label {
      position: absolute;
      font-size: 14px;
      font-weight: 500;
      color: #8b939c;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      transition-duration: 0.2s;
      padding: 2px;
      background: white;
    }

    &:focus {
      border: 1px solid #b5babf;
    }

    &:focus,
    &:not(:placeholder-shown) {
      & + .form__input-label {
        top: 0;
        font-size: 12px;
        transform: translateY(-50%);
      }
    }
  }
}

#app {
  width: 100%;
}
</style>
