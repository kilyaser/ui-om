import {defineConfig} from "orval";

export default defineConfig({
    "auth": {
        input: "./src/clients/schemas/auth-api.json",
        output: {
            target: "./src/clients/generated/authClient",
            schemas: "./src/clients/generated/authClient/models",
            prettier: this,
            client: "react-query" ,
            mode: "tags",
            override: {
                query: {
                    useSuspenseQuery: true,
                },
                mutator: {
                    path: "./src/shared/api/instance.ts",
                    name: "apiInstance",
                }
            }
        }
    },
    "api": {
        input: "./src/clients/schemas/ui-common-api.json",
        output: {
            target: "./src/clients/generated/commonApi",
            schemas: "./src/clients/generated/commonApi/models",
            prettier: this,
            client: "react-query" ,
            mode: "tags",
            override: {
                query: {
                    useSuspenseQuery: true,
                },
                mutator: {
                    path: "./src/shared/api/instance.ts",
                    name: "apiInstance",
                }
            }
        }
    }
});