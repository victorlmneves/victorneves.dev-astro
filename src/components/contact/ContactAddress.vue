<template>
  <div class="contact-address">
    <h3 class="contact-address__title">My Contacts</h3>
    <ul class="contact-address__list">
      <li class="contact-address__item">
        <span class="contact-address__icon">
          <i class="icon-phone4"></i>
        </span>
        + 351 96 480 54 53
      </li>
      <li class="contact-address__item">
        <span class="contact-address__icon">
          <i class="icon-envelope2"></i>
        </span>
        <a mailto="info@victorneves.dev">info@victorneves.dev</a>
      </li>
      <li class="contact-address__item">
        <span class="contact-address__icon">
          <i class="icon-globe3"></i>
        </span>
        <a href="https://www.victorneves.dev">www.victorneves.dev</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

$contact-address-width: 33.33333%;
$contact-address-width-mobile: 100%;
$contact-address-padding: 0 15px;
$title-margin: 0 0 30px 0;
$title-font-size: 2rem;
$title-line-height: 1.3;

$list-bottom-margin: 4em;

$item-margin: 0 0 30px 0;
$item-margin-mobile: 0;
$item-left-padding: 60px;

.contact-address {
  width: $contact-address-width;

  @include mobile {
    padding: $contact-address-padding;
    width: $contact-address-width-mobile;
  }

  &__title {
    font-family: $font-secondary;
    font-size: $title-font-size;
    color: rgba(0, 0, 0, 0.8);
    margin: $title-margin;
    line-height: $title-line-height;
    font-weight: $font-weight-normal;
  }

  &__list {
    @include unstyled-list;
    margin-bottom: $list-bottom-margin;
  }

  &__item {
    @include unstyled-list;
    margin: $item-margin;
    position: relative;
    padding-left: $item-left-padding;

    @include mobile {
      margin: $item-margin-mobile;
    }
  }
}
</style>
