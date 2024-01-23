import { get } from 'env-var'; 
import "dotenv/config";

export const envs = {
    port: get("PORT").required().asPortNumber(),
}