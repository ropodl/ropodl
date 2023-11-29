import { resolve } from "node:path";
import colors from "vuetify/lib/util/colors";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  devtools: { enabled: true },
  experimental: {
    viewTransition: true,
    inlineSSRStyles: false,
  },
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@vite-pwa/nuxt",
    "@formkit/auto-animate/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-mongoose",
    "vuetify-nuxt-module",
    "nuxt-simple-sitemap",
    "nuxt-delay-hydration",
    "nuxt-mail",
    // "nuxt-capo",
    // "nuxt-security",
    "@hebilicious/authjs-nuxt",
    "nuxt-csurf",
  ],
  googleFonts: {
    download: false,
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
      },
    },
    display: "swap",
  },
  imports: {
    dirs: ["stores", "stores/frontend"],
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
    devtools: true,
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: "mdi",
      },
      theme: {
        defaultTheme: "dark",
        variations: {
          colors: [
            "primary",
            "secondary",
            "error",
            "info",
            "success",
            "warning",
          ],
          lighten: 5,
          darken: 5,
        },
        themes: {
          dark: {
            dark: true,
            colors: {
              primary: "#ff7a03",
              accent: colors.grey.darken3,
              secondary: colors.amber.darken3,
              info: colors.teal.lighten1,
              warning: colors.amber.base,
              error: colors.deepOrange.accent4,
              success: colors.green.accent3,
              // background: "#252734",
            },
          },
        },
      },
    },
  },
  mail: {
    message: {
      to: process.env.SMTP_USER,
    },
    smtp: {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
  },
  // // Just because auth requires it
  // alias: {
  //   cookie: "cookie",
  // },
  csurf: {
    methodsToProtect: ["POST", "PUT", "PATCH", "DELETE"], // Protect these methods
    excludedUrls: ["/api/login/.*"], // Exclude specific routes from CSRF protection
    // encryptSecret:
    //   "mo4+MrFaeXP7fhAie0o2qw==:tLUaqtHW6evx/coGQVAhtGAR+v6cxgFtrqmkOsuAMag8PHRnMwpbGGUO0TPJjL+4", // Encrypt the token for added security

    https: false, // default true if in production
    // cookieKey: "", // "__Host-csrf" if https is true otherwise just "csrf"
    cookie: {
      // CookieSerializeOptions from unjs/cookie-es
      path: "/",
      httpOnly: false,
      sameSite: "strict",
    },
    // methodsToProtect: ['POST', 'PUT', 'PATCH'], // the request methods we want CSRF protection for
    // excludedUrls: ["/nocsrf1", ["/nocsrf2/.*", "i"]], // any URLs we want to exclude from CSRF protection
    // encryptSecret: "" /** a 32 bits secret */, // only for non serverless runtime, random bytes by default
    // encryptAlgorithm: "AES-CBC", // by default 'aes-256-cbc' (node), 'AES-CBC' (serverless)
  },
  authJs: {
    verifyClientOnEveryRequest: false,
    guestRedirectTo: "/login", // where to redirect if the user is not authenticated
    authenticatedRedirectTo: "/loading/", // where to redirect if the user is authenticated
    baseUrl: process.env.BASE_URL, // should be something like https://www.my-app.com
  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET,
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        // verifyClientOnEveryRequest: false, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
});
