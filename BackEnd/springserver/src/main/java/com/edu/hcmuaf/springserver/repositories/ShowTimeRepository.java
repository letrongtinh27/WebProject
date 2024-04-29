package com.edu.hcmuaf.springserver.repositories;

import com.edu.hcmuaf.springserver.entity.ShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowTimeRepository extends JpaRepository<ShowTime, Long> {
    ShowTime findOneById(int id);
}
