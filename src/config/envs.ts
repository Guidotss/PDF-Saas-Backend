import { get } from 'env-var'; 
import "dotenv/config";

export const envs = {
    port: get("PORT").required().asPortNumber(),
    jwtSecret: get("JWT_SECRET").required().asString(),
}