 const connectionTimeout=(req,res,next)=>{
    res.setTimeout(7000, ()=>{
        console.log('Request has timed out.');
            res.send(408);
        });

    next();
}

module.exports=connectionTimeout