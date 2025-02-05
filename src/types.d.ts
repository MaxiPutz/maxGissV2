import type { RegisterType } from "@/api/register/requestType";
import type { foo } from "@/app/api/private/initMetadata/route";
import type { Metadata } from "./app/lib/store";
import type { StationData } from "@/types/StationData"
import type {StationDataVersion } from "@/app/api/private/nasa/route"
import type { GissV4Metadata } from "./app/api/private/nasa/v4Stations/route";

declare global {
    type StationData = import("@/types/StationData").StationData;
    type Metadata = import("@/app/lib/store"). Metadata;
    type RegisterType = import("@/api/register/requestType").RegisterType;
    type foo = import("@/app/api/private/initMetadata/route").foo;
    type StationDataVersion = import("@/app/api/private/nasa/route").StationDataVersion
    type GissV4Metadata = import("./app/api/private/nasa/v4Stations/route").GissV4Metadata
}

export {};
