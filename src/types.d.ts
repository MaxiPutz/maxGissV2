import type { RegisterType } from "@/api/register/requestType";
import type { foo } from "@/app/api/private/initMetadata/route";
import type { Metadata } from "./app/lib/store";


declare global {
    type Metadata = import("@/app/lib/store"). Metadata;
    type RegisterType = import("@/api/register/requestType").RegisterType;
    type foo = import("@/app/api/private/initMetadata/route").foo;
}

export {};
