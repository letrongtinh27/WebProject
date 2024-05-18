package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.entity.ShowTime;
import com.edu.hcmuaf.springserver.repositories.ShowTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<ShowTime> getShowTimeById(int id) {return showTimeRepository.findShowTimesById(id);}

    public void deleteShowTime(long id) { showTimeRepository.deleteById(id);}

    public ShowTime createShowTime(ShowTime showTime) { return showTimeRepository.save(showTime);}

    public ShowTime updateShowTime(ShowTime showTime, int id) { return null;}

}
