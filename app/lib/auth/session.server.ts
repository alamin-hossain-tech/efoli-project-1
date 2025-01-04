import { createCookieSessionStorage } from "react-router";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["qVTPceLFCG8klKnrejcprIV/9/mXcOIDR/CPtxaNBgNKaYT3oB+Y5L+esGg="],
    secure: process.env.NODE_ENV === "production",
  },
});

export { sessionStorage };
