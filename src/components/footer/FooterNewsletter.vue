<template>
  <div class="footer-newsletter">
    <h3 class="footer-newsletter__title">Subscribe Newsletter</h3>
    <p class="footer-newsletter__text">
      Subscribe our newsletter and get latest updates
    </p>
    <div class="footer-newsletter__group">
      <form
        action="https://dev.us1.list-manage.com/subscribe/post?u=0bfab83c7d1ac1ce846909de6&amp;id=87b6b5acbf"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        class="validate"
        target="_blank"
        novalidate
      >
        <label class="is-hidden">Email</label>
        <input
          type="email"
          value=""
          name="EMAIL"
          id="mce-EMAIL"
          class="footer-newsletter__input"
          placeholder="Your email"
        />
        <input
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
          class="footer-newsletter__button"
        />
      </form>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

$footer-newsletter-margin: 180px auto 80px;
$footer-newsletter-title-font-size: 2rem;
$footer-newsletter-text-font-size: 1.2rem;
$footer-newsletter-group-margin: 0 auto;
$footer-newsletter-group-width: 300px;
$footer-newsletter-input-height: 50px;
$footer-newsletter-input-font-size: 14px;
$footer-newsletter-button-padding: 10px 20px;
$footer-newsletter-button-height: 50px;

.footer-newsletter {
  margin: $footer-newsletter-margin;
  text-align: center;

  @include mobile {
   margin-top: 0;
  }

  &__title {
    font-family: $font-secondary;
    font-size: $footer-newsletter-title-font-size;
  }

  &__text {
    font-family: $font-secondary;
    font-size: $footer-newsletter-text-font-size;
  }

  &__group {
    margin: $footer-newsletter-group-margin;
    width: $footer-newsletter-group-width;
  }

  &__input {
    border: none;
    color: $brand-gray;
    display: inline-block;
    height: $footer-newsletter-input-height;
    font-size: $footer-newsletter-input-font-size;
    padding: 10px;
    text-align: center;
    vertical-align: middle;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }

  &__button {
    background: $brand-black;
    color: $brand-white;
    border: none;
    padding: $footer-newsletter-button-padding;
    text-transform: uppercase;
    height: $footer-newsletter-button-height;
    width: 100%;
  }
}
</style>
