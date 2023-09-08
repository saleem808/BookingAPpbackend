import { PartialType } from "@nestjs/mapped-types";
import { signUpDto } from "./signup.dto";

export class updateUserDto extends PartialType(signUpDto) {}
