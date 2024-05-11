package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.entity.ShowTime;
import com.edu.hcmuaf.springserver.entity.Theatre;
import com.edu.hcmuaf.springserver.repositories.ShowTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowTimeService {
    @Autowired
    private ShowTimeRepository showTimeRepository;
    public List<ShowTime> getShowTimesByMovieIdAndTheatreId(int movieId, int theatreId) {
        return showTimeRepository.findShowTimeByMovieIdAndTheatreId(movieId, theatreId).orElse(null);
    }
    public List<ShowTime> getAllShowTime() {
        return showTimeRepository.findAll();
    }

    public ShowTime getShowTimeById(int id) {
        return showTimeRepository.findById(Long.valueOf(id)).orElse(null);
    }

}
