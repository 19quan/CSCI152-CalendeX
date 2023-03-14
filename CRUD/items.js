const express=require('express');
const router=express.Router();
const fs= require('fs');
const data=JSON.parse(fs.readFileSync('data.json','utf-8'));


router.get('/', function(req,res){
    res.status(200).json([data]);
})
//Gets and returns the information of a given user id number
router.get('/:id',function (req, res){
    //get a user's info within the data.json file
    let found=data.users.find(function (item){
        return item.id===parseInt(req.params.id);
    });
    if (found){
        res.status(200).json(found);
    }
    else{
        res.sendStatus(404);
    }
    });
//posts information to a new user array
router.post('/', function (req, res) {
    // get the ids within the user array
    let itemIds = data.users.map(item => item.id);

    // create new id
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

    if(Object.keys(req.body).length==0) //if there is no update data
    {
        res.status(400).send("Please input information to update");
    }
    else {
        // create an object of new Item
        let newItem = {
            id: newId,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            maidenName:req.body.maidenName,
            age:req.body.age,
            gender:req.body.gender,
            email:req.body.email,
            phone:req.body.phone,
            username:req.body.username,
            password:req.body.password,
            birthDate:req.body.birthDate,
            image:req.body.image,
            bloodGroup:req.body.bloodGroup,
            height:req.body.height,
            weight:req.body.weight,
            eyeColor:req.body.eyeColor,
            hair: {
                color:req.body.color,
                type:req.body.type,
            },
            domain:req.body.domain,
            ip:req.body.ip,
            address:{
                address:req.body.address,
                city:req.body.city,
                coordinates:{
                    lat:req.body.lat, lng:req.body.lng},
                postalCode:req.body.postalCode,
                state:req.body.state},
            macAddress:req.body.state,
            university: req.body.university,
            bank:{cardExpire:req.body.cardExpire,
                cardNumber:req.body.cardNumber,
                cardType: req.body.cardType,
                currency: req.body.currency,
                iban:req.body.currency},
            company:{
                address:{
                    address:req.body.address,
                    city:req.body.city,
                    coordinates:{
                        lat:req.body.city,
                        lng:req.body.lng},
                    postalCode:req.body.postalCode,
                    state:req.body.state},
                department:req.body.department,
                name:req.body.name,
                title:req.body.title},
            ein:req.body.ein,
            ssn:req.body.ssn,
            "userAgent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24"
        };

        // push new item object to data array of items
        data.users.push(newItem);
        // return with status 201 and the id of the newly created user data
        res.status(201).json(newItem).send("New user created with id: "+ newId);
    }
});


//updates any given user's information
router.put('/:id', function (req, res) {
    // get item object match by `id`
    let found = data.users.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            maidenName:req.body.maidenName,
            age:req.body.age,
            gender:req.body.gender,
            email:req.body.email,
            phone:req.body.phone,
            username:req.body.username,
            password:req.body.password,
            birthDate:req.body.birthDate,
            image:req.body.image,
            bloodGroup:req.body.bloodGroup,
            height:req.body.height,
            weight:req.body.weight,
            eyeColor:req.body.eyeColor,
            hair: {
                color:req.body.color,
                type:req.body.type,
            },
            domain:req.body.domain,
             ip:req.body.ip,
                address:{
                address:req.body.address,
                    city:req.body.city,
                    coordinates:{
                    lat:req.body.lat, lng:req.body.lng},
                    postalCode:req.body.postalCode,
                    state:req.body.state},
                macAddress:req.body.state,
                 university: req.body.university,
                bank:{cardExpire:req.body.cardExpire,
                    cardNumber:req.body.cardNumber,
                    cardType: req.body.cardType,
                    currency: req.body.currency,
                    iban:req.body.currency},
                company:{
                    address:{
                        address:req.body.address,
                        city:req.body.city,
                        coordinates:{
                            lat:req.body.city,
                            lng:req.body.lng},
                        postalCode:req.body.postalCode,
                        state:req.body.state},
                    department:req.body.department,
                    name:req.body.name,
                    title:req.body.title},
                ein:req.body.ein,
                ssn:req.body.ssn,
                "userAgent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24"
        };

        // find index of found object from array of data
        let targetIndex = data.users.indexOf(found);

        // replace object from data list with `updated` object
        data.users.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
//deletes a given user's identification number
router.delete('/:id', function (req, res) {
    // find item from array of data
    let found = data.users.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // if item found then find index at which the item is
        // stored in the `data` array
        let targetIndex = data.users.indexOf(found);

        // splice means delete item from `data` array using index
        data.users.splice(targetIndex, 1);
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
});

module.exports=router;
