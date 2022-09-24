<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import LoadingSpinner from '@/components/base/LoadingSpinner.vue'

interface IWorkList {
  id: string
  type?: Type
  client: string
  project: string
  description: string
  slug: string
  images: Array<string>
}

enum Type {
  Print = 'print',
  Web = 'web'
}

const baseUrl = 'https://api.victorneves.dev'
const workDetail = ref([] as IWorkList[])

const fetchWorks = async () => {
  const slug = window.location.pathname.split('/').slice(-1)[0]
  const response = await fetch(`${baseUrl}/work/read.php?slug=${slug}`).then(
    (r) => r.json()
  )

  workDetail.value = { ...response[0] }
  const allImages = response[0].images.split(',')
  workDetail.value.images = allImages

  return workDetail.value
}

onMounted(async () => {
  if (workDetail.value.length === 0) {
    workDetail.value = await fetchWorks()
  }
})

const slideIndex = ref(1)
const nrOfImages = ref(0)
const slideShowImages = ref([] as HTMLDivElement[])
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    })
  }, 1500)
})

watch(workDetail, () => {
  isLoading.value = false
  nrOfImages.value = workDetail.value.images.length
})

const showSlides = (n: number) => {
  let i

  if (n > nrOfImages.value) {
    slideIndex.value = 1
  }

  if (n < 1) {
    slideIndex.value = nrOfImages.value
  }

  for (i = 0; i < nrOfImages.value; i++) {
    slideShowImages.value[i].style.display = 'none'
  }

  slideShowImages.value[slideIndex.value - 1].style.display = 'block'
}

const navSlide = (n: number) => {
  showSlides((slideIndex.value += n))
}
</script>

<template>
  <main class="work">
    <template v-if="isLoading">
      <LoadingSpinner />
    </template>
    <template v-else>
      <ul v-if="nrOfImages > 1" class="work__slideshow">
        <li class="work__nav" @click="navSlide(-1)">« prev</li>
        <li class="work__nav" @click="navSlide(1)">next »</li>
      </ul>
      <div class="work__item">
        <div class="work__img-wrapper">
          <template v-for="(image, index) in workDetail.images" :key="index">
            <div
              ref="slideShowImages"
              class="work__img"
              :style="{
                'background-image': `url(https://res.cloudinary.com/vitorneves/image/upload/v1604866915/victorneves-static-images/${image})`
              }"
            ></div>
          </template>
        </div>
        <div class="work__content-wrapper">
          <div class="work__content">
            <h2 class="work__title">
              {{ workDetail.client }}
            </h2>
            <p class="work__info">{{ workDetail.description }}</p>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

$work-padding: 0;
$work-padding-mobile: 6em 0 0;
$work-item-min-height: 100vh;
$work-item-bottom-margin: 0;
$work-last-item-bottom-margin: 60px;
$work-content-padding: 60px 90px;
$work-content-padding-mobile: 20px;
$work-title-font-size: 2.6rem;
$work-title-margin: 0;
$work-info-font-size: 1.1rem;
$work-link-padding: 5px 15px;
$work-content-wrapper-width: 100%;
$work-content-wrapper-width-mobile: 80%;
$work-wrapper-img-height-mobile: 35vh;
$work-wrapper-img-width-mobile: 100%;
$work-img-height: 100vh;
$work-img-width: 100%;
$work-img-wrapper-width: 100%;
$work-slideshow-right-position-mobile: 10%;
$work-slideshow-top-position-mobile: 140px;
$work-slideshow-bottom-position: 20px;
$work-slideshow-left-position: 60px;

$slideshow-font-size: 0.825rem;
$slideshow-padding: 0;
$slideshow-nav-padding: 8px 14px;
$slideshow-nav-border-radius: 15px;
$slideshow-nav-last-child-left-margin: 4px;

.work {
  padding: $work-padding-mobile;
  clear: both;
  position: relative;

  @include from-tablet {
    padding: $work-padding;
  }

  &__item {
    display: flex;
    flex-direction: row;
    margin-bottom: $work-item-bottom-margin;

    @include mobile {
      flex-direction: column;
    }
  }

  &__content-wrapper {
    position: relative;
    z-index: 1;

    @include mobile {
      text-align: center;
      top: -50px;
      transform: translateX(12.5%);
      width: $work-content-wrapper-width-mobile;
    }

    @include from-tablet {
      width: $work-content-wrapper-width;
      display: inline-grid;
      align-content: center;
      text-align: right;
    }
  }

  &__content {
    background: $brand-white;
    padding: $work-content-padding-mobile;
    text-align: left;

    @include from-tablet {
      padding: $work-content-padding;
    }
  }

  &__title {
    font-size: $work-title-font-size;
    font-weight: $font-weight-light;
    margin: $work-title-margin;

    @include mobile {
      line-height: 1;
    }

    & a {
      color: $brand-black;
      text-decoration: none;
    }
  }

  &__info {
    font-size: $work-info-font-size;
  }

  &__link {
    border: 2px solid $brand-black;
    color: $brand-black;
    padding: $work-link-padding;
    text-decoration: none;
  }

  &__wrapper-img {
    @include mobile {
      height: $work-wrapper-img-height-mobile;
      width: $work-wrapper-img-width-mobile;
    }
  }

  &__img {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    height: $work-img-height;
    position: relative;
    width: $work-img-width;

    &:not(:first-child) {
      display: none;
    }

    &-wrapper {
      overflow: hidden;
      width: $work-img-wrapper-width;
    }
  }

  &__slideshow {
    color: $brand-white;
    display: flex;
    font-size: $slideshow-font-size;
    justify-content: space-around;
    list-style-type: none;
    padding: $slideshow-padding;
    position: absolute;
    z-index: 2;

    @include mobile {
      right: $work-slideshow-right-position-mobile;
      top: $work-slideshow-top-position-mobile;
    }

    @include from-tablet {
      bottom: $work-slideshow-bottom-position;
      left: $work-slideshow-left-position;
    }
  }

  &__nav {
    background: rgba($color: $brand-black, $alpha: 0.3);
    padding: $slideshow-nav-padding;

    &:first-child {
      border-top-left-radius: $slideshow-nav-border-radius;
    }

    &:last-child {
      border-bottom-right-radius: $slideshow-nav-border-radius;
      margin-left: $slideshow-nav-last-child-left-margin;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
