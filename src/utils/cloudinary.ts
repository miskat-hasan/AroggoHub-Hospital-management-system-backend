import cloudinary from "cloudinary";
import { env } from "../config/env.js";

const cloud = cloudinary.v2;

cloud.config({
  cloud_name: env.cname || "",
  api_key: env.capi_key || "",
  api_secret: env.capi_secret || "",
});

export default cloud;
