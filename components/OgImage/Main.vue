<script setup lang="ts">
/**
 * @credits NuxtLabs <https://nuxtlabs.com/>
 * @see https://github.com/nuxt/nuxt.com/blob/main/components/OgImage/OgImageDocs.vue
 */
import { computed } from "vue";

const props = withDefaults(
  defineProps<{ title?: string; description?: string; headline?: string }>(),
  {
    title: "title",
    description: "description",
    headline: "headline",
  }
);

const title = computed(() => props.title.slice(0, 60));
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center bg-[#212121]">
    <svg
      class="absolute right-0 top-0"
      width="629"
      height="593"
      viewBox="0 0 629 593"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_199_94966)">
        <path
          d="M628.5 -578L639.334 -94.4223L806.598 -548.281L659.827 -87.387L965.396 -462.344L676.925 -74.0787L1087.69 -329.501L688.776 -55.9396L1160.22 -164.149L694.095 -34.9354L1175.13 15.7948L692.306 -13.3422L1130.8 190.83L683.602 6.50012L1032.04 341.989L668.927 22.4412L889.557 452.891L649.872 32.7537L718.78 511.519L628.5 36.32L538.22 511.519L607.128 32.7537L367.443 452.891L588.073 22.4412L224.955 341.989L573.398 6.50012L126.198 190.83L564.694 -13.3422L81.8734 15.7948L562.905 -34.9354L96.7839 -164.149L568.224 -55.9396L169.314 -329.501L580.075 -74.0787L291.604 -462.344L597.173 -87.387L450.402 -548.281L617.666 -94.4223L628.5 -578Z"
          fill="#ff7a03"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_199_94966"
          x="0.873535"
          y="-659"
          width="1255.25"
          height="1251.52"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="40.5"
            result="effect1_foregroundBlur_199_94966"
          />
        </filter>
      </defs>
    </svg>

    <div class="w-[600px] pl-[100px]">
      <p
        v-if="headline"
        class="uppercase text-[24px] text-[#ff7a03] mb-4 font-semibold"
      >
        {{ headline }}
      </p>
      <h1
        class="w-[600px] m-0 text-[50px] font-bold mb-4 text-white flex items-center"
      >
        <span>{{ title }}</span>
      </h1>
      <p class="text-[28px] text-[#E4E4E7] leading-tight">
        {{ description.slice(0, 200) }}
      </p>
    </div>
    <svg
      class="absolute top-[160px] right-[90px]"
      width="340"
      height="340"
      viewBox="0 0 340 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M86.6286 103.106C88.2099 94.7477 94.7477 88.2099 103.106 86.6286L104.427 86.3788C146.343 78.4485 189.386 78.5576 231.262 86.7002L232.272 86.8967C239.615 88.3244 245.4 93.99 246.981 101.301L247.277 102.671C256.565 145.63 256.438 190.092 246.903 232.997C245.361 239.939 239.939 245.361 232.997 246.903C190.092 256.438 145.63 256.565 102.671 247.277L101.301 246.981C93.99 245.4 88.3244 239.615 86.8967 232.272L86.7002 231.262C78.5576 189.386 78.4485 146.343 86.3788 104.426L86.6286 103.106Z"
        fill="url(#paint0_linear_199_94959)"
      />
      <path
        d="M86.6286 103.106C88.2099 94.7477 94.7477 88.2099 103.106 86.6286L104.427 86.3788C146.343 78.4485 189.386 78.5576 231.262 86.7002L232.272 86.8967C239.615 88.3244 245.4 93.99 246.981 101.301L247.277 102.671C256.565 145.63 256.438 190.092 246.903 232.997C245.361 239.939 239.939 245.361 232.997 246.903C190.092 256.438 145.63 256.565 102.671 247.277L101.301 246.981C93.99 245.4 88.3244 239.615 86.8967 232.272L86.7002 231.262C78.5576 189.386 78.4485 146.343 86.3788 104.426L86.6286 103.106Z"
        fill="url(#paint1_radial_199_94959)"
        fill-opacity="0.06"
      />
      <path
        d="M103.028 86.2151C94.4994 87.8286 87.8286 94.4994 86.2151 103.028L85.9653 104.348C78.0252 146.318 78.1344 189.414 86.2872 231.342L86.4836 232.353C87.9434 239.86 93.7366 245.776 101.212 247.392L102.582 247.688C145.601 256.989 190.124 256.862 233.089 247.314C240.19 245.736 245.736 240.19 247.314 233.089C256.862 190.124 256.989 145.601 247.688 102.582L247.392 101.212C245.776 93.7366 239.86 87.9434 232.353 86.4836L231.342 86.2872C189.414 78.1344 146.318 78.0252 104.348 85.9653L103.028 86.2151Z"
        stroke="url(#paint2_linear_199_94959)"
        stroke-opacity="0.9"
        stroke-width="0.841584"
      />
      <path
        d="M86.5693 66.0418C76.1888 68.0728 68.0728 76.1888 66.0418 86.5693L65.7807 87.9041C55.4495 140.708 55.5631 195.024 66.1151 247.784L66.3095 248.756C68.1871 258.144 75.4486 265.527 84.8039 267.561L86.1767 267.86C140.001 279.561 195.755 279.425 249.525 267.477C258.483 265.486 265.485 258.489 267.475 249.53C279.429 195.737 279.558 139.989 267.852 86.1413L267.553 84.7671C265.524 75.4341 258.158 68.19 248.793 66.3169L247.784 66.1151C195.024 55.5631 140.708 55.4495 87.904 65.7807L86.5693 66.0418Z"
        stroke="url(#paint3_linear_199_94959)"
        stroke-opacity="0.9"
        stroke-width="1.7"
      />
      <path
        d="M66.1749 44.2983C55.2117 46.6476 46.6475 55.2117 44.2983 66.1749L43.1523 71.5228C29.5422 135.037 29.5422 200.713 43.1523 264.227L44.425 270.166C46.7026 280.795 54.917 289.15 65.5055 291.608C132.857 307.243 203.127 307.189 270.477 291.554C280.924 289.129 289.129 280.924 291.554 270.477C307.189 203.127 307.243 132.857 291.608 65.5055C289.15 54.917 280.795 46.7026 270.166 44.425L264.227 43.1523C200.713 29.5422 135.037 29.5422 71.5228 43.1523L66.1749 44.2983Z"
        stroke="url(#paint4_linear_199_94959)"
        stroke-opacity="0.9"
        stroke-width="1.7"
      />
      <path
        d="M47.0949 24.9846C36.0029 27.3375 27.3375 36.0029 24.9846 47.0949L19.3193 73.8027C5.86738 137.219 5.96967 202.762 19.6195 266.137L25.0028 291.131C27.3518 302.037 35.8106 310.592 46.6894 313.064L67.2583 317.739C134.879 333.107 205.098 332.991 272.667 317.398L291.54 313.043C302.229 310.576 310.576 302.229 313.043 291.54L317.398 272.667C332.991 205.098 333.107 134.879 317.739 67.2583L313.064 46.6894C310.592 35.8106 302.037 27.3518 291.131 25.0028L266.137 19.6195C202.762 5.96966 137.219 5.86738 73.8027 19.3193L47.0949 24.9846Z"
        stroke="url(#paint5_linear_199_94959)"
        stroke-opacity="0.9"
        stroke-width="2.125"
      />
      <!-- logo  -->
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        :width="256"
        :height="256"
        viewBox="-420 -420 1024 1024"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          style="fill: #ff7a03"
          d="M4034 5102c-6-4-37-57-68-119-73-144-136-210-250-264-165-78-319-91-1016-88-499 3-531 2-640-19-363-67-627-229-797-489-56-86-101-181-127-274-11-36-36-81-70-125-181-234-272-481-283-774-7-176 13-317 73-502 62-195 77-292 71-458-3-76-14-179-26-236-55-273-28-529 79-749 142-291 410-451 698-416 51 6 98 9 103 6 5-4 9-57 9-118 0-188 26-239 165-329 160-104 309-138 605-138s445 34 605 138c139 90 165 141 165 329 0 61 4 114 9 118 5 3 52 0 103-6 288-35 556 125 698 416 107 220 134 476 79 749-12 57-23 160-26 236-6 166 9 263 71 458 98 304 101 589 9 867-29 89-78 199-117 261l-25 41 41 54c178 234 201 604 67 1066-32 112-86 259-118 321-24 47-57 64-87 44zM1977 3904c121-25 228-69 378-155 332-190 600-298 858-345 112-21 366-23 482-5 100 16 226 61 293 105 59 39 54 42 106-62 84-168 126-349 126-547 0-152-18-256-74-432-61-194-71-254-71-433 1-125 5-177 25-270 21-97 24-141 24-280-1-198-17-271-95-429-42-85-65-117-128-180-128-129-259-180-421-165-139 12-167 10-196-12-62-46-69-64-74-212-5-149-11-166-64-207-42-32-46-32-46 8 0 45-25 77-60 77-47 0-60-22-60-105v-73l-47-16c-26-9-71-19-100-23l-53-6v89c0 102-14 134-57 134-52 0-63-23-63-132v-98h-200v97c0 108-11 133-61 133-45 0-59-31-59-134v-89l-53 6c-29 4-74 14-100 23l-47 16v73c0 83-13 105-60 105-35 0-60-32-60-77 0-40-4-40-46-8-53 41-59 58-64 207-5 148-12 166-74 212-29 22-50 23-201 11-71-6-104-4-155 10-352 91-559 527-470 986 57 296 48 513-30 745-109 319-113 569-16 852 55 159 183 364 284 453 77 67 238 136 370 159 84 14 278 11 359-6z"
          transform="matrix(.1 0 0 -.1 0 512)"
        />
        <path
          style="fill: #ff7a03"
          d="M1389 1945c-111-40-181-100-231-197-31-61-33-68-36-203-4-161 9-238 59-338 191-380 685-461 984-161 57 57 83 92 114 156 55 116 66 172 65 323 0 111-4 139-23 188-43 110-139 200-247 233-65 19-632 19-685-1zM3043 1945c-106-33-201-123-244-232-20-50-23-76-24-188 0-151 11-207 66-323 102-213 350-356 585-338 250 19 463 182 545 416 31 89 40 333 14 413-36 115-128 208-241 247-52 18-83 20-358 19-220 0-312-4-343-14zM2455 1361c-50-22-119-96-133-142-27-85-64-309-57-345 8-48 58-98 110-113 52-14 318-14 370 0 52 15 102 65 110 113 5 25-1 82-19 174-36 181-42 198-90 250-54 60-104 82-186 82-42 0-79-7-105-19z"
          transform="matrix(.1 0 0 -.1 0 512)"
        />
      </svg>
      <!-- logo  -->
      <defs>
        <filter
          id="filter0_f_199_94959"
          x="124.176"
          y="130.551"
          width="91.6485"
          height="67.3485"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="3.78713"
            result="effect1_foregroundBlur_199_94959"
          />
        </filter>
        <linearGradient
          id="paint0_linear_199_94959"
          x1="167.875"
          y1="74.375"
          x2="88"
          y2="261"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1d1d1d" />
          <stop offset="1" stop-color="#1d1d1d" stop-opacity="0" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_199_94959"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(167.875 167.875) rotate(-90) scale(100.596 107.502)"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-opacity="0" />
        </radialGradient>
        <linearGradient
          id="paint2_linear_199_94959"
          x1="247.183"
          y1="96.4978"
          x2="194.172"
          y2="229.234"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_199_94959"
          x1="267.01"
          y1="78.6537"
          x2="200.746"
          y2="244.574"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#ff7a03" />
          <stop offset="1" stop-opacity="0" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_199_94959"
          x1="292.405"
          y1="57.8159"
          x2="209.877"
          y2="264.463"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#ff7a03" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_199_94959"
          x1="314.196"
          y1="40.2232"
          x2="217.813"
          y2="281.562"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#ff7a03" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_199_94959"
          x1="202.444"
          y1="144.3"
          x2="191.546"
          y2="184.293"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_199_94959"
          x1="202.444"
          y1="144.3"
          x2="191.546"
          y2="184.293"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
