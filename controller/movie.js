const Movie = require('../models/movie');



const addNewMovie = async(req,res,next) =>{
    const {title,genre,rating,streamingLink} = req.body;
 
    try {
       const newMovies = await Movie.create({title,genre,rating,streamingLink});
       res.status(201).json({newMovies,message:'successfullly Added'});
    } catch (error) {
        res.status(500).json({error});
        console.log(JSON.stringify(error));
    }
};


const getMovies = async(req,res,next) => {
    try {
        const movies = await Movie.find();
        if(!movies || movies ==null) {
            return res.status(400).json({message:'Error found in get movies',success:false})
        }
        console.log(movies);
        res.status(200).json({allMovies:movies});
    } catch (error) {
        res.status(500).json({error});
        console.log(JSON.stringify(error));
    }
}


const deleteMovie = async(req,res,next) => {
    const movieId = req.params.id;
    if(movieId==''||movieId==null||movieId==undefined){
        return res.status(400).json({message:'id Mising Check Again',success:false})
    }

    try {
        const user = await Movie.findById(movieId);
        if(!user){
            return res.status(401).json({message:'Movie not found tryagain',success:false})
        }
        await Movie.deleteOne({_id:movieId});
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error});
        console.log(JSON.stringify(error));
    }
}

const searchMovies =async (req, res) => {
    try {
        const searchTerm = req.query.q; 
      
        const movies = await Movie.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } }, 
                { genre: { $regex: searchTerm, $options: 'i' } } 
            ]
        });

        res.status(200).json({ success: true, movies: movies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updateMovie = async (req, res , next) => {

    const { id } = req.params;
    const { title, genre, rating, streamingLink } = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            { title, genre, rating, streamingLink },
            { new: true } 
        );
      if (!updatedMovie) {
        return res.status(401).json({ message: 'Movie not found' });
      }
      res.status(201).json({updatedMovie,message:'Movie Updated Successfully'});

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



module.exports = {addNewMovie,getMovies,deleteMovie,searchMovies,updateMovie}