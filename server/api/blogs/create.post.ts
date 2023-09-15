export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    console.log(body)
    try {
        return await new BlogSchema(body).save();
    } catch (error) {
        return error
        
    }
    
})