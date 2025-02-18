import {z} from 'zod'

export const headerSchemma=z.object({
    title:z.string().
    min(10,{
        message:"title should be atleast 10 characters"
    })
    .max(100,{
        message:"title should not be greater than 100 chracters"
    }),
    content:z.string().
    min(30,{
        message:"title should be atleast 30 characters"
    })
    .max(500,{
        message:"title should not be greater than 100 chracters"
    })
})