package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.entity.Movie;
import com.edu.hcmuaf.springserver.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovie() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(int id) {
        return movieRepository.findOneById(id);
    }
}