const express = require("express");
const MovieDetail = require("../../Model/MovieDetail");
const router = express.Router();
const AuthCom = require("./../../setup/auth")


router.get('/getall',AuthCom.authenticateToken,async(req,res)=>{
// getting all genres
 let genresData = await  MovieDetail.aggregate(
        [

          {
            $group :
              {
                
                _id :"$genres"
                
              
             
              }
           },
           {$sort:{genres:1}}
       
         ]
       )
 // Removing Duplicate genres and making it in a array      
 let allGenere = []
let m = 0
while(m<genresData.length){
    let oneOb = genresData[m]
    let seOb = oneOb._id
    let n = 0;
    while(n<seOb.length){
        let onegen = seOb[n]
        if(!(allGenere.includes(onegen))){
            allGenere.push(onegen)
        }
        n++
    }
    m++
}
let aSGenData = allGenere.sort() // sorting of genere 

// Creation of Desired array
let finalArray = []
let x = 0
while(x<aSGenData.length){
    let gen = aSGenData[x]
    let movies = await MovieDetail.aggregate([
        {$match: {genres:gen} },        
        {$project: { director:1,imdb_rating:1,
            length:1,poster:1,title:1}},
    
    
        ]).exec() 
        let y = 0 
        while(y<movies.length){   
                     
            delete movies[y]._id;
            movies[y].imdb_rating = movies[y].imdb_rating.toFixed(1)
            y++
        } 
        let st = {
            "genres":gen,
            movies
        }
        finalArray.push(st)
    x++
}



res.json(finalArray)


   
   })

module.exports = router;


