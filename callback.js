const request = require("request");
const food = (recip,call) => {
    const url = "https://forkify-api.herokuapp.com/api/search?q=" + recip;
    request({url:url},(error,req) => {
    const data = JSON.parse(req.body)?JSON.parse(req.body):undefined;
    if(error)
    {
        call(error,data)
    }
    else if(data.error)
    {
        
        call(data.error,undefined);
    }
    else
    {
        
        call(undefined,data);
    }
})
}
const id = (ide,call) => {
    const url1 = "https://forkify-api.herokuapp.com/api/get?rId=" + ide;
request({url:url1},(error,req) => {
    const data = JSON.parse(req.body)?JSON.parse(req.body):undefined;
    if(error)
    {
        call(error,data)
    }
    else if(data.error)
    {
        call(error,data);
    }
    else
    {
        call(undefined,data);
    }
})
}

module.exports = {
    food:food,
    id:id
}