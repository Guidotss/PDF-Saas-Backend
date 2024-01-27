import bcrypt from "bcrypt";
import { AuthDataSource } from "../../../domain/datasources/auth/auth.datasource";
import { LoginDto } from "../../../domain/dtos/auth/login.dto";
import { RegisterDto } from "../../../domain/dtos/auth/register.dto";

export class AuthDataSourceImpl implements AuthDataSource {

    private hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    private comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    login(): Promise<LoginDto> {
        try{
            
        }catch(error){
            console.log(error);
        }
    }
    register(): Promise<RegisterDto> {
        throw new Error("Method not implemented.");
    }

}