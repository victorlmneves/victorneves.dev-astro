<template>
  <div class="about">
    <div class="about__item">
      <div class="about__content-wrapper">
        <div class="about__content">
          <h2 class="about__title">Hi! I'm Victor Neves</h2>
          <p class="about__info">
            Self-taught professional, competent, motivated and dedicated,
            experienced in Desktop Publishing and Web Development.
          </p>
        </div>
      </div>
      <div class="about__wrapper-img">
        <div
          class="about__image"
          :style="{
            'background-image': `url(https://res.cloudinary.com/vitorneves/image/upload/v1617370600/victorneves-static-images/me.jpg)`
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

$about-padding: 10em 0 0;
$about-padding-mobile: 6em 0 0;

$about-item-min-height: 100vh;
$about-item-bottom-margin: 120px;
$about-item-last-child-bottom-margin: 60px;

$about-content-padding: 60px 30px;
$about-content-padding-mobile: 20px;

.about {
  padding: $about-padding;
  clear: both;
  position: relative;

  @include mobile {
    padding: $about-padding-mobile;
  }

  &__item {
    display: flex;
    margin-bottom: $about-item-bottom-margin;

    @include mobile {
      flex-direction: column-reverse;
      margin-bottom: 0;
    }

    @include from-tablet {
      min-height: $about-item-min-height;
    }

    &:last-child {
      margin-bottom: $about-item-last-child-bottom-margin;
    }
  }

  &__content-wrapper {
    position: relative;
    z-index: 1;

    @include mobile {
      text-align: center;
      top: -50px;
      transform: translateX(12.5%);
      width: 80%;
    }

    @include from-tablet {
      width: 50%;
      display: inline-grid;
      align-content: center;
      text-align: right;
      right: -50px;
    }
  }

  &__content {
    background: $brand-white;
    padding: $about-content-padding-mobile;

    @include from-tablet {
      padding: $about-content-padding;
    }
  }

  &__title {
    font-size: 2.6rem;
    font-weight: 300;
    margin: 0;
  }

  &__info {
    font-size: 1.3rem;
  }

  &__wrapper-img {
    width: 50%;

    @include mobile {
      height: 35vh;
      width: 100%;
    }
  }

  &__image {
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
  }
}
</style>
