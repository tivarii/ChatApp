
export const logout=async(req:any,res:any)=>{
    try{
        const cookiesOption={
            http:true,
            secure:true
        }
        return res.cookie("token","",cookiesOption).json({
            msg:"session over",
            success:true
        })
    }catch(error){
        return res.status(502).json({
            msg: error
        })
    }
}