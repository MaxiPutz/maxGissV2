/**
 * @typedef {Object} ENVObject
 * @property {String} SECRET_KEY
 * @property {String} DATABASE_URL
 * @property {String} NODE_ENV
 * @property {String} API_BASE_URL
 * @property {String} MAPBOX_KEY
 */


export const ENV = {
    SECRET_KEY: process.env.SECRET_KEY || "default_secret",
    DATABASE_URL: process.env.DATABASE_URL || "file:./default.db.sqlite",
    NODE_ENV: process.env.NODE_ENV || "development",
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    MAPBOX_KEY: process.env.MAPBOX_KEY || "noKey"
  };
  