import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
    static async generateToken(payload: any, duration: string = "2h"): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(
                payload,
                JWT_SEED,
                {
                    expiresIn: duration,
                },
                (err, token) => {
                    if (err) return resolve(null);
                    return resolve(token!);
                }
            );
        });
    }

    static validateToken(token: string): any {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                return resolve(decoded);
            });
        });
    }
}
