<script setup lang="ts">
import { onMounted, onServerPrefetch, watch, ref } from 'vue'

interface IWorkList {
  id: string
  type?: Type
  client: string
  project: string
  description: string
  slug: string
  images: Array<string> | string
}

enum Type {
  Print = 'print',
  Web = 'web'
}

const baseUrl = 'https://api.victorneves.dev'
const workList = ref([] as IWorkList[])

const fetchWorks = async () => {
  const response = await fetch(`${baseUrl}/works/read.php`)
  const data = await response.json()

  return data
}

onServerPrefetch(async () => {
  if (workList.value.length === 0) {
    workList.value = await fetchWorks()
  }
})

onMounted(async () => {
  if (workList.value.length === 0) {
    workList.value = await fetchWorks()
  }
})

watch(workList, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    workList.value = newValue
  }
})

onMounted(() => {
  setTimeout(() => {
    const lazyLoadImages = document.querySelectorAll('.js-lazy')

    if ('IntersectionObserver' in window) {
      setTimeout(() => {
        const imageObserver = new IntersectionObserver((entries, _observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const image = entry.target
              image.classList.remove('js-lazy')
              image.src = image.getAttribute('data-src')
              image.setAttribute('style', `background-image: url(${image.src})`)
              imageObserver.unobserve(image)
            }
          })
        })

        if (!lazyLoadImages) {
          return
        }

        lazyLoadImages.forEach((image) => {
          imageObserver.observe(image)
        })
      }, 500)
    } else {
      let lazyloadThrottleTimeout

      const lazyload = () => {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout)
        }

        lazyloadThrottleTimeout = setTimeout(() => {
          let scrollTop = window.pageYOffset

          lazyLoadImages.forEach((image) => {
            if (image.offsetTop < window.innerHeight + scrollTop) {
              image.src = image.getAttribute('data-src')
              image.setAttribute('style', `background-image: url(${image.src})`)
              image.classList.remove('js-lazy')
            }
          })

          if (lazyLoadImages.length == 0) {
            document.removeEventListener('scroll', lazyload)
            window.removeEventListener('resize', lazyload)
            window.removeEventListener('orientationChange', lazyload)
          }
        }, 20)
      }

      document.addEventListener('scroll', lazyload)
      window.addEventListener('resize', lazyload)
      window.addEventListener('orientationChange', lazyload)
    }
  }, 1500)
})
</script>

<template>
  <div class="work-list">
    <div
      v-for="(item, index) in workList"
      :key="item.id"
      class="work-list__item"
    >
      <div class="work-list__content-wrapper">
        <div class="work-list__content">
          <h2 class="work-list__title">
            <a :href="`work/${item.slug}`">{{ item.client }}</a>
          </h2>
          <p class="work-list__info">{{ item.project }}</p>
          <a class="work-list__link" :href="`work/${item.slug}`">
            View Project
          </a>
        </div>
      </div>
      <div class="work-list__wrapper-img">
        <div
          v-if="index === 0"
          class="work-list__image"
          :style="{
            'background-image': `url(https://res.cloudinary.com/vitorneves/image/upload/v1604866915/victorneves-static-images/${item.image})`
          }"
        ></div>
        <div
          v-if="index > 0"
          ref="jsLazy"
          class="js-lazy work-list__image"
          :data-src="`https://res.cloudinary.com/vitorneves/image/upload/v1604866915/victorneves-static-images/${item.image}`"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

$work-list-padding: 6.4em 0 0;
$work-list-item-min-height: 100vh;
$work-list-item-bottom-margin: 120px;
$work-list-last-item-bottom-margin: 60px;
$work-list-content-padding: 60px 30px;
$work-list-content-padding-mobile: 30px 30px 60px;
$work-list-title-font-size: 2.6rem;
$work-list-title-margin: 0;
$work-list-info-font-size: 1.3rem;
$work-list-link-padding: 5px 15px;

.work-list {
  padding: $work-list-padding;
  clear: both;
  position: relative;

  @include mobile {
    padding: 6em 0 0;
  }

  &__item {
    display: flex;
    margin-bottom: $work-list-item-bottom-margin;

    @include mobile {
      flex-direction: column-reverse;
      margin-bottom: 0;
    }

    @include from-tablet {
      min-height: $work-list-item-min-height;

      &:nth-child(2n) {
        flex-direction: row-reverse;

        .work-list__content-wrapper {
          text-align: left;
          left: -50px;
        }
      }

      &:last-child {
        margin-bottom: $work-list-last-item-bottom-margin;
      }
    }

    &:last-child {
      margin-bottom: $work-list-last-item-bottom-margin;
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
    padding: $work-list-content-padding-mobile;

    @include from-tablet {
      padding: $work-list-content-padding;
    }
  }

  &__title {
    font-size: $work-list-title-font-size;
    font-family: $font-secondary;
    font-weight: $font-weight-normal;
    margin: $work-list-title-margin;

    & a {
      color: $brand-black;
      text-decoration: none;
    }
  }

  &__info {
    font-size: $work-list-info-font-size;
  }

  &__link {
    border: 1px solid $brand-black;
    color: $brand-black;
    padding: $work-list-link-padding;
    text-decoration: none;

    &:hover {
      background: $brand-black;
      color: $brand-white;
      text-decoration: none;
    }
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
