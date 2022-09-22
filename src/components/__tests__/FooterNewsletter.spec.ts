import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { mount } from "@vue/test-utils";
import FooterNewsletter from "@/components/footer/FooterNewsletter.vue";

let wrapper: HTMLDivElement

beforeEach(() => {
  wrapper = mount(FooterNewsletter)
})

/* afterEach(() => {
  wrapper.destroy()
}) */

describe("FooterNewsletter.vue", () => {
  it("renders signup newsletter title", () => {
    const title = wrapper.find(".footer-newsletter__title")
    expect(title.text()).toBe("Subscribe Newsletter")
  })
})
