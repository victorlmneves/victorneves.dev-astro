<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@nanostores/vue'
import { isMenuOpen } from '@/stores/MenuStore'

const $isMenuOpen = useStore(isMenuOpen)
const body = ref<HTMLElement | null>(null)
const header = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  body.value = document.body
  body?.value.classList.toggle('menu-is-open')
  header?.value.classList.toggle('is-open')
}
// })
</script>

<template>
  <header ref="header" class="header">
    <div
      :class="{
        'menu-is-open': $isMenuOpen
      }"
    ></div>
    <div class="header__content">
      <div class="header__logo">
        <a class="header__logo-link" href="/">Victor Neves</a>
      </div>
      <span
        @click=";[toggleMenu(), isMenuOpen.set(!$isMenuOpen)]"
        class="header__toggle-menu">
        <i class="icon-menu"></i>
      </span>
    </div>
  </header>
</template>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

$header-padding: 2em 1em 2em 0.4em;
$header-z-index: 9;
$header-margin: 0 auto;
$header-width-tablet: 740px;
$header-width-laptop: 960px;
$header-width-desktop: 1140px;
$header-logo-font-size: 24px;
$header-letter-spacing: 10px;
$header-logo-font-size-mobile: 20px;
$header-letter-spacing-mobile: 8px;
$header-logo-link-padding: 6px 4px 6px 10px;
$header-toggle-menu-top-position: -10px;
$header-toggle-menu-right-position-mobile: 5px;

.header {
  background: rgba(255, 255, 255, 0.9);
  padding: $header-padding;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $header-z-index;
  margin: $header-margin;

  @include tablet {
    width: $header-width-tablet;
  }

  @include laptop {
    width: $header-width-laptop;
  }

  @include desktop {
    width: $header-width-desktop;
  }

  &.is-open {
    background: transparent;
  }

  &__content {
    @include display-flex-between;

    align-items: center;
  }

  &__logo {
    font-size: $header-logo-font-size;
    text-transform: uppercase;
    color: $brand-black;
    font-weight: 700;
    letter-spacing: $header-letter-spacing;
    display: block;
    text-align: center;

    @include mobile {
      font-size: $header-logo-font-size-mobile;
      letter-spacing: $header-letter-spacing-mobile;
    }

    &-link {
      color: inherit;
      background: rgba(255, 255, 255, 0.1);
      padding: $header-logo-link-padding;
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }

      &:active,
      &:focus {
        outline: none;
        text-decoration: none;
      }
    }
  }

  &__toggle-menu {
    cursor: pointer;
    position: relative;

    & .icon-menu:before {
      position: absolute;
      right: 0;
      top: $header-toggle-menu-top-position;

      @include mobile {
        right: $header-toggle-menu-right-position-mobile;
      }
    }

    &:hover {
      .icon-menu:before {
        transition: 0.3s;
        transform: scale(1.4);
      }
    }
  }
}

.menu-is-open {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}
</style>
