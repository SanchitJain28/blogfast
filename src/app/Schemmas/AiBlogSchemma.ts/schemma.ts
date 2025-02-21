import { z } from "zod";

export const AiBlogSchemma=z.object({
    heading:z.array(z.object({
        title:z.string()
        .min(5,{
            message:"heading must be atleast 10 chracters"
        })
        .max(100,{
            message:"heading must not be greater than 100 chracters"
        })
       
    }))
})