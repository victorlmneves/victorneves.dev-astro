<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

interface IContact {
  name: string
  email: string
  message: string
}

const contact = ref<IContact>({
  name: '',
  email: '',
  message: ''
})

const isSending = ref(false)

const clearForm = () => {
  for (let field in contact.value) {
    contact.value[field] = ''
  }
}

const onSubmit = () => {
  isSending.value = true

  setTimeout(() => {
    let form = new FormData()
    for (let field in contact.value) {
      form.append(field, contact.value[field])
    }

    axios
      .post('https://api.victorneves.dev/form/contact-process.php', form)
      .then(() => {
        clearForm()
        isSending.value = false
      })
      .catch((e) => {
        console.log(e)
        isSending.value = false
        throw new Error(`Submit Form Error: ${e}`)
      })
  }, 1000)
}
</script>

<template>
  <div class="contact-form">
    <form @submit.prevent="onSubmit">
      <div class="contact-form__group contact-form__group--flex">
        <input
          required
          name="name"
          v-model="contact.name"
          type="text"
          class="contact-form__input"
          placeholder="Name"
        />
        <input
          required
          name="email"
          v-model="contact.email"
          type="email"
          class="contact-form__input"
          placeholder="Email"
        />
      </div>
      <div class="contact-form__group">
        <textarea
          required
          name="message"
          v-model="contact.message"
          class="contact-form__input contact-form__input--textarea"
          cols="30"
          rows="7"
          placeholder="Message"
        ></textarea>
      </div>
      <div class="contact-form__group">
        <input
          v-if="isSending"
          type="submit"
          value="Sending..."
          class="contact-form__button contact-form__button--disabled"
          disabled
        />
        <input
          v-else
          type="submit"
          value="Send Message"
          class="contact-form__button"
        />
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

$form-width: 58.33333%;
$form-width-mobile: 100%;
$form-padding-mobile: 0 15px;
$form-title-font-size: 2rem;
$form-text-font-size: 1.1rem;
$form-group-margin: 0 auto 20px;
$form-input-height: 50px;
$form-input-font-size: 14px;
$form-input-padding: 10px;
$form-textarea-height: 150px;
$form-button-height: 50px;
$form-button-padding: 10px 20px;

.contact-form {
  width: $form-width;

  @include mobile {
    padding: $form-padding-mobile;
    width: $form-width-mobile;
  }

  &__title {
    font-size: $form-title-font-size;
  }

  &__text {
    font-size: $form-text-font-size;
  }

  &__group {
    margin: $form-group-margin;

    &--flex {
      display: flex;
      justify-content: space-between;

      & .contact-form__input {
        width: 48%;
      }
    }
  }

  &__input {
    height: $form-input-height;
    display: inline-block;
    vertical-align: middle;
    font-size: $form-input-font-size;
    width: 100%;
    color: $brand-gray;
    padding: $form-input-padding;
    border-style: solid;
    border: 1px solid rgb(218, 218, 218);

    &:focus {
      outline: 0;
    }

    &--textarea {
      border-color: rgb(218, 218, 218);
      height: $form-textarea-height;
    }
  }

  &__button {
    background: $brand-black;
    color: $brand-white;
    border: none;
    padding: $form-button-padding;
    text-transform: uppercase;
    height: $form-button-height;
    width: 100%;
  }
}
</style>
