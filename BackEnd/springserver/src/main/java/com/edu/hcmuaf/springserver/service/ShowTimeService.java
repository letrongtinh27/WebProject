package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.entity.ShowTime;
import com.edu.hcmuaf.springserver.repositories.ShowTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowTimeService {
    @Autowired
    private ShowTimeRepository showTimeRepository;

    public List<ShowTime> getAllShowtime() {
        return showTimeRepository.findAll();
    }
    public ShowTime getShowTimeById(int id) {
        return showTimeRepository.findOneById(id);
    }
}
