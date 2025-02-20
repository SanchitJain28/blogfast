import {z} from 'zod'

export const blogSectionSchemma=z.object({
    section:z.array(z.object({
        heading:z.string()
        .min(10,{
            message:"heading must be atleast 10 chracters"
        })
        .max(100,{
            message:"heading must not be greater than 100 chracters"
        })
        ,
        content:z.string()
        .min(30,{
            message:"Content must be atleast 30 chracters"
        })
        .max(500,{
            message:"heading must not be greater than 500 chracters"
        })
    }))
})
